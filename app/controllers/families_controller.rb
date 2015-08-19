class FamiliesController < ApplicationController
  before_action :set_family, only: [:show, :edit, :update, :destroy]
  #before_filter :wrapper_authenticate_user unless Rails.env.test?
  #load_and_authorize_resource unless Rails.env.test?

  # GET /families
  # GET /families.json
  def index
    @families = Family.all
  end

  # GET /families/1
  # GET /families/1.json
  def show
    @export_data = Family.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render :json => @export_data.to_json(:include => :family_memberships) }
    end
  end

  # GET /families/new
  def new
    @family = Family.new
  end

  # GET /families/1/edit
  def edit
  end

  # POST /families
  # POST /families.json
  def create
    @family = Family.new(family_params)

    respond_to do |format|
      if @family.save
        format.html { redirect_to @family, notice: 'Family was successfully created.' }
        format.json { render :show, status: :created, location: @family }
      else
        format.html { render :new }
        format.json { render json: @family.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /families/1
  # PATCH/PUT /families/1.json
  def update
    respond_to do |format|
      if @family.update(family_params)
        format.html { redirect_to @family, notice: 'Family was successfully updated.' }
        format.json { render :show, status: :ok, location: @family }
      else
        format.html { render :edit }
        format.json { render json: @family.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /families/1
  # DELETE /families/1.json
  def destroy
    respond_to do |format|
      if @family.destroy
        format.html { redirect_to families_url, notice: 'Family was successfully destroyed.' }
        format.json { head :no_content }
      else
        format.html { redirect_to families_url, alert: @family.errors }
        format.json { render json: @family.errors, status: :unprocessable_entity  }
      end
    end
  end

# GET /get_orgs/1.json
  def get_orgs
    @organizations = Family.find_by_id(params[:id]).organizations if Family.find_by_id(params[:id]).present?
    respond_to do |format|
      format.json { render 'organizations/index' }
    end
  end

  def search
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 10 if params[:rows].blank?
    params[:sort] = 'name' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if params[:ctrp_id].present? || params[:name].present? || params[:family_status].present? || params[:family_type].present?
      @families = Family.all
      @families = @families.matches('id', params[:ctrp_id]) if params[:ctrp_id].present?
      @families = @families.matches_wc('name', params[:name]) if params[:name].present?
      @families = @families.with_family_status(params[:family_status]) if params[:family_status].present?
      @families = @families.with_family_type(params[:family_type]) if params[:family_type].present?
      @families = @families.sort_by_col(params[:sort], params[:order]).group(:'families.id').page(params[:start]).per(params[:rows])
    else
      @families = []
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_family
      @family = Family.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def family_params
      print @params;
      params.require(:family).permit(:name, :family_status_id, :family_type_id, family_memberships_attributes: [:id,:_destroy,:organization_id,:family_relationship_id,:effective_date,:expiration_date])
    end
end
