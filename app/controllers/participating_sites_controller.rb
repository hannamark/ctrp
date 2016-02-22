class ParticipatingSitesController < ApplicationController
  before_action :set_participating_site, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?

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

    @participating_site.user = @current_user

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

  def validate_status
    @validation_msgs = []
    transition_matrix = JSON.parse(AppSetting.find_by_code('SR_STATUS_TRANSITION').big_value)
    statuses = params['statuses']

    if statuses.present? && statuses.size > 0
      statuses.each_with_index do |e, i|
        if i == 0
          from_status_code = 'STATUSZERO'
        else
          from_status_code = statuses[i - 1]['sr_status_code']
        end
        to_status_code = statuses[i]['sr_status_code']
        validation_msg = convert_validation_msg(transition_matrix[from_status_code][to_status_code])
        @validation_msgs.append(validation_msg)
      end
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
                                         site_rec_status_wrappers_attributes: [:id, :status_date, :site_recruitment_status_id, :comments, :_destroy],
                                         participating_site_investigators_attributes: [:id, :participating_site_id, :person_id, :set_as_contact, :investigator_type, :_destroy])
    end

  # Convert status code to name in validation messages
  def convert_validation_msg (msg)
    if msg.has_key?('warnings')
      msg['warnings'].each do |warning|
        statusObj = SiteRecruitmentStatus.find_by_code(warning['status']) if warning.has_key?('status')
        warning['status'] = statusObj.name if statusObj.present?
      end
    end

    if msg.has_key?('errors')
      msg['errors'].each do |error|
        statusObj = SiteRecruitmentStatus.find_by_code(error['status']) if error.has_key?('status')
        error['status'] = statusObj.name if statusObj.present?
      end
    end

    return msg
  end
end
