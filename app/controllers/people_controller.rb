class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?

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
    @person.updated_by = @user.created_by

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

    respond_to do |format|
      #@person.po_affiliations.destroy
      if @person.update(person_params)
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

    if params[:ctrp_id].present? || params[:source_id].present? || params[:fname].present? || params[:lname].present? || params[:prefix].present? || params[:suffix].present? || params[:email].present? || params[:phone].present? || params[:source_context].present? || params[:source_status].present?
      @people = Person.all
      @people = @people.matches('id', params[:ctrp_id]) if params[:ctrp_id].present?
      @people = @people.matches_wc('source_id',params[:source_id]) if params[:source_id].present?
      @people = @people.matches_wc('fname', params[:fname]) if params[:fname].present?
      @people = @people.matches_wc('lname', params[:lname]) if params[:lname].present?
      @people = @people.matches_wc('prefix', params[:prefix]) if params[:prefix].present?
      @people = @people.matches_wc('suffix', params[:suffix]) if params[:suffix].present?
      @people = @people.matches_wc('email', params[:email]) if params[:email].present?
      @people = @people.matches_wc('phone', params[:phone]) if params[:phone].present?
      @people = @people.with_source_context(params[:source_context]) if params[:source_context].present?
      @people = @people.with_source_status(params[:source_status]) if params[:source_status].present?
      @people = @people.sort_by_col(params[:sort], params[:order]).group(:'people.id').page(params[:start]).per(params[:rows])
    else
      @people = []
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      @person = Person.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def person_params
      params.require(:person).permit(:source_id, :fname, :mname, :lname, :suffix,:prefix, :email, :phone, :source_status_id, po_affiliations_attributes: [:id,:organization_id,:effective_date,:expiration_date,:po_affiliation_status_id, :_destroy, :created_by, :updated_by])
    end

end
