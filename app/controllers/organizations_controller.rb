class OrganizationsController < ApplicationController
  before_action :set_organization, only: [:show, :edit, :update, :destroy]

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
    @organizations = Organization.all
    @organizations = @organizations.matches_wc('name', params[:name]) if params[:name].present?
    @organizations = @organizations.matches('po_id', params[:'po-id']) if params[:'po-id'].present?
    @organizations = @organizations.matches_wc('source_id', params[:'source-id']) if params[:'source-id'].present?
    @organizations = @organizations.with_source_status(params[:'source-status']) if params[:'source-status'].present?
    @organizations = @organizations.with_family(params[:'family-name']) if params[:'family-name'].present?
    @organizations = @organizations.matches_wc('address', params[:address]) if params[:address].present?
    @organizations = @organizations.matches_wc('address2', params[:address2]) if params[:address2].present?
    @organizations = @organizations.matches_wc('city', params[:city]) if params[:city].present?
    @organizations = @organizations.matches_wc('state_province', params[:'state-province']) if params[:'state-province'].present?
    @organizations = @organizations.matches('country', params[:country]) if params[:country].present?
    @organizations = @organizations.matches_wc('postal_code', params[:'postal-code']) if params[:'postal-code'].present?
    @organizations = @organizations.matches_wc('email', params[:email]) if params[:email].present?
    respond_to do |format|
      format.json { render :index }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def organization_params
      params.require(:organization).permit(:po_id, :source_id, :name, :address, :address2, :city, :state_province, :postal_code, :country, :email, :phone, :fax, :source_status_id, :source_context_id)
    end
end
