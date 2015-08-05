class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]
  ## Please comment the next two lines if you donot want the Authorization checks
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?

  respond_to :html, :json


  # GET /organizations
  # GET /organizations.json
  def index
    @organizations = Organization.all
  end

  # GET /organizations/1
  # GET /organizations/1.json
  def show
  end

  # GET /organizations/new
  def new
    @organization = Organization.new
  end

  # GET /organizations/1/edit
  def edit
  end

  # POST /organizations
  # POST /organizations.json
  def create
    @organization = Organization.new(organization_params)

    respond_to do |format|
      if @organization.save
        format.html { redirect_to @organization, notice: 'Organization was successfully created.' }
        format.json { render :show, status: :created, location: @organization }
      else
        format.html { render :new }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /organizations/1
  # PATCH/PUT /organizations/1.json
  def update
    respond_to do |format|
      if @organization.update(organization_params)
        format.html { redirect_to @organization, notice: 'Organization was successfully updated.' }
        format.json { render :show, status: :ok, location: @organization }
      else
        format.html { render :edit }
        format.json { render json: @organization.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /organizations/1
  # DELETE /organizations/1.json
  def destroy
    @organization.destroy
    respond_to do |format|
      format.html { redirect_to organizations_url, notice: 'Organization was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def search
    # Pagination/sorting params initialization
    Rails.logger.info "IN SEARCH"
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 10 if params[:rows].blank?
    params[:sort] = 'name' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?
    # Param alias is boolean, use has_key? instead of blank? to avoid false positive when the value of alias is false
    params[:alias] = true if !params.has_key?(:alias)

    # Scope chaining, reuse the scope definition
    @organizations = Organization.all
    if params[:alias]
      @organizations = @organizations.matches_name_wc(params[:name]) if params[:name].present?
    else
      @organizations = @organizations.matches_wc('name', params[:name]) if params[:name].present?
    end
    @organizations = @organizations.matches('id', params[:id]) if params[:id].present?
    @organizations = @organizations.matches_wc('source_id', params[:source_id]) if params[:source_id].present?
    @organizations = @organizations.with_source_status(params[:source_status]) if params[:source_status].present?
    @organizations = @organizations.with_family(params[:family_name]) if params[:family_name].present?
    @organizations = @organizations.matches_wc('address', params[:address]) if params[:address].present?
    @organizations = @organizations.matches_wc('address2', params[:address2]) if params[:address2].present?
    @organizations = @organizations.matches_wc('city', params[:city]) if params[:city].present?
    @organizations = @organizations.matches_wc('state_province', params[:state_province]) if params[:state_province].present?
    @organizations = @organizations.matches('country', params[:country]) if params[:country].present?
    @organizations = @organizations.matches_wc('postal_code', params[:postal_code]) if params[:postal_code].present?
    @organizations = @organizations.matches_wc('email', params[:email]) if params[:email].present?
    @organizations = @organizations.matches_wc('phone', params[:phone]) if params[:phone].present?
    @organizations = @organizations.sort_by_col(params[:sort], params[:order]).group(:'organizations.id').page(params[:start]).per(params[:rows])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def organization_params
      params.require(:organization).permit(:source_id, :name, :address, :address2, :city, :state_province, :postal_code, :country, :email, :phone, :fax, :source_status_id, :source_context_id)
    end
end
