class TrialsController < ApplicationController
  before_action :set_trial, only: [:show, :edit, :update, :destroy]
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?

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
    @search_result = {}

    existing_nct_ids = OtherId.where('protocol_id = ? AND protocol_id_origin_id = ?', params[:nct_id].upcase, ProtocolIdOrigin.find_by_code('NCT').id)
    if existing_nct_ids.length > 0
      @search_result[:error_msg] = 'A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page.'
      return
    end

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

    @trial = Trial.new(import_params(xml))
    @trial.current_user = @current_user

    respond_to do |format|
      if @trial.save
        format.html { redirect_to @trial, notice: 'Trial was successfully imported.' }
        format.json { render :show, status: :created, location: @trial }
      else
        format.html { render :new }
        format.json { render json: @trial.errors, status: :unprocessable_entity }
      end
    end
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
                                  :process_priority, :process_comment, :nci_specific_comment, :nih_nci_div, :nih_nci_prog, :keywords,
                                  :board_name, :board_affiliation_id, :board_approval_num, :board_approval_status_id,
                                  other_ids_attributes: [:id, :protocol_id_origin_id, :protocol_id, :_destroy],
                                  alternate_titles_attributes: [:id, :category, :title, :source, :_destroy],
                                  central_contacts_attributes: [:id, :country, :phone, :email, :central_contact_type_id, :person_id, :trial_id, :fullname],
                                  trial_funding_sources_attributes: [:id, :organization_id, :_destroy],
                                  collaborators_attributes: [:id, :organization_id, :org_name, :_destroy],
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

  def import_params (xml)
    import_params = {}

    import_params[:edit_type] = 'import'
    import_params[:is_draft] = false
    import_params[:study_source_id] = StudySource.find_by_code('IND').id
    import_params[:lead_protocol_id] = xml.xpath('//org_study_id').text

    import_params[:other_ids_attributes] = []
    xml.xpath('//secondary_id').each do |other_id|
      import_params[:other_ids_attributes].push({protocol_id_origin_id: ProtocolIdOrigin.find_by_code('OTH').id, protocol_id: other_id.text})
    end
    import_params[:other_ids_attributes].push({protocol_id_origin_id: ProtocolIdOrigin.find_by_code('NCT').id, protocol_id: xml.xpath('//nct_id').text})

    import_params[:brief_title] = xml.xpath('//brief_title').text
    import_params[:official_title] = xml.xpath('//official_title').text

    import_params[:collaborators_attributes] = []
    xml.xpath('//collaborator/agency').each do |collaborator|
      import_params[:collaborators_attributes].push({org_name: collaborator.text})
    end

    import_params[:oversight_authorities_attributes] = []
    xml.xpath('//oversight_info/authority').each do |authority|
      splits = authority.text.split(':')
      import_params[:oversight_authorities_attributes].push({country: splits[0].strip, organization: splits[1].strip})
    end

    import_params[:data_monitor_indicator] = xml.xpath('//oversight_info/has_dmc').text if xml.xpath('//oversight_info/has_dmc').present?
    import_params[:brief_summary] = xml.xpath('//brief_summary').text
    import_params[:detailed_description] = xml.xpath('//detailed_description').text

    import_params[:trial_status_wrappers_attributes] = []
    ctrp_status_code = map_status(xml.xpath('//overall_status').text)
    ctrp_status = TrialStatus.find_by_code(ctrp_status_code)
    import_params[:trial_status_wrappers_attributes].push({trial_status_id: ctrp_status.id}) if ctrp_status.present?

    import_params[:start_date] = convert_date(xml.xpath('//start_date').text) if xml.xpath('//start_date').present?
    import_params[:start_date_qual] = 'Actual' if xml.xpath('//start_date').present?
    import_params[:comp_date] = convert_date(xml.xpath('//completion_date').text) if xml.xpath('//completion_date').present?
    import_params[:comp_date_qual] = xml.xpath('//completion_date').attr('type') if xml.xpath('//completion_date').present?
    import_params[:primary_comp_date] = convert_date(xml.xpath('//primary_completion_date').text) if xml.xpath('//primary_completion_date').present?
    import_params[:primary_comp_date_qual] = xml.xpath('//primary_completion_date').attr('type') if xml.xpath('//primary_completion_date').present?

    ctrp_phase_code = map_phase(xml.xpath('//phase').text)
    ctrp_phase = Phase.find_by_code(ctrp_phase_code)
    import_params[:phase_id] = ctrp_phase.id if ctrp_phase.present?

    ctrp_research_category = ResearchCategory.find_by_name(xml.xpath('//study_type').text)
    import_params[:research_category_id] = ctrp_research_category.id if ctrp_research_category.present?

    xml.xpath('//study_design').text.split(',').each do |study_design|
      splits = study_design.split(':')
      case splits[0].strip
        when 'Allocation'
          ctrp_allocation_code = map_allocation(splits[1].strip)
          ctrp_allocation = Allocation.find_by_code(ctrp_allocation_code)
          import_params[:allocation_id] = ctrp_allocation.id if ctrp_allocation.present?
        when 'Endpoint Classification'
          ctrp_study_classification_code = map_study_classification(splits[1].strip)
          ctrp_study_classification = StudyClassification.find_by_code(ctrp_study_classification_code)
          import_params[:study_classification_id] = ctrp_study_classification.id if ctrp_study_classification.present?
        when 'Intervention Model'
          ctrp_intervention_model_code = map_intervention_model(splits[1].strip)
          ctrp_intervention_model = InterventionModel.find_by_code(ctrp_intervention_model_code)
          import_params[:intervention_model_id] = ctrp_intervention_model.id if ctrp_intervention_model.present?
        when 'Masking'
          ctrp_masking_code = map_masking(splits[1].strip)
          ctrp_masking = Masking.find_by_code(ctrp_masking_code)
          import_params[:masking_id] = ctrp_masking.id if ctrp_masking.present?
        when 'Primary Purpose'
          ctrp_primary_purpose_code = map_primary_purpose(splits[1].strip)
          ctrp_primary_purpose = PrimaryPurpose.find_by_code(ctrp_primary_purpose_code)
          import_params[:primary_purpose_id] = ctrp_primary_purpose.id if ctrp_primary_purpose.present?
      end
    end

    import_params[:outcome_measures_attributes] = []
    xml.xpath('//primary_outcome').each do |p_outcome|
      import_params[:outcome_measures_attributes].push({title: p_outcome.xpath('measure').text, time_frame: p_outcome.xpath('time_frame').text, safety_issue: p_outcome.xpath('safety_issue').text, outcome_measure_type_id: OutcomeMeasureType.find_by_code('PRI').id})
    end
    xml.xpath('//secondary_outcome').each do |s_outcome|
      import_params[:outcome_measures_attributes].push({title: s_outcome.xpath('measure').text, time_frame: s_outcome.xpath('time_frame').text, safety_issue: s_outcome.xpath('safety_issue').text, outcome_measure_type_id: OutcomeMeasureType.find_by_code('SEC').id})
    end

    import_params[:num_of_arms] = xml.xpath('//number_of_arms').text if xml.xpath('//number_of_arms').present?
    import_params[:target_enrollment] = xml.xpath('//enrollment').text if xml.xpath('//enrollment').present?

    if xml.xpath('//eligibility/criteria').present?
      import_params[:other_criteria_attributes] = []
      criteria_text = xml.xpath('//eligibility/criteria').text
      criteria_text = criteria_text.sub('Inclusion Criteria', 'INCLUSION CRITERIA')
      criteria_text = criteria_text.sub('Exclusion Criteria', 'EXCLUSION CRITERIA')
      if criteria_text.include? 'INCLUSION CRITERIA:'
        inclusion_partition = criteria_text.partition('INCLUSION CRITERIA:')
        if inclusion_partition[0].include? 'EXCLUSION CRITERIA:'
          import_params[:other_criteria_attributes].push({criteria_type: 'Inclusion', criteria_desc: inclusion_partition[2]})
          sub_inclusion_partition = inclusion_partition[0].partition('EXCLUSION CRITERIA:')
          import_params[:other_criteria_attributes].push({criteria_type: 'Exclusion', criteria_desc: sub_inclusion_partition[2]})
        elsif inclusion_partition[2].include? 'EXCLUSION CRITERIA:'
          sub_inclusion_partition = inclusion_partition[2].partition('EXCLUSION CRITERIA:')
          import_params[:other_criteria_attributes].push({criteria_type: 'Inclusion', criteria_desc: sub_inclusion_partition[0]})
          import_params[:other_criteria_attributes].push({criteria_type: 'Exclusion', criteria_desc: sub_inclusion_partition[2]})
        else
          import_params[:other_criteria_attributes].push({criteria_type: 'Inclusion', criteria_desc: inclusion_partition[2]})
        end
      elsif criteria_text.include? 'EXCLUSION CRITERIA:'
        exclution_partition = criteria_text.partition('EXCLUSION CRITERIA:')
        import_params[:other_criteria_attributes].push({criteria_type: 'Exclusion', criteria_desc: exclution_partition[2]})
      else
        import_params[:other_criteria_attributes].push({criteria_type: 'Inclusion', criteria_desc: criteria_text})
      end
    end

    ctrp_gender = Gender.find_by_name(xml.xpath('//eligibility/gender').text)
    import_params[:gender_id] = ctrp_gender.id if ctrp_gender.present?

    if xml.xpath('//eligibility/minimum_age').present?
      min_age_text = xml.xpath('//eligibility/minimum_age').text
      if !(min_age_text.include? 'N/A')
        splits = min_age_text.split(' ')
        import_params[:min_age] = splits[0]
        ctrp_min_age_unit = AgeUnit.find_by_name(splits[1]) if splits[1].present?
        import_params[:min_age_unit_id] = ctrp_min_age_unit.id if ctrp_min_age_unit.present?
      end
    end

    if xml.xpath('//eligibility/maximum_age').present?
      max_age_text = xml.xpath('//eligibility/maximum_age').text
      if !(max_age_text.include? 'N/A')
        splits = max_age_text.split(' ')
        import_params[:max_age] = splits[0]
        ctrp_max_age_unit = AgeUnit.find_by_name(splits[1]) if splits[1].present?
        import_params[:max_age_unit_id] = ctrp_max_age_unit.id if ctrp_max_age_unit.present?
      end
    end

    import_params[:accept_vol] = xml.xpath('//healthy_volunteers').text if xml.xpath('//healthy_volunteers').present?
    import_params[:verification_date] = convert_date(xml.xpath('//verification_date').text) if xml.xpath('//verification_date').present?

    submission_params = {}
    submission_params[:updated_at] = xml.xpath('//lastchanged_date').text
    submission_params[:created_at] = xml.xpath('//firstreceived_date').text
    submission_params[:submission_num] = 1
    submission_params[:submission_date] = Date.today
    ori = SubmissionType.find_by_code('ORI')
    submission_params[:submission_type_id] = ori.id if ori.present?
    cct = SubmissionSource.find_by_code('CCT')
    submission_params[:submission_source_id] = cct.id if cct.present?
    cti = SubmissionMethod.find_by_code('CTI')
    submission_params[:submission_method_id] = cti.id if cti.present?
    submission_params[:user_id] = @current_user.id if @current_user.present?
    import_params[:submissions_attributes] = [submission_params]

    ctrp_responsible_party = ResponsibleParty.find_by_name(xml.xpath('//responsible_party/responsible_party_type').text)
    import_params[:responsible_party_id] = ctrp_responsible_party.id if ctrp_responsible_party.present?

    ctrp_keywords = ''
    xml.xpath('//keyword').each_with_index do |keyword, i|
      ctrp_keywords += ', ' if i > 0
      ctrp_keywords += keyword
    end
    import_params[:keywords] = ctrp_keywords if ctrp_keywords.length > 0

    import_params[:intervention_indicator] = xml.xpath('//is_fda_regulated').text if xml.xpath('//is_fda_regulated').present?
    import_params[:sec801_indicator] = xml.xpath('//is_section_801').text if xml.xpath('//is_section_801').present?

    return import_params
  end

  # Maps the ClinicalTrials.gov status to CTRP status code
  def map_status (ct_status)
    case ct_status
      when 'Not yet recruiting'
        ctrp_status_code = 'INR'
      when 'Withdrawn'
        ctrp_status_code = 'WIT'
      when 'Recruiting'
        ctrp_status_code = 'ACT'
      when 'Enrolling by Invitation'
        ctrp_status_code = 'EBI'
      when 'Suspended'
        ctrp_status_code = 'TCL'
      when 'Active, not recruiting'
        ctrp_status_code = 'CAC'
      when 'Terminated'
        ctrp_status_code = 'ACO'
      when 'Completed'
        ctrp_status_code = 'COM'
      when 'Available'
        ctrp_status_code = 'AVA'
      when 'No longer available'
        ctrp_status_code = 'NLA'
      when 'Temporarily not available'
        ctrp_status_code = 'TNA'
      when 'Approved for marketing'
        ctrp_status_code = 'AFM'
      else
        ctrp_status_code = ''
    end

    return ctrp_status_code
  end

  def convert_date (ct_date)
    splits = ct_date.split(' ')

    case splits[0]
      when 'January'
        month = 'Jan'
      when 'February'
        month = 'Feb'
      when 'March'
        month = 'Mar'
      when 'April'
        month = 'Apr'
      when 'May'
        month = 'May'
      when 'June'
        month = 'Jun'
      when 'July'
        month = 'Jul'
      when 'August'
        month = 'Aug'
      when 'September'
        month = 'Sep'
      when 'October'
        month = 'Oct'
      when 'November'
        month = 'Nov'
      when 'December'
        month = 'Dec'
      else
        month = ''
    end

    return '01-' + month + '-' + splits[1]
  end

  def map_phase (ct_phase)
    case ct_phase
      when 'N/A'
        ctrp_phase_code = 'N/A'
      when 'Phase 0'
        ctrp_phase_code = '0'
      when 'Phase 1'
        ctrp_phase_code = 'I'
      when 'Phase 1/Phase 2'
        ctrp_phase_code = 'I/II'
      when 'Phase 2'
        ctrp_phase_code = 'II'
      when 'Phase 2/Phase 3'
        ctrp_phase_code = 'II/III'
      when 'Phase 3'
        ctrp_phase_code = 'III'
      when 'Phase 4'
        ctrp_phase_code = 'IV'
      else
        ctrp_phase_code = ''
    end

    return ctrp_phase_code
  end

  def map_allocation (ct_allocation)
    case ct_allocation
      when 'N/A'
        ctrp_allocation_code = 'NA'
      when 'Randomized'
        ctrp_allocation_code = 'RCT'
      when 'Nonrandomized'
        ctrp_allocation_code = 'NRT'
      else
        ctrp_allocation_code = ''
    end

    return ctrp_allocation_code
  end

  def map_study_classification (ct_study_classification)
    case ct_study_classification
      when 'N/A'
        ctrp_study_classification_code = 'NA'
      when 'Safety Study'
        ctrp_study_classification_code = 'SF'
      when 'Efficacy Study'
        ctrp_study_classification_code = 'EFF'
      when 'Safety/Efficacy Study'
        ctrp_study_classification_code = 'SFEFF'
      when 'Bio-equivalence Study'
        ctrp_study_classification_code = 'BEQ'
      when 'Bio-availability Study'
        ctrp_study_classification_code = 'BAV'
      when 'Pharmacokinetics Study'
        ctrp_study_classification_code = 'PD'
      when 'Pharmacodynamics Study'
        ctrp_study_classification_code = 'PK'
      when 'Pharmacokinetics/dynamics Study'
        ctrp_study_classification_code = 'PKPD'
      else
        ctrp_study_classification_code = ''
    end

    return ctrp_study_classification_code
  end

  def map_intervention_model (ct_intervention_model)
    case ct_intervention_model
      when 'Single Group Assignment'
        ctrp_intervention_model_code = 'SG'
      when 'Parallel Assignment'
        ctrp_intervention_model_code = 'PL'
      when 'Cross-over Assignment'
        ctrp_intervention_model_code = 'CO'
      when 'Factorial Assignment'
        ctrp_intervention_model_code = 'FT'
      else
        ctrp_intervention_model_code = ''
    end

    return ctrp_intervention_model_code
  end

  def map_masking (ct_masking)
    if ct_masking.include? 'Open'
      ctrp_masking_code = 'OP'
    elsif ct_masking.include? 'Single Blind'
      ctrp_masking_code = 'SB'
    elsif ct_masking.include? 'Double Blind'
      ctrp_masking_code = 'DB'
    else
      ctrp_masking_code = ''
    end

    return ctrp_masking_code
  end

  def map_primary_purpose (ct_primary_purpose)
    case ct_primary_purpose
      when 'Treatment'
        ctrp_primary_purpose_code = 'TRM'
      when 'Prevention'
        ctrp_primary_purpose_code = 'PRV'
      when 'Diagnostic'
        ctrp_primary_purpose_code = 'DIA'
      when 'Supportive Care'
        ctrp_primary_purpose_code = 'SUP'
      when 'Screening'
        ctrp_primary_purpose_code = 'SCR'
      when 'Health Services Research '
        ctrp_primary_purpose_code = 'HSR'
      when 'Basic Science'
        ctrp_primary_purpose_code = 'BSC'
      when 'Other'
        ctrp_primary_purpose_code = 'OTH'
      else
        ctrp_primary_purpose_code = ''
    end

    return ctrp_primary_purpose_code
  end
end
