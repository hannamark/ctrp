class ParticipatingSitesController < ApplicationController
  before_action :set_participating_site, only: [:show, :edit, :update, :destroy]

  # GET /participating_sites
  # GET /participating_sites.json
  def index
    @participating_sites = ParticipatingSite.all
  end

  # GET /participating_sites/1
  # GET /participating_sites/1.json
  def show
  end

  # GET /participating_sites/new
  def new
    @participating_site = ParticipatingSite.new
  end

  # GET /participating_sites/1/edit
  def edit
  end

  # POST /participating_sites
  # POST /participating_sites.json
  def create
    @participating_site = ParticipatingSite.new(participating_site_params)

    respond_to do |format|
      if @participating_site.save
        format.html { redirect_to @participating_site, notice: 'Participating site was successfully created.' }
        format.json { render :show, status: :created, location: @participating_site }
      else
        format.html { render :new }
        format.json { render json: @participating_site.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /participating_sites/1
  # PATCH/PUT /participating_sites/1.json
  def update
    respond_to do |format|
      if @participating_site.update(participating_site_params)
        format.html { redirect_to @participating_site, notice: 'Participating site was successfully updated.' }
        format.json { render :show, status: :ok, location: @participating_site }
      else
        format.html { render :edit }
        format.json { render json: @participating_site.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /participating_sites/1
  # DELETE /participating_sites/1.json
  def destroy
    @participating_site.destroy
    respond_to do |format|
      format.html { redirect_to participating_sites_url, notice: 'Participating site was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_participating_site
      @participating_site = ParticipatingSite.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def participating_site_params

      params[:participating_site].permit(:protocol_id, :program_code, :contact_name, :contact_phone, :contact_email, :trial_id, :organization_id,
    site_rec_status_wrappers_attributes: [:id,:status_date, :site_recruitment_status_id]
    # participating_site_investigators: [:person_id, :set_as_contact, :investigator_type]
    )
    end
end
