class TrialService

  def initialize(params)
    @trial = params[:trial]
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
    p "trial is: #{@trial}"
    # rules = ValidationRule.where(model: 'trial') #.uniq
    results = []
    # rules.each do |r|
    #   if r.item == 'paa_general_trial_details'
    #     results << r
    #   end
    # end
    results = results | _validate_general_trial_details() # concatenate array but remove duplicates
    results = results | _validate_paa_regulatory_info_fda()
    results = results | _validate_paa_regulatory_human_sub_safety()
    return results
  end

  def _validate_paa_regulatory_human_sub_safety()
    human_safe_rules = ValidationRule.where(model: 'trial', item: 'paa_regulatory_info_human_subject_safety')
    p "human rules: #{human_safe_rules.size}"
    validation_results = []

    return validation_results
  end

  def _validate_paa_regulatory_info_fda()
    pri_rules = ValidationRule.where(model: 'trial', item: 'paa_regulatory_info_fdaaa')
    validation_results = []
    is_IND_protocol = true ## TODO: find out if this trial is IND protocol
    if !is_IND_protocol
      return validation_results
    end
    is_US_contained = false
    is_FDA_contained = false
    @trial.oversight_authorities.each do |oa|
      if oa.country.present? and (oa.country.downcase!.include?('united states') || oa.country.downcase!.include?('us'))
        is_US_contained = true
      elsif oa.organization.present? and (oa.organization.downcase! == 'food and drug administration' || oa.organization.downcase! == 'fda')
        is_FDA_contained = true
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

end
