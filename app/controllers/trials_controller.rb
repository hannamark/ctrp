class TrialsController < ApplicationController
  before_action :set_trial, only: [:show, :edit, :update, :destroy, :validate_milestone, :rollback]
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?
  before_action :set_paper_trail_whodunnit, only: [:create,:update, :destroy]


  # GET /trials
  # GET /trials.json
  def index
    @trials = Trial.all
  end

  # GET /trials/1
  # GET /trials/1.jsonzf
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

        trial_service = TrialService.new({trial: @trial})
        trial_service.send_email(@trial.edit_type)
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

    Rails.logger.info "params in update: #{params}"

    trial_service = TrialService.new({trial: @trial})
    if params[:trial][:edit_type] == 'amend'
      trial_json = trial_service.get_json
    end

    respond_to do |format|
      if @trial.update(trial_params)
        format.html { redirect_to @trial, notice: 'Trial was successfully updated.' }
        format.json { render :show, status: :ok, location: @trial }

        if trial_json.present?
          trial_service.save_history(trial_json)
        end

        trial_service.send_email(@trial.edit_type)
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

  def rollback
    trial_service = TrialService.new({trial: @trial})
    trial_service.rollback(params[:submission_id])
    respond_to do |format|
      format.json { render :json => params }
    end
  end

  def genders
    @genders = Gender.all
    respond_to do |format|
      format.json { render :json => @genders }
    end
  end

  # get mail logs for a given trial id
  def get_mail_logs
    @mail_logs = []
    if params.has_key?(:trial_id)
      @mail_logs = MailLog.where(:trial_id => params[:trial_id])
    end

    respond_to do |format|
      format.json { render :json => @mail_logs }
    end
  end

  # retrieve trial checkout and checkin history
  def get_trial_checkout_history
    @checkout_history = []
    if params.has_key?(:trial_id)
      @checkout_history = TrialCheckoutLog.where(:trial_id => params[:trial_id])
    end

    respond_to do |format|
      format.json { render :json => @checkout_history }
    end
  end

  def search_trial_with_nci_id

    if params.has_key?(:nci_id)
      @search_result = Trial.with_nci_id(params[:nci_id].upcase).first
      @search_result = @search_result.nil? ? {error_msg: 'Trial is not found'} : @search_result
    else
      # missing nci_id
      @search_result = {error_msg: 'Trial is not found'}
    end

  end

  def trial_identifier_types
    @trial_identifier_types = IdentifierType.all
    respond_to do |format|
      format.json { render :json => @trial_identifier_types }
    end
  end

  def age_units
    @age_units = AgeUnit.all
    respond_to do |format|
      format.json { render :json => @age_units }
    end
  end

  def biospecimen_rententions
    @retention = BiospecimenRetention.all
    respond_to do |format|
      format.json { render :json => {:data => @retention} }
    end
  end

  def time_perspectives
    @perspectives = TimePerspective.all
    respond_to do |format|
      format.json { render :json => {:data => @perspectives} }
    end
  end

  def amendment_reasons
    @amendment_reasons = AmendmentReason.all
    respond_to do |format|
      format.json { render :json => {:data => @amendment_reasons} }
    end
  end

  def study_models
    @study_models = StudyModel.all
    respond_to do |format|
      format.json { render :json => {:data => @study_models} }
    end
  end

  def study_classifications
    @classifications = StudyClassification.all
    respond_to do |format|
      format.json { render :json => {:data => @classifications } }
    end
  end

  def get_allocations
    @allocations = Allocation.all
    respond_to do |format|
      format.json { render :json => {:allocations => @allocations } }
    end
  end

  def get_maskings
    @maskings = Masking.all
    respond_to do |format|
      format.json { render :json => {:maskings => @maskings} }
    end
  end

  def get_intervention_types
    @intervention_types = InterventionType.all

    respond_to do |format|
      format.json { render :json => @intervention_types }
    end
  end

  def get_intervention_models
    @intervention_models = InterventionModel.all

    respond_to do |format|
        format.json { render :json => {:models => @intervention_models} }
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

  # search interventions table against the 'name' field
  def search_ctrp_interventions
    @intervention = nil
    if params[:c_code].present?
      @intervention = Intervention.find_by_c_code(params[:c_code]) # first match
    end

    respond_to do |format|
      format.json { render :json => { :data => @intervention } }
    end

  end

  def lookup_imported_ncit_interventions
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 20 if params[:rows].blank?
    params[:sort] = 'id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?
    @interventions = []

    if params[:intervention_name].present? # and !params[:intervention_name].blank?
      p "searching imported ncit interventions"
      @interventions = NcitIntervention.all
      @interventions = @interventions.matches_like('synonyms', params[:intervention_name]) if params[:include_synonyms].present?  # like synonyms
      @interventions = @interventions.matches_exact('preferred_name', params[:intervention_name]) if params[:exact].present?

      if !params[:exact].present? and !params[:include_synonyms].present?
        @interventions = @interventions.match_loosely_preferred_name(params[:intervention_name])
      end

      @interventions = @interventions.sort_by_col(params).page(params[:start]).per(params[:rows])
    end

    respond_to do |format|
      format.json { render :json => {:data => @interventions, :start => params[:start], :rows => params[:rows], :total => @interventions.size == 0 ? 0 : @interventions.total_count, :sort => params[:sort], :order => params[:order]} }
    end
  end

  def search
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    if params[:trial_ownership].blank?
      params[:rows] = 20 if params[:rows].blank?
    else
      params[:rows] = nil
    end

    params[:sort] = 'lead_protocol_id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if params[:trial_ownership].present?

      if  params[:no_nih_nci_prog].present?
        @trials =  @trials.where(nih_nci_prog: nil) unless @trials.blank?
      end
      if ['ROLE_ADMIN','ROLE_SUPER','ROLE_ABSTRACTOR'].include? current_user.role
        if params[:family_id].present?
          @trials = @trials.in_family(params[:family_id], Date.today)
        elsif params[:organization_id].present?
          @trials = @trials.matches('lead_org_id', params[:organization_id])
        end
      end

      if ['ROLE_SITE-SU','ROLE_ACCOUNT-APPROVER'].include? current_user.role
        family = FamilyMembership.find_by_organization_id(current_user.organization_id)
        if family
          @trials = @trials.in_family(family.family_id, Date.today)
        else
          @trials = @trials.matches('lead_org_id', current_user.organization_id)
        end
      end

    elsif params[:protocol_id].present? || params[:official_title].present? || params[:phases].present? || params[:purposes].present? || params[:pilot].present? || params[:pi].present? || params[:org].present?  || params[:study_sources].present?
      @trials = Trial.all
      @trials = @trials.filter_rejected
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

      @trials = @trials.with_internal_sources(params[:internal_sources]) if params[:internal_sources].present?
      @trials = @trials.with_org(params[:org], params[:org_types]) if params[:org].present?
      @trials = @trials.with_study_sources(params[:study_sources]) if params[:study_sources].present?
      @trials = @trials.with_owner(@current_user.username) if params[:searchType] == 'My Trials'
      @trials = @trials.is_not_draft if params[:searchType] == 'All Trials'
      @trials = @trials.is_draft(@current_user.username) if params[:searchType] == 'Saved Drafts'
      @trials = @trials.sort_by_col(params).group(:'trials.id').page(params[:start]).per(params[:rows])

      @trials.each do |trial|
        trial.current_user = @current_user
      end
    else
      @trials = []
    end
  end


  def checkout_trial

    available_checkout_types = ["admin", "scientific", "scientificadmin"]
    checkout_type = params[:type].downcase
    checkout_message = nil

    if params.has_key?(:trial_id) and available_checkout_types.include? (checkout_type)

      @trial = Trial.find(params[:trial_id])
      @trial.edit_type = 'checkoutin' # so as to avoid sending emails
      checkout_json = {"by": @current_user.username, "date": Time.now}.to_json

      if checkout_type == "admin" and (@trial.admin_checkout.nil? || @current_user.role == "ROLE_ADMIN" || @current_user.role == "ROLE_SUPER")
        @trial.update_attribute('admin_checkout', checkout_json)
        checkout_message = 'Admin checkout was successful'

      elsif checkout_type == "scientificadmin" and  ((@trial.admin_checkout.nil? and @trial.scientific_checkout.nil?) || @current_user.role == "ROLE_ADMIN" || @current_user.role == "ROLE_SUPER")
        @trial.update_attributes('admin_checkout': checkout_json, 'scientific_checkout': checkout_json)
        checkout_message = 'Admin and Scientific checkout was successful'

      elsif checkout_type == "scientific" and (@trial.scientific_checkout.nil? || @current_user.role == "ROLE_ADMIN" || @current_user.role == "ROLE_SUPER")
        @trial.update_attribute('scientific_checkout', checkout_json)
        checkout_message = 'Scientific checkout was successful'
      end
    end
    # Log the checkout record
    user_fullname = "#{@current_user.first_name} #{@current_user.last_name}"
    user_fullname.strip!
    result = checkout_message.nil? ? 'Failed' : 'Success'
    if checkout_type == "scientificadmin"
      TrialCheckoutLog.create(trial: @trial, abstraction_type: 'admin', category: 'Checkout', username: @current_user.username, full_name: user_fullname, result: result, user: @current_user)
      TrialCheckoutLog.create(trial: @trial, abstraction_type: 'scientific', category: 'Checkout', username: @current_user.username, full_name: user_fullname, result: result, user: @current_user)
    else
      TrialCheckoutLog.create(trial: @trial, abstraction_type: checkout_type, category: 'Checkout', username: @current_user.username, full_name: user_fullname, result: result, user: @current_user)
    end


    respond_to do |format|
      format.json { render :json => {:result => @trial, :checkout_message => checkout_message} }
    end
  end

  def checkin_trial
    available_checkin_types = ["admin", "scientific", "scientificadmin"]
    checkin_type = params[:type].downcase
    checkin_message = nil
    checkin_comment = params[:checkin_comment].present? ? params[:checkin_comment] : nil

    if params.has_key?(:trial_id) and available_checkin_types.include? (checkin_type) and checkin_comment.present?

      @trial = Trial.find(params[:trial_id])
      @trial.edit_type = 'checkoutin' # so as to avoid sending emails

      if checkin_type == "admin"
        @trial.update_attribute('admin_checkout', nil)
        checkin_message = 'Admin checkin was successful'

      elsif checkin_type == "scientificadmin"
        @trial.update_attributes('admin_checkout': nil, 'scientific_checkout': nil)
        checkin_message = 'Admin and Scientific checkin was successful'

      elsif checkin_type == "scientific"
        @trial.update_attribute('scientific_checkout', nil)
        checkin_message = 'Scientific checkin was successful'

      end
    end

    user_fullname = "#{@current_user.first_name} #{@current_user.last_name}"
    user_fullname.strip!
    result = checkin_message.nil? ? 'Failed' : 'Success'
    if checkin_type == "scientificadmin"
      TrialCheckoutLog.create(trial_id: params[:trial_id], abstraction_type: 'admin', category: 'Checkin', username: @current_user.username, full_name: user_fullname, result: result, user: @current_user, checkin_comment: checkin_comment)
      TrialCheckoutLog.create(trial_id: params[:trial_id], abstraction_type:  'scientific', category: 'Checkin', username: @current_user.username, full_name: user_fullname, result: result, user: @current_user, checkin_comment: checkin_comment)
    else
      TrialCheckoutLog.create(trial_id: params[:trial_id], abstraction_type: checkin_type, category: 'Checkin', username: @current_user.username, full_name: user_fullname, result: result, user: @current_user, checkin_comment: checkin_comment)
    end


    respond_to do |format|
      format.json { render :json => {:result => @trial, :checkin_message => checkin_message} }
    end

  end


  def search_pa
    # Pagination/sorting params initialization
    Rails.logger.info "In Search PA, params = #{params.inspect}"
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 20 if params[:rows].blank?
    params[:sort] = 'lead_protocol_id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    if params[:checkout].present? || params[:scientific_checkout].present? || params[:admin_checkout].present? || params[:submission_type].present? ||  params[:submission_method].present? ||params[:nih_nci_prog].present? || params[:nih_nci_div].present? || params[:milestone].present? || params[:protocol_origin_type] || params[:processing_status].present? || params[:trial_status].present? || params[:research_category].present? || params[:other_id].present? || params[:protocol_id].present? || params[:official_title].present? || params[:phases].present? || params[:purposes].present? || params[:pilot].present? || params[:pi].present? || params[:org].present?  || params[:study_sources].present? || params[:internal_sources].present?
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
      @trials = @trials.user_trials(params[:user_id]) if params[:user_id].present?
      @trials = @trials.with_org(params[:org], params[:org_types]) if params[:org].present?
      @trials = @trials.with_study_sources(params[:study_sources]) if params[:study_sources].present?
      @trials = @trials.with_internal_sources(params[:internal_sources]) if params[:internal_sources].present?
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
        Rails.logger.info "Trial checked out by me selected"
        @trials = @trials.select{|trial| trial.checked_out_by_current_user(@current_user.username)}
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

        # Flag that indicates if the two status dates are the same
        if from_status_code == 'STATUSZERO'
          same_date = false
        else
          same_date = statuses[i - 1]['status_date'] == statuses[i]['status_date']
        end

        validation_msg = convert_validation_msg(transition_matrix[from_status_code][to_status_code], from_status_code, to_status_code, same_date)
        @validation_msgs.append(validation_msg)
      end
    end
  end

  def validate_milestone
    @validation_msgs = @trial.validate_milestone(params[:submission_id], params[:milestone_id])
  end

  def search_clinical_trials_gov_ignore_exists
    @search_result = {}

    # existing_nct_ids = OtherId.where('protocol_id = ? AND protocol_id_origin_id = ?', params[:nct_id].upcase, ProtocolIdOrigin.find_by_code('NCT').id) params.has_key?(:ignore_exists)
    # if existing_nct_ids.length > 0
    #   @search_result[:error_msg] = 'A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page.'
    #   return
    # end

    url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
    url = url.sub('NCT********', params[:nct_id])
    begin
      xml = Nokogiri::XML(open(url))
    rescue OpenURI::HTTPError
      @search_result[:error_msg] = 'Trial is not found'
    else
      @search_result[:nct_id] = xml.xpath('//id_info/nct_id').text
      @search_result[:official_title] = xml.xpath('//official_title').text
      @search_result[:research_category] = xml.xpath('//study_type').text
      # @search_result[:status] = xml.xpath('//overall_status').text
      # @search_result[:condition] = ''
      # xml.xpath('//condition').each_with_index do |condition, i|
      #   @search_result[:condition] += ', ' if i > 0
      #   @search_result[:condition] += condition
      # end
      # @search_result[:intervention] = ''
      # xml.xpath('//intervention').each_with_index do |intervention, i|
      #   @search_result[:intervention] += ', ' if i > 0
      #   @search_result[:intervention] += intervention.xpath('intervention_type').text
      #   @search_result[:intervention] += ': '
      #   @search_result[:intervention] += intervention.xpath('intervention_name').text
      # end

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
      lead_protocol_id = xml.xpath('//org_study_id').text
      org_name = xml.xpath('//sponsors/lead_sponsor/agency').text

      dup_trial = Trial.joins(:lead_org).where('organizations.name ilike ? AND lead_protocol_id = ?', org_name, lead_protocol_id)
      dup_trial = dup_trial.filter_rejected
      if dup_trial.length > 0
        @search_result[:error_msg] = 'Combination of Lead Organization Trial ID and Lead Organization must be unique.'
        return
      end

      @search_result[:nct_id] = xml.xpath('//id_info/nct_id').text
      @search_result[:official_title] = xml.xpath('//official_title').text
      @search_result[:status] = xml.xpath('//overall_status').text
      @search_result[:condition] = ''
      xml.xpath('//condition').each_with_index do |condition, i|
        @search_result[:condition] += ', ' if i > 0
        @search_result[:condition] += condition
      end
      @search_result[:intervention] = ''
      xml.xpath('//intervention').each_with_index do |intervention, i|
        @search_result[:intervention] += ', ' if i > 0
        @search_result[:intervention] += intervention.xpath('intervention_type').text
        @search_result[:intervention] += ': '
        @search_result[:intervention] += intervention.xpath('intervention_name').text
      end
    end
  end

  def import_clinical_trials_gov
    url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
    url = url.sub('NCT********', params[:nct_id])
    xml = Nokogiri::XML(open(url))

    trial_service = TrialService.new({trial: nil})
    @trial = Trial.new(trial_service.import_params(xml, @current_user))
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
    params.require(:trial).permit(:nci_id, :lead_protocol_id, :allocation_id, :official_title, :acronym, :pilot, :research_category_id,
                                  :primary_purpose_other, :secondary_purpose_other, :investigator_title, :intervention_model_id, :accept_vol, :min_age, :max_age, :min_age_unit_id, :max_age_unit_id, :gender_id,
                                  :program_code, :grant_question, :start_date, :start_date_qual, :primary_comp_date, :num_of_arms, :biospecimen_retention_id, :biospecimen_desc,
                                  :primary_comp_date_qual, :comp_date, :comp_date_qual, :ind_ide_question, :masking_id, :masking_role_caregiver,
                                  :masking_role_investigator, :masking_role_outcome_assessor, :masking_role_subject,
                                  :intervention_indicator, :sec801_indicator, :data_monitor_indicator, :history, :study_pop_desc, :sampling_method,
                                  :study_source_id, :phase_id, :primary_purpose_id, :secondary_purpose_id, :study_model_id, :study_model_other,
                                  :accrual_disease_term_id, :responsible_party_id, :lead_org_id, :pi_id, :sponsor_id, :time_perspective_id, :time_perspective_other,
                                  :investigator_id, :investigator_aff_id, :is_draft, :edit_type, :lock_version, :intervention_name,
                                  :brief_title, :brief_summary, :objective, :detailed_description, :study_classification_id, :target_enrollment, :final_enrollment,
                                  :process_priority, :process_comment, :nci_specific_comment, :nih_nci_div, :nih_nci_prog, :keywords,
                                  :board_name, :board_affiliation_id, :board_approval_num, :board_approval_status_id, :send_trial_flag, :verification_date,
                                  other_ids_attributes: [:id, :protocol_id_origin_id, :protocol_id, :_destroy],
                                  alternate_titles_attributes: [:id, :category, :title, :source, :_destroy],
                                  arms_groups_attributes: [:id, :label, :arms_groups_type, :description, :trial_id, :_destroy,
                                                           arms_groups_interventions_associations_attributes:[:id,:intervention_id,:_destroy]],
                                  central_contacts_attributes: [:id, :country, :phone, :email, :central_contact_type_id, :person_id, :trial_id, :fullname, :extension],
                                  trial_funding_sources_attributes: [:id, :organization_id, :_destroy],
                                  collaborators_attributes: [:id, :organization_id, :org_name, :_destroy],
                                  grants_attributes: [:id, :funding_mechanism, :institute_code, :serial_number, :nci, :_destroy],
                                  trial_status_wrappers_attributes: [:id, :status_date, :why_stopped, :trial_status_id,
                                                                     :comment, :_destroy],
                                  ind_ides_attributes: [:id, :ind_ide_type, :ind_ide_number, :grantor, :holder_type_id,
                                                        :nih_nci, :expanded_access, :expanded_access_type_id, :exempt, :_destroy],
                                  oversight_authorities_attributes: [:id, :country, :organization, :_destroy],
                                  associated_trials_attributes: [:id, :trial_identifier, :identifier_type_id, :trial_id, :official_title, :research_category_name, :_destroy],
                                  trial_documents_attributes: [:id, :file_name, :document_type, :document_subtype,:source_document,:deleted_by,:deletion_date, :file, :_destroy, :status, :added_by_id, :why_deleted, :source_document],
                                  interventions_attributes: [:id, :name, :description, :other_name, :trial_id, :intervention_type_id, :index, :c_code, :_destroy],
                                  other_criteria_attributes: [:id, :index, :criteria_type, :trial_id, :lock_version, :criteria_desc, :_destroy],
                                  submissions_attributes: [:id, :amendment_num, :amendment_date, :amendment_reason_id, :_destroy],
                                  sub_groups_attributes:[:id,:index,:label,:description,:_destroy],
                                  anatomic_site_wrappers_attributes: [:id, :anatomic_site_id, :_destroy],
                                  outcome_measures_attributes: [:id, :index,:title, :time_frame, :description, :safety_issue, :outcome_measure_type_id, :_destroy],
                                  markers_attributes: [:id,:name,:protocol_marker_name,:biomarker_use_id,:evaluation_type_other,:assay_type_other,:_destroy,:record_status,
                                                       :specimen_type_other,:cadsr_marker_id,
                                                       marker_eval_type_associations_attributes:[:id,:evaluation_type_id,:_destroy],
                                                       marker_assay_type_associations_attributes:[:id,:assay_type_id,:_destroy],
                                                       marker_spec_type_associations_attributes:[:id,:specimen_type_id,:_destroy],
                                                       marker_biomarker_purpose_associations_attributes:[:id,:biomarker_purpose_id,:_destroy]],
                                  diseases_attributes:[:id, :preferred_name, :code, :thesaurus_id, :display_name, :parent_preferred, :rank, :_destroy],
                                  milestone_wrappers_attributes:[:id, :milestone_id, :milestone_date, :comment, :submission_id, :created_by, :_destroy],
                                  processing_status_wrappers_attributes: [:id, :status_date, :processing_status_id, :trial_id, :submission_id],
                                  onholds_attributes:[:id, :onhold_reason_id, :onhold_desc, :onhold_date, :offhold_date, :_destroy],
                                  citations_attributes:[:id, :pub_med_id, :description, :results_reference, :_destroy],
                                  links_attributes:[:id, :url, :description, :_destroy], trial_ownerships_attributes:[:id, :user_id, :_destroy])
  end

  # Convert status code to name in validation messages
  def convert_validation_msg (msg, from_status_code, to_status_code, same_date)
    if msg.has_key?('warnings')
      msg['warnings'].each do |warning|
        statusObj = TrialStatus.find_by_code(warning['status']) if warning.has_key?('status')
        warning['status'] = statusObj.name if statusObj.present?

        if warning.has_key?('message')
          if warning['message'] == 'Invalid Transition'
            fromStatusObj = TrialStatus.find_by_code(from_status_code)
            warning['from'] = fromStatusObj.name if fromStatusObj.present?
            toStatusObj = TrialStatus.find_by_code(to_status_code)
            warning['to'] = toStatusObj.name if toStatusObj.present?
          elsif warning['message'] == 'Duplicate'
            dupStatusObj = TrialStatus.find_by_code(from_status_code)
            warning['dupStatus'] = dupStatusObj.name if dupStatusObj.present?
          elsif warning['message'] == 'Same Day'
            fromStatusObj = TrialStatus.find_by_code(from_status_code)
            warning['from'] = fromStatusObj.name if fromStatusObj.present?
            toStatusObj = TrialStatus.find_by_code(to_status_code)
            warning['to'] = toStatusObj.name if toStatusObj.present?
            warning['sameDate'] = same_date
          end
        end
      end
    end

    if msg.has_key?('errors')
      msg['errors'].each do |error|
        statusObj = TrialStatus.find_by_code(error['status']) if error.has_key?('status')
        error['status'] = statusObj.name if statusObj.present?

        if error.has_key?('message')
          if error['message'] == 'Invalid Transition'
            fromStatusObj = TrialStatus.find_by_code(from_status_code)
            error['from'] = fromStatusObj.name if fromStatusObj.present?
            toStatusObj = TrialStatus.find_by_code(to_status_code)
            error['to'] = toStatusObj.name if toStatusObj.present?
          elsif error['message'] == 'Duplicate'
            dupStatusObj = TrialStatus.find_by_code(from_status_code)
            error['dupStatus'] = dupStatusObj.name if dupStatusObj.present?
          end
        end
      end
    end

    return msg
  end

end
