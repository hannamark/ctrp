class TrialService
  @@is_IND_protocol = true # default to true
  @@cur_trial_status_code = nil
  @@is_cur_trial_status_active = false
  @@is_cur_trial_status_approved = false
  @@is_cur_trial_status_inreview = false
  @@is_cur_trial_status_withdrawn = false

  @@arm_label_max_length = 62  # max number of characters

  def initialize(params)
    @trial = params[:trial]
    @@is_IND_protocol = @trial.ind_ide_question == 'Yes' if @trial.present? ## find out if this trial is IND protocol
    cur_trial_status = @trial.trial_status_wrappers.last if @trial.present? && @trial.trial_status_wrappers.present?
    cur_trial_status_id = cur_trial_status.nil? ? nil : cur_trial_status.trial_status_id
    @@cur_trial_status_code = cur_trial_status_id.nil? ? nil : TrialStatus.find(cur_trial_status_id).code
    @@is_cur_trial_status_active = @@cur_trial_status_code == 'ACT'
    @@is_cur_trial_status_approved = @@cur_trial_status_code == 'APP'
    @@is_cur_trial_status_inreview = @@cur_trial_status_code == 'INR'
    @@is_cur_trial_status_withdrawn = @@cur_trial_status_code == 'WIT'

  end

  def get_json
    return @trial.to_json(include: [:other_ids, :ind_ides, :grants, :trial_status_wrappers, :trial_funding_sources,
                                    :oversight_authorities, :onholds, :associated_trials, :alternate_titles,
                                    :central_contacts, :outcome_measures, :other_criteria, :markers, :interventions,
                                    :arms_groups, :sub_groups, :participating_sites, :citations, :links, :diseases,
                                    :collaborators, :trial_ownerships, :anatomic_site_wrappers])
  end

  def save_history(trial_json)
    TrialHistory.create(snapshot: trial_json, submission: @trial.current_submission)
  end

  def validate()
    results = []
    if !@trial.present?
      return results
    end

    results |= _validate_general_trial_details() # concatenate array but remove duplicates
    results |= _validate_paa_regulatory_info_fda()
    results |= _validate_paa_regulatory_human_sub_safety()
    results |= _validate_paa_participating_sites()
    results |= _validate_paa_documents()
    results |= _validate_pas_trial_design()
    results |= _validate_pas_trial_description()
    results |= _validate_paa_nci_specific_info()
    results |= _validate_pas_arms_groups()
    results |= _validate_pas_eligibility()

    return results
  end

  def _validate_pas_eligibility
    pas_eligibility_rules = ValidationRule.where(model: 'trial', item: 'pas_eligibility')
    validation_result = []

    pas_eligibility_rules.each do |rule|
      if (rule.code == 'PAS28' and (!@trial.other_criteria.present? || @trial.other_criteria.size == 0)) ||
         (rule.code == 'PAS29' and !@trial.accept_vol.present?) ||
         (rule.code == 'PAS30' and !@trial.gender_id.present?) ||
         (rule.code == 'PAS31' and (!@trial.min_age.present? || !@trial.min_age_unit.present?)) ||
         (rule.code == 'PAS32' and (!@trial.max_age.present? || !@trial.max_age_unit.present?)) ||
         (rule.code == 'PAS33' and (!@trial.other_criteria.present? || @trial.other_criteria.size == 0))

        validation_result << rule
      end
    end

    return validation_result
  end

  def _validate_pas_arms_groups
    pas_arms_groups_rules = ValidationRule.where(model: 'trial', item: 'pas_arms/groups')
    validation_result = []

    is_arm_label_too_long = false
    all_arm_has_intervention = true # except 'No intervention' arms_group_type
    all_arms_groups = ArmsGroup.where(trial_id: @trial.id)
    inter_arms_groups = ArmsGroup.where(trial_id: @trial.id).where("arms_groups_type != ? OR arms_groups_type IS NULL", "No intervention")  #.where.not("arms_groups_type": 'No intervention')

    inter_arms_groups.each do |arm|
      all_arm_has_intervention = arm.arms_groups_interventions_associations.size > 0  # if 0, no interventions
      break if all_arm_has_intervention == false
    end

    arms_interventions_ids = []  # intervention ids associated with this trial's arms/groups
    all_arms_groups.each do |arm|
      if !is_arm_label_too_long
        is_arm_label_too_long = arm.label.present? && arm.label.length > @@arm_label_max_length # cannot be longer than 62 chars
      end
      cur_intervention_ids = arm.arms_groups_interventions_associations.pluck(:intervention_id)
      arms_interventions_ids |= cur_intervention_ids  # concatenate without duplicate id
    end

    all_interventions_ids_this_trial = Intervention.where(trial_id: @trial.id).pluck(:id)
    is_all_interventions_associated = all_interventions_ids_this_trial.sort() == arms_interventions_ids.sort() # check if every interventions in this trial have been associated with arms/groups

    pas_arms_groups_rules.each do |rule|
      if (rule.code == 'PAS26' and !all_arm_has_intervention) ||
         (rule.code == 'PAS27' and !is_all_interventions_associated) ||
         (rule.code == 'PAS50' and (@trial.arms_groups.nil? || @trial.arms_groups.size == 0)) ||
         (rule.code == 'PAS51' and is_arm_label_too_long)
        validation_result << rule
      end
    end

    return validation_result
  end

  def _validate_paa_nci_specific_info()
    paa_nci_specific_info_rules = ValidationRule.where(model: 'trial', item: 'paa_nci_specific_info')
    is_funding_sponsor_nullified = false

    funding_sources = TrialFundingSource.where(trial_id: @trial.id)
    funding_sources.each do |source|
      if !is_funding_sponsor_nullified
        organization = Organization.find(source.organization_id)
        is_funding_sponsor_nullified = organization.source_status.code == 'NULLIFIED'
      end
    end

    validation_result = []
    paa_nci_specific_info_rules.each do |rule|
      if rule.code == 'PAA208' and is_funding_sponsor_nullified
        validation_result << rule
      end
    end

    return validation_result

  end

  def _validate_pas_trial_description()
    pas_trial_description_rules = ValidationRule.where(model: 'trial', item: 'pas_trial_description')

    is_brief_title_unique = @trial.brief_title.nil? ? false : Trial.where(brief_title: @trial.brief_title).size == 1

    validation_results = []
    pas_trial_description_rules.each do |rule|

      if (rule.code == 'PAS21' and !@trial.brief_title.present?) ||
          (rule.code == 'PAS22' and !is_brief_title_unique) ||
          (rule.code == 'PAS23' and !@trial.brief_summary.present?)
        validation_results << rule

      elsif (rule.code == 'PAS41' and @trial.detailed_description.present? and @trial.detailed_description.length > 32000) ||
          (rule.code == 'PAS42' and @trial.brief_title.present? and @trial.brief_title.length <= 18) ||
          (rule.code == 'PAS49' and @trial.brief_title.present? and @trial.brief_title.length >= 300)

        ## warnings
        validation_results << rule

      end
    end

    return validation_results
  end

  def _validate_pas_trial_design()

    pas_trial_design_rules = ValidationRule.where(model: 'trial', item: 'pas_trial_design')
    is_interventional_cat = ResearchCategory.find_by_code('INT') == @trial.research_category
    is_observational_cat = ResearchCategory.find_by_code('OBS') == @trial.research_category
    is_expanded_cat = ResearchCategory.find_by_code('EXP') == @trial.research_category
    is_ancillary_cat = ResearchCategory.find_by_code('ANC') == @trial.research_category

    is_open_masking = Masking.find_by_code('OP').id == @trial.masking_id
    is_single_blind_masking = Masking.find_by_code('SB').id == @trial.masking_id
    is_double_blind_masking = Masking.find_by_code('DB').id == @trial.masking_id

    num_masking_roles = 0
    num_masking_roles += 1 if @trial.masking_role_caregiver
    num_masking_roles += 1 if @trial.masking_role_investigator
    num_masking_roles += 1 if @trial.masking_role_outcome_assessor
    num_masking_roles += 1 if @trial.masking_role_subject
    is_primary_purpose_other = PrimaryPurpose.find_by_code('OTH').id == @trial.primary_purpose_id
    is_study_model_other = StudyModel.find_by_code('OTH').id == @trial.study_model_id
    is_time_perspec_other = TimePerspective.find_by_code('OTH').id == @trial.time_perspective_id

    validation_result = []
    pas_trial_design_rules.each do |rule|
      if (rule.code == 'PAS3' and is_interventional_cat and @trial.masking_id.nil?) ||
          (rule.code == 'PAS4' and is_expanded_cat and @trial.masking_id.nil?) ||
          (rule.code == 'PAS5' and is_interventional_cat and is_double_blind_masking and num_masking_roles < 2) ||
          (rule.code == 'PAS6' and is_expanded_cat and is_double_blind_masking and num_masking_roles < 2) ||
          (rule.code == 'PAS11' and is_interventional_cat and is_single_blind_masking and num_masking_roles != 1) ||
          (rule.code == 'PAS12' and is_expanded_cat and is_single_blind_masking and num_masking_roles != 1) ||
          (rule.code == 'PAS13' and is_interventional_cat and @trial.intervention_model_id.nil?) ||
          (rule.code == 'PAS14' and is_expanded_cat and @trial.intervention_model_id.nil?) ||
          (rule.code == 'PAS15' and !@trial.primary_purpose_id.present?) ||
          (rule.code == 'PAS16' and is_primary_purpose_other and !@trial.primary_purpose_other.present?) ||
          (rule.code == 'PAS17' and !@trial.phase_id.present?) ||
          (rule.code == 'PAS18' and !@trial.num_of_arms.present?) ||
          (rule.code == 'PAS19' and is_interventional_cat and !@trial.allocation_id.present?) ||
          (rule.code == 'PAS20' and is_expanded_cat and !@trial.allocation_id.present?)
            ## errors block
            validation_result << rule
      elsif (rule.code == 'PAS43' and is_observational_cat and !@trial.study_model_id.present?) ||
          (rule.code == 'PAS44' and is_ancillary_cat and !@trial.study_model_id.present?) ||
          (rule.code == 'PAS45' and is_observational_cat and is_study_model_other and !@trial.study_model_other.present?) ||
          (rule.code == 'PAS46' and is_ancillary_cat and is_study_model_other and !@trial.study_model_other.present?) ||
          (rule.code == 'PAS47' and is_observational_cat and is_time_perspec_other and !@trial.time_perspective_other.present?)
          (rule.code == 'PAS48' and is_ancillary_cat and is_time_perspec_other and !@trial.time_perspective_other.present?)
            ## warnings block
            validation_result << rule
      end

    end

    return validation_result
  end

  def _validate_paa_documents()
    paa_documents_rules = ValidationRule.where(model: 'trial', item: 'paa_documents')
    is_protocol_doc_missing = TrialDocument.where(trial_id: @trial.id, document_type: 'Protocol Document', status: 'active').blank? # does it have to active?
    is_irb_approval_doc_missing = TrialDocument.where(trial_id: @trial.id, document_type: 'IRB Approval', status: 'active').blank? # does it have to active?
    validation_result = []

    paa_documents_rules.each do |rule|
      if (rule.code == 'PAA95' and is_protocol_doc_missing) || (rule.code == 'PAA96' and is_irb_approval_doc_missing)
        validation_result << rule
      end
    end

    return validation_result
  end

  def _validate_paa_participating_sites()
    paa_site_rules = ValidationRule.where(model: 'trial', item: 'paa_participating_sites')
    # is_all_sites_unique = sites.detect {|e| sites.rindex(e) != sites.index(e)}.nil? # boolean, true: unique, false: not unique
    is_all_sites_unique = true
    is_site_pi_unique = true  # check for duplicate site investigator on the same site
    is_any_site_status_active = false
    is_any_site_status_enroll_by_invitation = false

    @trial.participating_sites.each do |site|
      # TODO: optimize this query if possible
      if is_all_sites_unique
        is_all_sites_unique = ParticipatingSite.where(trial_id: site.trial_id, organization_id: site.organization_id).size == 1
      end

      if is_site_pi_unique
        count_hash = ParticipatingSiteInvestigator.where(participating_site_id: site.id).group([:participating_site_id, :person_id]).having("count(participating_site_id) > 1").count
        is_site_pi_unique = count_hash.size == 0  # if duplicate, count_hash.size >= 1
      end

      site_status = site.site_rec_status_wrappers.last
      site_status_id = site_status.nil? ? nil : site_status.site_recruitment_status_id
      if !is_any_site_status_active
        is_any_site_status_active = site_status_id == SiteRecruitmentStatus.find_by_code('ACT').id
      end
      if !is_any_site_status_enroll_by_invitation
        is_any_site_status_enroll_by_invitation = site_status_id == SiteRecruitmentStatus.find_by_code('EBI').id
      end
    end

    validation_result = []
    paa_site_rules.each do |rule|
      if (rule.code == 'PAA93' and !is_all_sites_unique) || (rule.code == 'PAA94' and !is_site_pi_unique)
        ## errors block
        validation_result << rule
      elsif (rule.code == 'PAA196' and @@is_cur_trial_status_approved and is_any_site_status_active) ||
          (rule.code == 'PAA197' and @@is_cur_trial_status_approved and is_any_site_status_enroll_by_invitation) ||
          (rule.code == 'PAA198' and @@is_cur_trial_status_inreview and is_any_site_status_active) ||
          (rule.code == 'PAA199' and @@is_cur_trial_status_inreview and is_any_site_status_enroll_by_invitation) ||
          (rule.code = 'PAA200' and @@is_cur_trial_status_withdrawn and is_any_site_status_active) ||
          (rule.code = 'PAA201' and @@is_cur_trial_status_withdrawn and is_any_site_status_enroll_by_invitation) ||
          (rule.code = 'PAA202' and (!is_any_site_status_active && @trial.participating_sites.size == 0))

        ## warnings block
        validation_result << rule
        # TODO: finish this warning block
        # TODO: PAA203, PAA204, PAA205, and PAA206 (ask BA: what is primary xxx ?)

      end
    end

    return validation_result
  end

  def _validate_paa_regulatory_human_sub_safety()
    human_safe_rules = ValidationRule.where(model: 'trial', item: 'paa_regulatory_info_human_subject_safety')
    validation_results = []
    board_approval_status = BoardApprovalStatus.find_by_code('SUBAPPROVED')
    board_approval_status_id = board_approval_status.nil? ? nil : board_approval_status.id
    board_sub_pending_status_id = BoardApprovalStatus.find_by_code('SUBPENDING').id
    board_sub_exempt_status_id = BoardApprovalStatus.find_by_code('SUBEXEMPT').id
    board_sub_denied_status_id = BoardApprovalStatus.find_by_code('SUBDENIED').id
    board_sub_unrequired_status_id = BoardApprovalStatus.find_by_code('SUBUNREQUIRED').id

    p "current trial status code: #{@@cur_trial_status_code} for trial #{@trial.id}"

    human_safe_rules.each do |rule|
      if rule.code == 'PAA92' and (board_approval_status_id.nil? || @trial.board_approval_status_id.nil? || @trial.board_approval_status_id != board_approval_status_id)
        #error block
        validation_results << rule # board approval status is missing
      elsif (rule.code == 'PAA183' and @@cur_trial_status_code == 'INR' and @trial.board_approval_status_id != board_sub_pending_status_id) ||
            (rule.code == 'PAA184' and @trial.board_approval_status_id == board_sub_denied_status_id and @@cur_trial_status_code == 'ACT') ||
            (rule.code == 'PAA185' and @trial.board_approval_status_id == board_sub_denied_status_id and @@cur_trial_status_code == 'APP') ||
            (rule.code == 'PAA186' and @trial.board_approval_status_id == board_sub_pending_status_id and @@cur_trial_status_code != 'INR') ||
            (rule.code == 'PAA187' and @trial.board_approval_status_id == board_sub_pending_status_id and @@cur_trial_status_code == 'ACT') ||
            (rule.code == 'PAA189' and @trial.board_approval_status_id == board_sub_unrequired_status_id and @@cur_trial_status_code == 'ACT') ||
            (rule.code == 'PAA189' and @trial.board_approval_status_id == board_sub_unrequired_status_id and @@cur_trial_status_code == 'ACT') ||
            (rule.code == 'PAA191' and @@cur_trial_status_code == 'WIT' and @trial.board_approval_status_id != board_sub_denied_status_id) ||
            (rule.code == 'PAA193' and @@cur_trial_status_code == 'INR' and @trial.board_approval_status_id != board_sub_pending_status_id)

          # warnings block
        ## 1. Review Board Approval must be  SUBMITTED PENDING if Trial Status is   IN REVIEW
        ## 2. Trial Status cannot be  ACTIVE when the  Review Board Approval is ‘Submitted; Denied’
        ## 3. If Review Board is ‘Submitted; Denied’; Trial Status cannot be Approved
        ## 4. If Board Approval Status is Submitted; Pending; Current Trial Status must be IN REVIEW
        ## 5. Current study status cannot be Active when Board Approval Status is submitted, pending'
        ## 6. Current study status cannot be Active when Board Approval Status is not required
        ## 7. If current trial status is withdrawn; Board Approval status in Regulatory Information – HSS must be ‘submitted denied’
        ## 8. Board status has been nullified. Board status is required.
        ## 9. If the current trial status is In Review; the board approval status must be Submitted; Pending.
        validation_results << rule
      end
    end

    return validation_results
  end

  def _validate_paa_regulatory_info_fda()
    pri_rules = ValidationRule.where(model: 'trial', item: 'paa_regulatory_info_fdaaa')
    validation_results = []
    # is_IND_protocol = @trial.ind_ide_question == 'Yes' ## find out if this trial is IND protocol
    if !@@is_IND_protocol
      return validation_results
    end
    is_US_contained = false
    is_FDA_contained = false
    @trial.oversight_authorities.each do |oa|
      if !is_US_contained
        is_US_contained = oa.country.present? and (oa.country.downcase!.include?('united states') || oa.country.downcase!.include?('us'))
      end

      if !is_FDA_contained
        is_FDA_contained = oa.organization.present? && oa.organization.downcase == 'food and drug administration'
      end
    end

    pri_rules.each do |rule|
      if (rule.code == 'PAA90' and !is_US_contained) || (rule.code == 'PAA91' and !is_FDA_contained)
        validation_results << rule
      end
    end
    return validation_results
  end

  def _validate_general_trial_details()
    #get general trial details rules
    gt_rules = ValidationRule.where(model: 'trial', item: 'paa_general_trial_details')
    validation_results = []
    # find these ids for validation check
    nct_origin_id = ProtocolIdOrigin.find_by_code('NCT').id
    ctep_origin_id = ProtocolIdOrigin.find_by_code('CTEP').id
    dcp_origin_id = ProtocolIdOrigin.find_by_code('DCP').id
    nctIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == nct_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == nct_origin_id} : nil
    nctIdentifier = nctIdentifierObj.present? ? nctIdentifierObj.protocol_id : nil
    ctepIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == ctep_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == ctep_origin_id} : nil
    ctepIdentifier = ctepIdentifierObj.present? ? ctepIdentifierObj.protocol_id : nil
    dcpIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == dcp_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == dcp_origin_id} : nil
    dcpIdentifier = dcpIdentifierObj.present? ? dcpIdentifier.protocol_id : nil

    nci_id = @trial.nci_id
    lead_org_protocol_id = @trial.lead_protocol_id
    keywords = @trial.keywords

    gt_rules.each do |rule|
      if (rule.code == 'PAA2' and nctIdentifier.present? and nctIdentifier.length > 30) || (rule.code == 'PAA3' and ctepIdentifier.present? and ctepIdentifier.length > 30) ||
         (rule.code == 'PAA6' and dcpIdentifier.present? and dcpIdentifier.length > 30) || (rule.code == 'PAA7' and lead_org_protocol_id.present? and lead_org_protocol_id.length > 30) ||
         (rule.code == 'PAA8' and keywords.present? and keywords.length > 160)
        validation_results << rule
      end
    end

    return validation_results
  end

  def rollback(submission_id)
    trial_history = TrialHistory.find_by_submission_id(submission_id)
    # Parameters for native fields and deleting existing children
    rollback_params = {}
    # Parameters for reconstructing children
    rollback_params2 = {}
    rollback_params[:id] = trial_history.snapshot['id']
    rollback_params[:nci_id] = trial_history.snapshot['nci_id']
    rollback_params[:lead_protocol_id] = trial_history.snapshot['lead_protocol_id']
    rollback_params[:official_title] = trial_history.snapshot['official_title']
    rollback_params[:pilot] = trial_history.snapshot['pilot']
    rollback_params[:primary_purpose_other] = trial_history.snapshot['primary_purpose_other']
    rollback_params[:secondary_purpose_other] = trial_history.snapshot['secondary_purpose_other']
    rollback_params[:program_code] = trial_history.snapshot['program_code']
    rollback_params[:grant_question] = trial_history.snapshot['grant_question']
    rollback_params[:start_date] = trial_history.snapshot['start_date']
    rollback_params[:start_date_qual] = trial_history.snapshot['start_date_qual']
    rollback_params[:primary_comp_date] = trial_history.snapshot['primary_comp_date']
    rollback_params[:primary_comp_date_qual] = trial_history.snapshot['primary_comp_date_qual']
    rollback_params[:comp_date] = trial_history.snapshot['comp_date']
    rollback_params[:comp_date_qual] = trial_history.snapshot['comp_date_qual']
    rollback_params[:ind_ide_question] = trial_history.snapshot['ind_ide_question']
    rollback_params[:intervention_indicator] = trial_history.snapshot['intervention_indicator']
    rollback_params[:sec801_indicator] = trial_history.snapshot['sec801_indicator']
    rollback_params[:data_monitor_indicator] = trial_history.snapshot['data_monitor_indicator']
    rollback_params[:history] = trial_history.snapshot['history']
    rollback_params[:study_source_id] = trial_history.snapshot['study_source_id']
    rollback_params[:phase_id] = trial_history.snapshot['phase_id']
    rollback_params[:primary_purpose_id] = trial_history.snapshot['primary_purpose_id']
    rollback_params[:secondary_purpose_id] = trial_history.snapshot['secondary_purpose_id']
    rollback_params[:responsible_party_id] = trial_history.snapshot['responsible_party_id']
    rollback_params[:lead_org_id] = trial_history.snapshot['lead_org_id']
    rollback_params[:pi_id] = trial_history.snapshot['pi_id']
    rollback_params[:sponsor_id] = trial_history.snapshot['sponsor_id']
    rollback_params[:investigator_id] = trial_history.snapshot['investigator_id']
    rollback_params[:research_category_id] = trial_history.snapshot['research_category_id']
    rollback_params[:accrual_disease_term_id] = trial_history.snapshot['accrual_disease_term_id']
    rollback_params[:investigator_title] = trial_history.snapshot['investigator_title']
    rollback_params[:investigator_aff_id] = trial_history.snapshot['investigator_aff_id']
    rollback_params[:is_draft] = trial_history.snapshot['is_draft']
    rollback_params[:process_priority] = trial_history.snapshot['process_priority']
    rollback_params[:process_comment] = trial_history.snapshot['process_comment']
    rollback_params[:xml_required] = trial_history.snapshot['xml_required']
    rollback_params[:acronym] = trial_history.snapshot['acronym']
    rollback_params[:keywords] = trial_history.snapshot['keywords']
    rollback_params[:nih_nci_div] = trial_history.snapshot['nih_nci_div']
    rollback_params[:nih_nci_prog] = trial_history.snapshot['nih_nci_prog']
    rollback_params[:send_trial] = trial_history.snapshot['send_trial']
    rollback_params[:board_approval_num] = trial_history.snapshot['board_approval_num']
    rollback_params[:brief_title] = trial_history.snapshot['brief_title']
    rollback_params[:brief_summary] = trial_history.snapshot['brief_summary']
    rollback_params[:detailed_description] = trial_history.snapshot['detailed_description']
    rollback_params[:objective] = trial_history.snapshot['objective']
    rollback_params[:target_enrollment] = trial_history.snapshot['target_enrollment']
    rollback_params[:final_enrollment] = trial_history.snapshot['final_enrollment']
    rollback_params[:accruals] = trial_history.snapshot['accruals']
    rollback_params[:accept_vol] = trial_history.snapshot['accept_vol']
    rollback_params[:min_age] = trial_history.snapshot['min_age']
    rollback_params[:max_age] = trial_history.snapshot['max_age']
    rollback_params[:assigned_to_id] = trial_history.snapshot['assigned_to_id']
    rollback_params[:board_approval_status_id] = trial_history.snapshot['board_approval_status_id']
    rollback_params[:intervention_model_id] = trial_history.snapshot['intervention_model_id']
    rollback_params[:masking_id] = trial_history.snapshot['masking_id']
    rollback_params[:allocation_id] = trial_history.snapshot['allocation_id']
    rollback_params[:study_classification_id] = trial_history.snapshot['study_classification_id']
    rollback_params[:gender_id] = trial_history.snapshot['gender_id']
    rollback_params[:min_age_unit_id] = trial_history.snapshot['min_age_unit_id']
    rollback_params[:max_age_unit_id] = trial_history.snapshot['max_age_unit_id']
    rollback_params[:num_of_arms] = trial_history.snapshot['num_of_arms']
    rollback_params[:verification_date] = trial_history.snapshot['verification_date']
    rollback_params[:sampling_method] = trial_history.snapshot['sampling_method']
    rollback_params[:study_pop_desc] = trial_history.snapshot['study_pop_desc']
    rollback_params[:board_name] = trial_history.snapshot['board_name']
    rollback_params[:board_affiliation_id] = trial_history.snapshot['board_affiliation_id']
    rollback_params[:masking_role_caregiver] = trial_history.snapshot['masking_role_caregiver']
    rollback_params[:masking_role_investigator] = trial_history.snapshot['masking_role_investigator']
    rollback_params[:masking_role_outcome_assessor] = trial_history.snapshot['masking_role_outcome_assessor']
    rollback_params[:masking_role_subject] = trial_history.snapshot['masking_role_subject']
    rollback_params[:study_model_other] = trial_history.snapshot['study_model_other']
    rollback_params[:time_perspective_other] = trial_history.snapshot['time_perspective_other']
    rollback_params[:study_model_id] = trial_history.snapshot['study_model_id']
    rollback_params[:time_perspective_id] = trial_history.snapshot['time_perspective_id']
    rollback_params[:biospecimen_retention_id] = trial_history.snapshot['biospecimen_retention_id']
    rollback_params[:biospecimen_desc] = trial_history.snapshot['biospecimen_desc']
    rollback_params[:internal_source_id] = trial_history.snapshot['internal_source_id']
    rollback_params[:nci_specific_comment] = trial_history.snapshot['nci_specific_comment']
    rollback_params[:send_trial_flag] = trial_history.snapshot['send_trial_flag']

    # Delete existing children and reconstruct children from snapshot
    other_ids_attributes = []
    @trial.other_ids.each do |other_id|
      other_id_hash = {id: other_id.id, _destroy: true}
      other_ids_attributes.push(other_id_hash)
    end
    rollback_params[:other_ids_attributes] = other_ids_attributes
    other_ids_attributes = []
    trial_history.snapshot['other_ids'].each do |other_id|
      other_id_hash = {protocol_id: other_id['protocol_id'], protocol_id_origin_id: other_id['protocol_id_origin_id']}
      other_ids_attributes.push(other_id_hash)
    end
    rollback_params2[:other_ids_attributes] = other_ids_attributes

    ind_ides_attributes = []
    @trial.ind_ides.each do |ind_ide|
      ind_ide_hash = {id: ind_ide.id, _destroy: true}
      ind_ides_attributes.push(ind_ide_hash)
    end
    rollback_params[:ind_ides_attributes] = ind_ides_attributes
    ind_ides_attributes = []
    trial_history.snapshot['ind_ides'].each do |ind_ide|
      ind_ide_hash = {ind_ide_type: ind_ide['ind_ide_type'], grantor: ind_ide['grantor'], nih_nci: ind_ide['nih_nci'],
                      holder_type_id: ind_ide['holder_type_id'], ind_ide_number: ind_ide['ind_ide_number']}
      ind_ides_attributes.push(ind_ide_hash)
    end
    rollback_params2[:ind_ides_attributes] = ind_ides_attributes

    grants_attributes = []
    @trial.grants.each do |grant|
      grant_hash = {id: grant.id, _destroy: true}
      grants_attributes.push(grant_hash)
    end
    rollback_params[:grants_attributes] = grants_attributes
    grants_attributes = []
    trial_history.snapshot['grants'].each do |grant|
      grant_hash = {funding_mechanism: grant['funding_mechanism'], institute_code: grant['institute_code'],
                    nci: grant['nci'], serial_number: grant['serial_number'],
                    deletion_comment: grant['deletion_comment'], deleted_at: grant['deleted_at'],
                    deleted_by_username: grant['deleted_by_username']}
      grants_attributes.push(grant_hash)
    end
    rollback_params2[:grants_attributes] = grants_attributes

    trial_status_wrappers_attributes = []
    @trial.trial_status_wrappers.each do |trial_status_wrapper|
      trial_status_wrapper_hash = {id: trial_status_wrapper.id, _destroy: true}
      trial_status_wrappers_attributes.push(trial_status_wrapper_hash)
    end
    rollback_params[:trial_status_wrappers_attributes] = trial_status_wrappers_attributes
    trial_status_wrappers_attributes = []
    trial_history.snapshot['trial_status_wrappers'].each do |trial_status_wrapper|
      trial_status_wrapper_hash = {status_date: trial_status_wrapper['status_date'],
                                   why_stopped: trial_status_wrapper['why_stopped'],
                                   trial_status_id: trial_status_wrapper['trial_status_id'],
                                   comment: trial_status_wrapper['comment']}
      trial_status_wrappers_attributes.push(trial_status_wrapper_hash)
    end
    rollback_params2[:trial_status_wrappers_attributes] = trial_status_wrappers_attributes

    trial_funding_sources_attributes = []
    @trial.trial_funding_sources.each do |trial_funding_source|
      trial_funding_source_hash = {id: trial_funding_source.id, _destroy: true}
      trial_funding_sources_attributes.push(trial_funding_source_hash)
    end
    rollback_params[:trial_funding_sources_attributes] = trial_funding_sources_attributes
    trial_funding_sources_attributes = []
    trial_history.snapshot['trial_funding_sources'].each do |trial_funding_source|
      trial_funding_source_hash = {organization_id: trial_funding_source['organization_id']}
      trial_funding_sources_attributes.push(trial_funding_source_hash)
    end
    rollback_params2[:trial_funding_sources_attributes] = trial_funding_sources_attributes

    oversight_authorities_attributes = []
    @trial.oversight_authorities.each do |oversight_authority|
      oversight_authority_hash = {id: oversight_authority.id, _destroy: true}
      oversight_authorities_attributes.push(oversight_authority_hash)
    end
    rollback_params[:oversight_authorities_attributes] = oversight_authorities_attributes
    oversight_authorities_attributes = []
    trial_history.snapshot['oversight_authorities'].each do |oversight_authority|
      oversight_authority_hash = {country: oversight_authority['country'],
                                  organization: oversight_authority['organization']}
      oversight_authorities_attributes.push(oversight_authority_hash)
    end
    rollback_params2[:oversight_authorities_attributes] = oversight_authorities_attributes

    associated_trials_attributes = []
    @trial.associated_trials.each do |associated_trial|
      associated_trial_hash = {id: associated_trial.id, _destroy: true}
      associated_trials_attributes.push(associated_trial_hash)
    end
    rollback_params[:associated_trials_attributes] = associated_trials_attributes
    associated_trials_attributes = []
    trial_history.snapshot['associated_trials'].each do |associated_trial|
      associated_trial_hash = {trial_identifier: associated_trial['trial_identifier'],
                               identifier_type_id: associated_trial['identifier_type_id'],
                               official_title: associated_trial['official_title'],
                               research_category_name: associated_trial['research_category_name']}
      associated_trials_attributes.push(associated_trial_hash)
    end
    rollback_params2[:associated_trials_attributes] = associated_trials_attributes

    alternate_titles_attributes = []
    @trial.alternate_titles.each do |alternate_title|
      alternate_title_hash = {id: alternate_title.id, _destroy: true}
      alternate_titles_attributes.push(alternate_title_hash)
    end
    rollback_params[:alternate_titles_attributes] = alternate_titles_attributes
    alternate_titles_attributes = []
    trial_history.snapshot['alternate_titles'].each do |alternate_title|
      alternate_title_hash = {category: alternate_title['category'], title: alternate_title['title'],
                              source: alternate_title['source']}
      alternate_titles_attributes.push(alternate_title_hash)
    end
    rollback_params2[:alternate_titles_attributes] = alternate_titles_attributes

    central_contacts_attributes = []
    @trial.central_contacts.each do |central_contact|
      central_contact_hash = {id: central_contact.id, _destroy: true}
      central_contacts_attributes.push(central_contact_hash)
    end
    rollback_params[:central_contacts_attributes] = central_contacts_attributes
    central_contacts_attributes = []
    trial_history.snapshot['central_contacts'].each do |central_contact|
      central_contact_hash = {phone: central_contact['phone'], email: central_contact['email'],
                              central_contact_type_id: central_contact['central_contact_type_id'],
                              person_id: central_contact['person_id'], extension: central_contact['extension'],
                              fullname: central_contact['fullname']}
      central_contacts_attributes.push(central_contact_hash)
    end
    rollback_params2[:central_contacts_attributes] = central_contacts_attributes

    outcome_measures_attributes = []
    @trial.outcome_measures.each do |outcome_measure|
      outcome_measure_hash = {id: outcome_measure.id, _destroy: true}
      outcome_measures_attributes.push(outcome_measure_hash)
    end
    rollback_params[:outcome_measures_attributes] = outcome_measures_attributes
    outcome_measures_attributes = []
    trial_history.snapshot['outcome_measures'].each do |outcome_measure|
      outcome_measure_hash = {title: outcome_measure['title'], time_frame: outcome_measure['time_frame'],
                              description: outcome_measure['description'],
                              safety_issue: outcome_measure['safety_issue'],
                              outcome_measure_type_id: outcome_measure['outcome_measure_type_id'],
                              index: outcome_measure['index']}
      outcome_measures_attributes.push(outcome_measure_hash)
    end
    rollback_params2[:outcome_measures_attributes] = outcome_measures_attributes

    other_criteria_attributes = []
    @trial.other_criteria.each do |other_criterium|
      other_criterium_hash = {id: other_criterium.id, _destroy: true}
      other_criteria_attributes.push(other_criterium_hash)
    end
    rollback_params[:other_criteria_attributes] = other_criteria_attributes
    other_criteria_attributes = []
    trial_history.snapshot['other_criteria'].each do |other_criterium|
      other_criterium_hash = {criteria_type: other_criterium['criteria_type'],
                              criteria_desc: other_criterium['criteria_desc'], index: other_criterium['index']}
      other_criteria_attributes.push(other_criterium_hash)
    end
    rollback_params2[:other_criteria_attributes] = other_criteria_attributes

    markers_attributes = []
    @trial.markers.each do |marker|
      marker_hash = {id: marker.id, _destroy: true}
      markers_attributes.push(marker_hash)
    end
    rollback_params[:markers_attributes] = markers_attributes
    markers_attributes = []
    trial_history.snapshot['markers'].each do |marker|
      marker_hash = {name: marker['name'], record_status: marker['record_status'],
                     biomarker_use_id: marker['biomarker_use_id'],
                     evaluation_type_other: marker['evaluation_type_other'],
                     assay_type_other: marker['assay_type_other'], specimen_type_other: marker['specimen_type_other'],
                     protocol_marker_name: marker['protocol_marker_name'], cadsr_marker_id: marker['cadsr_marker_id']}
      markers_attributes.push(marker_hash)
    end
    rollback_params2[:markers_attributes] = markers_attributes

    interventions_attributes = []
    @trial.interventions.each do |intervention|
      intervention_hash = {id: intervention.id, _destroy: true}
      interventions_attributes.push(intervention_hash)
    end
    rollback_params[:interventions_attributes] = interventions_attributes
    interventions_attributes = []
    trial_history.snapshot['interventions'].each do |intervention|
      intervention_hash = {name: intervention['name'], other_name: intervention['other_name'],
                           description: intervention['description'],
                           intervention_type_id: intervention['intervention_type_id'],
                           index: intervention['index'], c_code: intervention['c_code']}
      interventions_attributes.push(intervention_hash)
    end
    rollback_params2[:interventions_attributes] = interventions_attributes

    arms_groups_attributes = []
    @trial.arms_groups.each do |arms_group|
      arms_group_hash = {id: arms_group.id, _destroy: true}
      arms_groups_attributes.push(arms_group_hash)
    end
    rollback_params[:arms_groups_attributes] = arms_groups_attributes
    arms_groups_attributes = []
    trial_history.snapshot['arms_groups'].each do |arms_group|
      arms_group_hash = {label: arms_group['label'], description: arms_group['description'],
                         arms_groups_type: arms_group['arms_groups_type']}
      arms_groups_attributes.push(arms_group_hash)
    end
    rollback_params2[:arms_groups_attributes] = arms_groups_attributes

    sub_groups_attributes = []
    @trial.sub_groups.each do |sub_group|
      sub_group_hash = {id: sub_group.id, _destroy: true}
      sub_groups_attributes.push(sub_group_hash)
    end
    rollback_params[:sub_groups_attributes] = sub_groups_attributes
    sub_groups_attributes = []
    trial_history.snapshot['sub_groups'].each do |sub_group|
      sub_group_hash = {label: sub_group['label'], description: sub_group['description'], index: sub_group['index']}
      sub_groups_attributes.push(sub_group_hash)
    end
    rollback_params2[:sub_groups_attributes] = sub_groups_attributes

    participating_sites_attributes = []
    @trial.participating_sites.each do |participating_site|
      participating_site_hash = {id: participating_site.id, _destroy: true}
      participating_sites_attributes.push(participating_site_hash)
    end
    rollback_params[:participating_sites_attributes] = participating_sites_attributes
    participating_sites_attributes = []
    trial_history.snapshot['participating_sites'].each do |participating_site|
      participating_site_hash = {protocol_id: participating_site['protocol_id'],
                                 program_code: participating_site['program_code'],
                                 contact_name: participating_site['contact_name'],
                                 contact_phone: participating_site['contact_phone'],
                                 contact_email: participating_site['contact_email'],
                                 organization_id: participating_site['organization_id'],
                                 person_id: participating_site['person_id'], extension: participating_site['extension'],
                                 contact_type: participating_site['contact_type'],
                                 local_trial_identifier: participating_site['local_trial_identifier']}
      participating_sites_attributes.push(participating_site_hash)
    end
    rollback_params2[:participating_sites_attributes] = participating_sites_attributes

    citations_attributes = []
    @trial.citations.each do |citation|
      citation_hash = {id: citation.id, _destroy: true}
      citations_attributes.push(citation_hash)
    end
    rollback_params[:citations_attributes] = citations_attributes
    citations_attributes = []
    trial_history.snapshot['citations'].each do |citation|
      citation_hash = {pub_med_id: citation['pub_med_id'], description: citation['description'],
                       results_reference: citation['results_reference']}
      citations_attributes.push(citation_hash)
    end
    rollback_params2[:citations_attributes] = citations_attributes

    links_attributes = []
    @trial.links.each do |link|
      link_hash = {id: link.id, _destroy: true}
      links_attributes.push(link_hash)
    end
    rollback_params[:links_attributes] = links_attributes
    links_attributes = []
    trial_history.snapshot['links'].each do |link|
      link_hash = {url: link['url'], description: link['description']}
      links_attributes.push(link_hash)
    end
    rollback_params2[:links_attributes] = links_attributes

    diseases_attributes = []
    @trial.diseases.each do |disease|
      disease_hash = {id: disease.id, _destroy: true}
      diseases_attributes.push(disease_hash)
    end
    rollback_params[:diseases_attributes] = diseases_attributes
    diseases_attributes = []
    trial_history.snapshot['diseases'].each do |disease|
      disease_hash = {preferred_name: disease['preferred_name'], code: disease['code'],
                      thesaurus_id: disease['thesaurus_id'], display_name: disease['display_name'],
                      parent_preferred: disease['parent_preferred'], rank: disease['rank']}
      diseases_attributes.push(disease_hash)
    end
    rollback_params2[:diseases_attributes] = diseases_attributes

    collaborators_attributes = []
    @trial.collaborators.each do |collaborator|
      collaborator_hash = {id: collaborator.id, _destroy: true}
      collaborators_attributes.push(collaborator_hash)
    end
    rollback_params[:collaborators_attributes] = collaborators_attributes
    collaborators_attributes = []
    trial_history.snapshot['collaborators'].each do |collaborator|
      collaborator_hash = {org_name: collaborator['org_name'], organization_id: collaborator['organization_id']}
      collaborators_attributes.push(collaborator_hash)
    end
    rollback_params2[:collaborators_attributes] = collaborators_attributes

    trial_ownerships_attributes = []
    @trial.trial_ownerships.each do |trial_ownership|
      trial_ownership_hash = {id: trial_ownership.id, _destroy: true}
      trial_ownerships_attributes.push(trial_ownership_hash)
    end
    rollback_params[:trial_ownerships_attributes] = trial_ownerships_attributes
    trial_ownerships_attributes = []
    trial_history.snapshot['trial_ownerships'].each do |trial_ownership|
      trial_ownership_hash = {user_id: trial_ownership['user_id']}
      trial_ownerships_attributes.push(trial_ownership_hash)
    end
    rollback_params2[:trial_ownerships_attributes] = trial_ownerships_attributes

    anatomic_site_wrappers_attributes = []
    @trial.anatomic_site_wrappers.each do |anatomic_site_wrapper|
      anatomic_site_wrapper_hash = {id: anatomic_site_wrapper.id, _destroy: true}
      anatomic_site_wrappers_attributes.push(anatomic_site_wrapper_hash)
    end
    rollback_params[:anatomic_site_wrappers_attributes] = anatomic_site_wrappers_attributes
    anatomic_site_wrappers_attributes = []
    trial_history.snapshot['anatomic_site_wrappers'].each do |anatomic_site_wrapper|
      anatomic_site_wrapper_hash = {anatomic_site_id: anatomic_site_wrapper['anatomic_site_id']}
      anatomic_site_wrappers_attributes.push(anatomic_site_wrapper_hash)
    end
    rollback_params2[:anatomic_site_wrappers_attributes] = anatomic_site_wrappers_attributes

    ActiveRecord::Base.transaction do
      @trial.update(rollback_params)
      @trial.update(rollback_params2)
    end
  end

  def send_email(edit_type)

    if !['original', 'complete', 'update', 'amend', 'submission_rejected_ori', 'submission_rejected_amd', 'submission_accepted_ori', 'submission_accepted_amd'].include?(edit_type)
      # do not send email for other types of update
      return
    end

    last_submission = @trial.submissions.last
    last_sub_type = last_submission.submission_type if last_submission.present?
    last_sub_method = last_submission.submission_method if last_submission.present?
    last_submitter = last_submission.user if last_submission.present?
    last_submitter_name = last_submitter.nil? ? '' : "#{last_submitter.first_name} #{last_submitter.last_name}"
    last_submitter_name.strip!
    last_submitter_name = 'CTRP User' if last_submitter_name.blank?
    last_submission_date = last_submission.nil? ? '' : (last_submission.submission_date.nil? ? '' : last_submission.submission_date.strftime('%d-%b-%Y'))
    lead_protocol_id = @trial.lead_protocol_id.present? ? @trial.lead_protocol_id : ''
    trial_title = @trial.official_title.present? ? @trial.official_title : ''
    nci_id = @trial.nci_id.present? ? @trial.nci_id : ''
    org_name = ''
    org_id = ''
    if @trial.lead_org.present?
      org_name = @trial.lead_org.name
      org_id = @trial.lead_org.id.to_s
    end

    # find all those identifiers and populate the fields in the email template
    nct_origin_id = ProtocolIdOrigin.find_by_code('NCT').id
    ctep_origin_id = ProtocolIdOrigin.find_by_code('CTEP').id
    dcp_origin_id = ProtocolIdOrigin.find_by_code('DCP').id
    nctIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == nct_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == nct_origin_id} : nil
    nctIdentifier = nctIdentifierObj.present? ? nctIdentifierObj.protocol_id : nil
    ctepIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == ctep_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == ctep_origin_id} : nil
    ctepIdentifier = ctepIdentifierObj.present? ? ctepIdentifierObj.protocol_id : nil
    dcpIdentifierObj = @trial.other_ids.any?{|a| a.protocol_id_origin_id == dcp_origin_id} ? @trial.other_ids.find {|a| a.protocol_id_origin_id == dcp_origin_id} : nil
    dcpIdentifier = dcpIdentifierObj.present? ? dcpIdentifier.protocol_id : nil

    otherIdStr = ''
    @trial.other_ids.each do |other_id|
      otherIdStr += "<p><b>#{other_id.protocol_id_origin.name}: </b>#{other_id.protocol_id}</p>"
    end

    last_amend_num = last_submission.nil? ? '' : (last_submission.amendment_num.present? ? last_submission.amendment_num : '')
    trial_amend_date = last_submission.nil? ? '' : (last_submission.amendment_date.present? ? Date.strptime(last_submission.amendment_date.to_s, "%Y-%m-%d").strftime("%d-%b-%Y") : '')

    mail_template = nil

    if last_sub_type.present? && last_sub_method.present?
      if last_sub_type.code == 'ORI' && last_sub_method.code == 'REG' && !@trial.edit_type.include?('submission')
        mail_template = MailTemplate.find_by_code('TRIAL_REG')
        if mail_template.present?
          ## populate the mail_template with data for trial registration
          mail_template.to = @trial.current_user.email if @trial.current_user.present? && @trial.current_user.email.present? && @trial.current_user.receive_email_notifications

          # Populate the trial data in the email body
          mail_template.subject.sub!('${nciTrialIdentifier}', nci_id)
          mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
          mail_template.body_html.sub!('${trialTitle}', trial_title)

          table = '<table border="0">'
          table += "<tr><td><b>Lead Organization Trial ID:</b></td><td>#{lead_protocol_id}</td></tr>"
          table += "<tr><td><b>Lead Organization:</b></td><td>#{org_name}</td></tr>"
          table += "<tr><td><b>NCI Trial ID:</b></td><td>#{nci_id}</td></tr>"
          @trial.other_ids.each do |other_id|
            table += "<tr><td><b>#{other_id.protocol_id_origin.name}:</b></td><td>#{other_id.protocol_id}</td></tr>"
          end
          table += '</table>'
          mail_template.body_html.sub!('${trialIdentifiers}', table)

          mail_template.body_html.sub!('${submissionDate}', last_submission_date)
          mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
          mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)
          mail_template.body_html.sub!('${nciTrialIdentifier}', nci_id)
        end

      elsif last_sub_type.code == 'UPD' && !@trial.edit_type.include?('submission')
        mail_template = MailTemplate.find_by_code('TRIAL_UPDATE')
        # trial_owner = TrialOwnership.find_by_trial_id(@trial.id)
        # trial_registrant_email = trial_owner.nil? ? nil : trial_owner.user.email
        if mail_template.present?
          ## populate the mail_template with data for trial update
          mail_template.from = 'ncictro@mail.nih.gov'
          # mail_template.to = trial_registrant_email
          mail_template.to = @trial.current_user.email if @trial.current_user.present? && @trial.current_user.email.present? && @trial.current_user.receive_email_notifications
          mail_template.subject.sub!('${nciTrialIdentifier}', nci_id)
          mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
          mail_template.body_html.sub!('${trialTitle}', trial_title)
          mail_template.body_html.sub!('${nciTrialIdentifier}', nci_id)
          mail_template.body_html.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
          mail_template.body_html.sub!('${ctrp_assigned_lead_org_id}', org_id)
          mail_template.body_html.sub!('${submitting_organization}', org_name)
          mail_template.body_html.sub!('${submissionDate}', last_submission_date)
          mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
          mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)
        end

      elsif @trial.edit_type.include?('submission')
        if @trial.edit_type == 'submission_accepted_ori'
          mail_template = MailTemplate.find_by_code('ORI_SUB_ACCEPTED')
        elsif @trial.edit_type == 'submission_rejected_ori'
          mail_template = MailTemplate.find_by_code('ORI_SUB_REJECTED')
        elsif @trial.edit_type == 'submission_accepted_amd'
          mail_template = MailTemplate.find_by_code('AMEND_SUB_ACCEPTED')
        elsif @trial.edit_type == 'submission_rejected_amd'
          mail_template = MailTemplate.find_by_code('AMEND_SUB_REJECTED')
        end

        ## populate the mail_template with data for trial update
        mail_template.from = 'ncictro@mail.nih.gov'
        trial_owner = TrialOwnership.find_by_trial_id(@trial.id) # send email to trial owner
        trial_owners_email = trial_owner.nil? ? nil : trial_owner.user.email
        mail_template.to = trial_owners_email if trial_owners_email.present? && trial_owner.user.receive_email_notifications

        mail_template.subject.sub!('${amendNum}', last_amend_num)  # for amendment trials
        mail_template.body_html.sub!('${amendNum}', last_amend_num) # for amendment trials
        mail_template.body_html.sub!('${submissionDate}', trial_amend_date) # for amendment trials

        mail_template.subject.sub!('${nciTrialIdentifier}', nci_id)
        mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
        mail_template.body_html.sub!('${trialTitle}', trial_title)
        mail_template.body_html.sub!('${nciTrialIdentifier}', nci_id)
        mail_template.body_html.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
        mail_template.body_html.sub!('${ctrp_assigned_lead_org_id}', org_id)
        mail_template.body_html.sub!('${leadOrgName}', org_name)
        mail_template.body_html.sub!('${submissionDate}', last_submission_date)
        mail_template.body_html.sub!('${nctId}', nctIdentifier.nil? ? '' : nctIdentifier)
        mail_template.body_html.sub!('${ctepId}', ctepIdentifier.nil? ? '' : ctepIdentifier)
        mail_template.body_html.sub!('${dcpId}', dcpIdentifier.nil? ? '' : dcpIdentifier)
        mail_template.body_html.sub!('${otherIds}', otherIdStr)
        mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
        mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)

      elsif last_sub_type.code == 'AMD' && !@trial.edit_type.include?('submission')  # must not be submission_accepted/rejected
        mail_template = MailTemplate.find_by_code('TRIAL_AMEND')
        if mail_template.present?
          ## populate the mail_template with data for trial amendment
          mail_template.from = 'ncictro@mail.nih.gov'
          mail_template.to = @trial.current_user.email if @trial.current_user.present? && @trial.current_user.email.present? && @trial.current_user.receive_email_notifications
          mail_template.subject.sub!('${trialAmendNumber}', last_amend_num)
          mail_template.subject.sub!('${nciTrialIdentifier}', nci_id)
          mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
          mail_template.body_html.sub!('${trialTitle}', trial_title)
          mail_template.body_html.sub!('${nciTrialIdentifier}', nci_id)
          mail_template.body_html.sub!('${lead_organization}', org_name)
          mail_template.body_html.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
          mail_template.body_html.sub!('${ctrp_assigned_lead_org_id}', org_id)

          mail_template.body_html.sub!('${nctId}', nctIdentifier.nil? ? '' : nctIdentifier)
          mail_template.body_html.sub!('${ctepId}', ctepIdentifier.nil? ? '' : ctepIdentifier)
          mail_template.body_html.sub!('${dcpId}', dcpIdentifier.nil? ? '' : dcpIdentifier)

          mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
          mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)

          mail_template.body_html.sub!('${trialAmendNumber}', last_amend_num)
          mail_template.body_html.sub!('${trialAmendmentDate}', trial_amend_date)

        end
      end

    elsif @trial.is_draft == TRUE  && !@trial.edit_type.include?('submission')
      mail_template = MailTemplate.find_by_code('TRIAL_DRAFT')
      if mail_template.present?
        ## populate the mail_template with data for trial draft
        mail_template.from = 'ncictro@mail.nih.gov'
        mail_template.to = @trial.current_user.email if @trial.current_user.present? && @trial.current_user.email.present? && @trial.current_user.receive_email_notifications
        mail_template.subject.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
        mail_template.body_html.sub!('${trialTitle}', trial_title)
        mail_template.body_html.sub!('${leadOrgTrialIdentifier}', lead_protocol_id)
        mail_template.body_html.sub!('${lead_organization}', org_name)
        mail_template.body_html.sub!('${ctrp_assigned_lead_org_id}', org_id)
        mail_template.body_html.sub!('${submissionDate}', last_submission_date)
        mail_template.body_html.sub!('${CurrentDate}', Date.today.strftime('%d-%b-%Y'))
        mail_template.body_html.sub!('${SubmitterName}', last_submitter_name)
      end

    end

    CtrpMailerWrapper.send_email(mail_template, @trial)
  end

  def import_params (xml, current_user)
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

    org_name = xml.xpath('//sponsors/lead_sponsor/agency').text
    orgs = Organization.all
    orgs = orgs.matches_name_wc(org_name, true)
    orgs = orgs.with_source_status("Active")
    orgs = orgs.with_source_context("CTRP")
    if orgs.length > 0
      import_params[:lead_org_id] = orgs[0].id
      import_params[:sponsor_id] = orgs[0].id
      import_params[:trial_funding_sources_attributes] = [{organization_id: orgs[0].id}]
    end

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
    submission_params[:user_id] = current_user.id if current_user.present?
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
