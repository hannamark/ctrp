class TrialsController < ApplicationController
  before_action :set_trial, only: [:show, :edit, :update, :destroy]
  # before_filter :wrapper_authenticate_user unless Rails.env.test?
  # load_and_authorize_resource unless Rails.env.test?

  # GET /trials
  # GET /trials.json
  def index
    @trials = Trial.all
  end

  # GET /trials/1
  # GET /trials/1.json
  def show
    @trial.current_user = @current_user
  end

  # GET /trials/new
  def new
    @trial = Trial.new
  end

  # GET /trials/1/edit
  def edit
    @trial.current_user = @current_user
  end

  # POST /trials
  # POST /trials.json
  def create
    @trial = Trial.new(trial_params)

    @trial.created_by = @current_user.username unless @current_user.nil?
    @trial.updated_by = @trial.created_by
    @trial.current_user = @current_user

    respond_to do |format|
      if @trial.save
        format.html { redirect_to @trial, notice: 'Trial was successfully created.' }
        format.json { render :show, status: :created, location: @trial }
      else
        format.html { render :new }
        format.json { render json: @trial.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /trials/1
  # PATCH/PUT /trials/1.json
  def update
    @trial.updated_by = @current_user.username unless @current_user.nil?
    @trial.current_user = @current_user

    respond_to do |format|
      if @trial.update(trial_params)
        format.html { redirect_to @trial, notice: 'Trial was successfully updated.' }
        format.json { render :show, status: :ok, location: @trial }
      else
        format.html { render :edit }
        format.json { render json: @trial.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trials/1
  # DELETE /trials/1.json
  def destroy
    @trial.destroy
    respond_to do |format|
      format.html { redirect_to trials_url, notice: 'Trial was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # Get
  def get_grants_serialnumber
    @tempgrants=Tempgrants.all
    @tempgrants=@tempgrants.where("funding_mechanism = ? AND institute_code = ? AND CAST(serial_number AS TEXT)  LIKE ?", params[:funding_mechanism], params[:institute_code],"#{params[:serial_number]}%")

    respond_to do |format|
      format.json { render :json => {:tempgrants => @tempgrants} }
    end
  end

  def get_central_contact_types
    @central_contact_types = CentralContactType.all

    respond_to do |format|
      format.json { render :json => {:types => @central_contact_types} }
    end
  end

  def get_board_approval_statuses
    @statuses = BoardApprovalStatus.all

    respond_to do |format|
      format.json { render :json => {:statuses => @statuses} }
    end
  end

  def search
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 20 if params[:rows].blank?
    params[:sort] = 'lead_protocol_id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if params[:protocol_id].present? || params[:official_title].present? || params[:phases].present? || params[:purposes].present? || params[:pilot].present? || params[:pi].present? || params[:org].present?  || params[:study_sources].present?
      @trials = Trial.all
      @trials = @trials.with_protocol_id(params[:protocol_id]) if params[:protocol_id].present?
      @trials = @trials.matches_wc('official_title', params[:official_title]) if params[:official_title].present?
      @trials = @trials.with_phases(params[:phases]) if params[:phases].present?
      @trials = @trials.with_purposes(params[:purposes]) if params[:purposes].present?
      @trials = @trials.matches('pilot', params[:pilot]) if params[:pilot].present?
      if params[:pi].present?
        splits = params[:pi].split(',').map(&:strip)
        @trials = @trials.with_pi_lname(splits[0])
        @trials = @trials.with_pi_fname(splits[1]) if splits.length > 1
      end
      @trials = @trials.with_org(params[:org], params[:org_types]) if params[:org].present?
      @trials = @trials.with_study_sources(params[:study_sources]) if params[:study_sources].present?
      @trials = @trials.with_owner(@current_user.username) if params[:searchType] == 'My Trials'
      @trials = @trials.is_not_draft if params[:searchType] == 'All Trials'
      @trials = @trials.is_draft(@current_user.username) if params[:searchType] == 'Saved Drafts'
      @trials = @trials.sort_by_col(params).group(:'trials.id').page(params[:start]).per(params[:rows])
    else
      @trials = []
    end
  end


  def checkout_trial

    available_checkout_types = ["admin", "scientific", "scientificadmin"]
    checkout_type = params[:type].downcase

    if params.has_key?(:trial_id) and available_checkout_types.include? (checkout_type)

      @trial = Trial.find(params[:trial_id])
      checkout_json = {"by": @current_user.username, "date": Time.now}.to_json

      if checkout_type == "admin"
        @trial.update_attribute('admin_checkout', checkout_json)

      elsif checkout_type == "scientificadmin"
        @trial.update_attributes('admin_checkout': checkout_json, 'scientific_checkout': checkout_json)

      elsif checkout_type == "scientific"
        @trial.update_attribute('scientific_checkout', checkout_json)
      end
    end

    respond_to do |format|
      format.json { render :json => {:result => @trial} }
    end
  end


  def checkin_trial
    available_checkin_types = ["admin", "scientific", "scientificadmin"]
    checkin_type = params[:type].downcase

    if params.has_key?(:trial_id) and available_checkin_types.include? (checkin_type)

      @trial = Trial.find(params[:trial_id])

      if checkin_type == "admin"
        @trial.update_attribute('admin_checkout', nil)

      elsif checkin_type == "scientificadmin"
        @trial.update_attributes('admin_checkout': nil, 'scientific_checkout': nil)

      elsif checkin_type == "scientific"
        @trial.update_attribute('scientific_checkout', nil)

      end
    end

    respond_to do |format|
      format.json { render :json => {:result => @trial} }
    end

  end


  def search_pa
    # Pagination/sorting params initialization
    Rails.logger.info "In Search PA, params = #{params.inspect}"
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 20 if params[:rows].blank?
    params[:sort] = 'lead_protocol_id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if  params[:submission_type].present? ||  params[:submission_method].present? ||params[:nih_nci_prog].present? || params[:nih_nci_div].present? || params[:milestone].present? || params[:protocol_origin_type] || params[:processing_status].present? || params[:trial_status].present? || params[:research_category].present? || params[:other_id].present? || params[:protocol_id].present? || params[:official_title].present? || params[:phases].present? || params[:purposes].present? || params[:pilot].present? || params[:pi].present? || params[:org].present?  || params[:study_sources].present?
      @trials = Trial.all
      @trials = @trials.with_protocol_id(params[:protocol_id]) if params[:protocol_id].present?
      @trials = @trials.matches_wc('official_title', params[:official_title]) if params[:official_title].present?
      @trials = @trials.with_phases(params[:phases]) if params[:phases].present?
      @trials = @trials.with_purposes(params[:purposes]) if params[:purposes].present?
      @trials = @trials.matches('pilot', params[:pilot]) if params[:pilot].present?
      if params[:pi].present?
        splits = params[:pi].split(',').map(&:strip)
        @trials = @trials.with_pi_lname(splits[0])
        @trials = @trials.with_pi_fname(splits[1]) if splits.length > 1
      end
      if params[:org].present?
        if params[:org_type] == 'Lead Organization'
          @trials = @trials.with_lead_org(params[:org])
        elsif params[:org_type] == 'Sponsor'
          @trials = @trials.with_sponsor(params[:org])
        elsif params[:org_type] == 'Participating Sites'
          # TODO handle wildcard
          if params[:org] != "*"
            @trials = @trials.select{|trial| trial.participating_sites.by_value(params[:org])}
          end
        else
          @trials = @trials.with_any_org(params[:org])
        end
      end
      @trials = @trials.with_study_sources(params[:study_sources]) if params[:study_sources].present?
      @trials = @trials.sort_by_col(params).group(:'trials.id').page(params[:start]).per(params[:rows])

      # PA fields
      if params[:research_category].present?
        Rails.logger.debug " Before params[:research_category] = #{params[:research_category].inspect}"
        search_ids = []
        params[:research_category].each do |s|
          Rails.logger.debug "research_category =#{s["name"]}"
          sn = ResearchCategory.find_by_name(s["name"])
          next if sn.nil?
          search_ids << sn.id
        end
        @trials = @trials.select{|trial| !trial.research_category.blank? && search_ids.include?(trial.research_category_id)}
      end
      if params[:trial_status].present?# && params[:trial_status_latest].present? && params[:trial_status_latest] == "YES"
        Rails.logger.debug " Before params[:trial_status] = #{params[:trial_status].inspect}"
        search_ids = []
        params[:trial_status].each do |s|
          Rails.logger.debug "trial_status =#{s["name"]}"
          sn = TrialStatus.find_by_name(s["name"])
          next if sn.nil?
          search_ids << sn.id
        end
        @trials = @trials.select{|trial| !trial.trial_status_wrappers.blank? && search_ids.include?(trial.trial_status_wrappers.last.trial_status.id)}
      end
      if params[:milestone].present?
        Rails.logger.debug " Before params[:milestone] = #{params[:milestone].inspect}"
        search_ids = []
        params[:milestone].each do |s|
          Rails.logger.debug "milestone =#{s["name"]}"
          sn = Milestone.find_by_name(s["name"])
          next if sn.nil?
          search_ids << sn.id
        end
        @trials = @trials.select{|trial| !trial.milestone_wrappers.blank? &&  search_ids.include?(trial.milestone_wrappers.last.milestone.id)}
      end
      if params[:processing_status].present? #&& params[:trial_status_latest].present? && params[:trial_status_latest] == "YES"
        Rails.logger.debug " Before params[:processing_status] = #{params[:processing_status].inspect}"
        search_process_status_ids = []
        params[:processing_status].each do |p|
          Rails.logger.debug " processing_status =#{p["name"]}"
          ps = ProcessingStatus.find_by_name(p["name"])
          next if ps.nil?
          search_process_status_ids << ps.id
        end
        @trials = @trials.select{|trial| !trial.processing_status_wrappers.blank? && search_process_status_ids.include?(trial.processing_status_wrappers.last.processing_status_id)}
        Rails.logger.debug "After @trials = #{@trials.inspect}"
      end
      if params[:protocol_origin_type].present?
        @trials = @trials.select{|trial| trial.other_ids.by_value(params[:protocol_origin_type]).size>0}
      end
      if params[:admin_checkout].present?
        Rails.logger.info "Admin Checkout Only selected"
        @trials = @trials.select{|trial| !trial.admin_checkout.nil?}
      else
        Rails.logger.info "Only Admin Checkout parameter not selected"
      end
      if params[:scientific_checkout].present?
        Rails.logger.info "Science Checkout Only selected"
        @trials = @trials.select{|trial| !trial.scientific_checkout.nil?}
      end
      if params[:checkout].present?
        Rails.logger.info "Trial checkout by me selected"
        @trials = @trials.select{|trial| !trial.admin_checkout.nil? || !trial.scientific_checkout.nil?}
      end
      if  params[:nih_nci_div].present?
        Rails.logger.debug " Before params[:nih_nci_div] = #{params[:nih_nci_div].inspect}"
        search_codes = []
        params[:nih_nci_div].each do |c|
          Rails.logger.debug " nih_nci_div =#{c["code"]}"
          search_codes << c["code"]
        end
        @trials = @trials.where(nih_nci_div: search_codes) unless @trials.blank?
      end
      if  params[:nih_nci_prog].present?
        Rails.logger.debug " Before params[:nih_nci_prog] = #{params[:nih_nci_prog].inspect}"
        search_codes = []
        params[:nih_nci_prog].each do |c|
          Rails.logger.debug " nih_nci_prog =#{c["code"]}"
          search_codes << c["code"]
        end
        @trials =  @trials.where(nih_nci_prog: search_codes) unless @trials.blank?
      end
      if params[:submission_type].present?
        Rails.logger.debug " Before params[:submission_type] = #{params[:submission_type].inspect}"
        search_ids = []
        params[:submission_type].each do |s|
          Rails.logger.debug " submission_type =#{s["name"]}"
          sn = SubmissionType.find_by_name(s["name"])
          next if sn.nil?
          search_ids << sn.id
        end
        @trials = @trials.select{|trial| !trial.submissions.blank? &&  search_ids.include?(trial.submissions.last.submission_type.id)}
      end
      if params[:submission_method].present?
        Rails.logger.debug " Before params[:submission_method] = #{params[:submission_method].inspect}"
        search_ids = []
        params[:submission_method].each do |s|
          Rails.logger.debug " submission_type =#{s["name"]}"
          sn = SubmissionMethod.find_by_name(s["name"])
          next if sn.nil?
          search_ids << sn.id
        end
        @trials = @trials.select{|trial| !trial.submissions.blank? && search_ids.include?(trial.submissions.last.submission_method.id)}
      end
      if params[:onhold].present?
        Rails.logger.info "Trials onhold selected"
        onhold_status = ProcessingStatus.find_by_name("On-Hold")
        unless onhold_status.nil?
          @trials = @trials.select{|trial| !trial.processing_status_wrappers.blank? && trial.processing_status_wrappers.last.processing_status == onhold_status}
        end
      end
      if params[:myTrials].present?
        Rails.logger.info "myTrials selected"
        my_organization = @current_user.organization
        #@trial = @trials.select{|trial| !trial.lead_.blank? && trial.organization == my_organization}
        unless my_organization.nil?
          Rails.logger.info "@currrent_user organization = #{@current_user.organization.inspect}"
          @trials = @trials.with_lead_org(my_organization.name)
        end
      end
    else
      @trials = []
    end
  end



  def validate_status
    @validation_msgs = []
    transition_matrix = JSON.parse(AppSetting.find_by_code('TRIAL_STATUS_TRANSITION').big_value)
    statuses = params['statuses']

    if statuses.present? && statuses.size > 0
      statuses.each_with_index do |e, i|
        if i == 0
          from_status_code = 'STATUSZERO'
        else
          from_status_code = statuses[i - 1]['trial_status_code']
        end
        to_status_code = statuses[i]['trial_status_code']
        validation_msg = convert_validation_msg(transition_matrix[from_status_code][to_status_code])
        @validation_msgs.append(validation_msg)
      end
    end
  end

  def search_clinical_trials_gov
    # TODO Search existing trials using NCT ID
    @search_result = {}
    url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
    url = url.sub('NCT********', params[:nct_id])
    begin
      xml = Nokogiri::XML(open(url))
    rescue OpenURI::HTTPError
      @search_result[:error_msg] = 'A study with the given identifier is not found in ClinicalTrials.gov.'
    else
      @search_result[:official_title] = xml.xpath('//official_title').text
      @search_result[:status] = xml.xpath('//overall_status').text
      @search_result[:nct_id] = xml.xpath('//id_info/nct_id').text
    end
  end

  def import_clinical_trials_gov
    url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
    url = url.sub('NCT********', params[:nct_id])
    xml = Nokogiri::XML(open(url))
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trial
      @trial = Trial.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trial_params
      params.require(:trial).permit(:nci_id, :lead_protocol_id, :official_title, :acronym, :pilot, :research_category_id,
                                    :primary_purpose_other, :secondary_purpose_other, :investigator_title,
                                    :program_code, :grant_question, :start_date, :start_date_qual, :primary_comp_date,
                                    :primary_comp_date_qual, :comp_date, :comp_date_qual, :ind_ide_question,
                                    :intervention_indicator, :sec801_indicator, :data_monitor_indicator, :history,
                                    :study_source_id, :phase_id, :primary_purpose_id, :secondary_purpose_id,
                                    :accrual_disease_term_id, :responsible_party_id, :lead_org_id, :pi_id, :sponsor_id,
                                    :investigator_id, :investigator_aff_id, :is_draft, :edit_type, :lock_version,
                                    :process_priority, :process_comment, :nih_nci_div, :nih_nci_prog, :keywords,
                                    other_ids_attributes: [:id, :protocol_id_origin_id, :protocol_id, :_destroy],
                                    alternate_titles_attributes: [:id, :category, :title, :source, :_destroy],
                                    central_contacts_attributes: [:id, :country, :phone, :email, :central_contact_type_id, :person_id, :trial_id, :fullname],
                                    trial_funding_sources_attributes: [:id, :organization_id, :_destroy],
                                    grants_attributes: [:id, :funding_mechanism, :institute_code, :serial_number, :nci, :_destroy],
                                    trial_status_wrappers_attributes: [:id, :status_date, :why_stopped, :trial_status_id,
                                                                       :comment, :_destroy],
                                    ind_ides_attributes: [:id, :ind_ide_type, :ind_ide_number, :grantor, :holder_type_id,
                                                          :nih_nci, :expanded_access, :expanded_access_type_id, :exempt, :_destroy],
                                    oversight_authorities_attributes: [:id, :country, :organization, :_destroy],
                                    trial_documents_attributes: [:id, :_destroy],
                                    submissions_attributes: [:id, :amendment_num, :amendment_date, :_destroy])
    end

    # Convert status code to name in validation messages
    def convert_validation_msg (msg)
      if msg.has_key?('warnings')
        msg['warnings'].each do |warning|
          statusObj = TrialStatus.find_by_code(warning['status']) if warning.has_key?('status')
          warning['status'] = statusObj.name if statusObj.present?
        end
      end

      if msg.has_key?('errors')
        msg['errors'].each do |error|
          statusObj = TrialStatus.find_by_code(error['status']) if error.has_key?('status')
          error['status'] = statusObj.name if statusObj.present?
        end
      end

      return msg
    end
end
