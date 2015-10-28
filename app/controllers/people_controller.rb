class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?
  skip_authorize_resource :only => [:search]

  # GET /people
  # GET /people.json
  def index
    @people = Person.all
  end

  # GET /people/1
  # GET /people/1.json
  def show
    @export_data = Person.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render :json => @export_data.to_json(:include => :po_affiliations) }
    end
  end

  # GET /people/new
  def new
    @person = Person.new
  end

  # GET /people/1/edit
  def edit
  end

  # POST /people
  # POST /people.json
  def create
    @person = Person.new(person_params)
    @person.created_by = @current_user.username unless @current_user.nil?
    @person.updated_by = @person.created_by

    respond_to do |format|
      if @person.save
        format.html { redirect_to @person, notice: 'Person was successfully created.' }
        format.json { render :show, status: :created, location: @person }
      else
        format.html { render :new }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end


  end

  # PATCH/PUT /people/1
  # PATCH/PUT /people/1.json
  def update
    @person.updated_by = @current_user.username unless @current_user.nil?

    respond_to do |format|
      #@person.po_affiliations.destroy
      if @person.update(person_params)
        @person.updated_at = Time.now
        @person.save
        format.html { redirect_to @person, notice: 'Person was successfully updated.' }
        format.json { render :show, status: :ok, location: @person }
      else
        format.html { render :edit }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /people/1
  # DELETE /people/1.json
  def destroy
    respond_to do |format|
      if @person.destroy
        format.html { redirect_to people_url, notice: 'Person was successfully destroyed.' }
        format.json { head :no_content }
      else
        format.html { redirect_to people_url, alert: @person.errors }
        format.json { render json: @person.errors, status: :unprocessable_entity  }
      end
    end
  end

  def curate

    respond_to do |format|
      if Person.nullify_duplicates(params)
        format.html { redirect_to people_url, notice: 'Person was successfully curated.' }
      else
        format.json { render json: @person.errors, status: :unprocessable_entity  }
      end

    end

  end

  def search
    print params
    print @params
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 10 if params[:rows].blank?
    params[:sort] = 'lname' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if params[:ctrp_id].present? || params[:source_id].present? ||
        params[:fname].present? || params[:lname].present? || params[:prefix].present? ||
        params[:suffix].present? || params[:email].present? || params[:phone].present? ||
        params[:source_context].present? || params[:source_status].present? || params[:date_range_arr].present? ||
        params[:updated_by].present?

      @people = Person.all
      @people = @people.updated_date_range(params[:date_range_arr]) if params[:date_range_arr].present? and params[:date_range_arr].count == 2
      @people = @people.matches('id', params[:ctrp_id]) if params[:ctrp_id].present?
      @people = @people.matches('updated_by', params[:updated_by]) if params[:updated_by].present?
      @people = @people.matches_wc('source_id',params[:source_id],@current_user.role) if params[:source_id].present?
      @people = @people.matches_wc('fname', params[:fname],@current_user.role) if params[:fname].present?
      @people = @people.matches_wc('lname', params[:lname],@current_user.role) if params[:lname].present?
      @people = @people.matches_wc('prefix', params[:prefix],@current_user.role) if params[:prefix].present?
      @people = @people.matches_wc('suffix', params[:suffix],@current_user.role) if params[:suffix].present?
      @people = @people.matches_wc('email', params[:email],@current_user.role) if params[:email].present?
      @people = @people.matches_wc('phone', params[:phone],@current_user.role) if params[:phone].present?
      if @current_user.role == "ROLE_CURATOR" || @current_user.role == "ROLE_SUPER"
        @people = @people.with_source_context(params[:source_context]) if params[:source_context].present?
      else
        # TODO need constant for CTRP
        @people = @people.with_source_context("CTRP")
      end
      if @current_user.role == "ROLE_CURATOR" || @current_user.role == "ROLE_SUPER"
        @people = @people.with_source_status(params[:source_status]) if params[:source_status].present?
      else
        # TODO need constant for Active
        @people = @people.with_source_status("Active")
      end
      @people = @people.affiliated_with_organization(params[:affiliated_org_name]) if params[:affiliated_org_name].present?
      @people = @people.sort_by_col(params[:sort], params[:order]).group(:'people.id').page(params[:start]).per(params[:rows])
    else
      @people = []
    end
  end

  #Method to check for Uniqueness while creating persons - check on First & Last name. These are to be presented as warnings and not errors, hence cannot be part of before-save callback.
  def unique
    print params[:person_fname]
    print params[:person_lname]
    print params[:source_context_id]
    print params[:person_exists]

#    exists = false
    is_unique = true
    count = 0

      if params.has_key?(:person_fname) && params.has_key?(:person_lname) && params.has_key?(:source_context_id)
  #     exists =  Person.exists?(fname: params[:person_fname], lname: params[:person_lname]);
        count = Person.where("lower(fname)=?", params[:person_fname].downcase).where("lower(lname)=?",params[:person_lname].downcase).where("source_context_id=?", params[:source_context_id]).count;
      end

      print "count"
      print count

      # For an existing person, the number of people with the same name should be 2 or more to qualify as duplicate
      if params[:person_exists] == true && count > 1
        is_unique = false
      elsif params[:person_exists] == false && count > 0
        is_unique = false
      end

    p "is unique?"
    p is_unique

    respond_to do |format|
#        format.json {render :json => {:name_unique => !exists}}
      format.json {render :json => {:name_unique => is_unique}}
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      @person = Person.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def person_params
      params.require(:person).permit(:source_id, :fname, :mname, :lname, :suffix,:prefix, :email, :phone,
                                     :source_status_id,:source_context_id, :updated_by, :updated_at, :lock_version,
                                     po_affiliations_attributes: [:id, :organization_id, :effective_date,
                                                                  :expiration_date, :po_affiliation_status_id,
                                                                  :lock_version, :_destroy])
    end

end
