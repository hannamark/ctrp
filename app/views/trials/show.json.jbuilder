json.extract! @trial, :id, :nci_id, :lead_protocol_id, :official_title, :pilot, :research_category_id, :research_category,
              :primary_purpose_other, :secondary_purpose_other, :investigator_title, :program_code, :grant_question,
              :start_date, :start_date_qual, :primary_comp_date, :primary_comp_date_qual, :comp_date, :comp_date_qual,
              :ind_ide_question, :intervention_indicator, :sec801_indicator, :data_monitor_indicator, :history,
              :study_source_id, :phase_id, :phase, :primary_purpose_id, :primary_purpose, :secondary_purpose_id, :secondary_purpose, :responsible_party_id, :responsible_party,
              :accrual_disease_term_id, :accrual_disease_term, :lead_org_id, :pi_id, :sponsor_id, :investigator_id, :investigator_aff_id,
              :created_at, :updated_at, :created_by, :updated_by, :study_source, :lead_org, :pi, :sponsor,
              :investigator, :investigator_aff, :other_ids, :trial_funding_sources, :funding_sources, :grants,
              :trial_status_wrappers, :ind_ides, :oversight_authorities, :trial_documents, :is_draft, :lock_version,
              :actions, :is_owner, :research_category, :admin_checkout, :scientific_checkout, :process_priority, :process_comment, :nci_specific_comment,
              :nih_nci_div, :nih_nci_prog, :alternate_titles, :acronym, :keywords, :central_contacts, :board_name, :board_affiliation_id,
              :board_approval_num, :board_approval_status_id, :uuid

json.other_ids do
  json.array!(@trial.other_ids) do |id|
    json.extract! id, :trial_id, :id, :protocol_id_origin_id, :protocol_id_origin, :protocol_id
  end
end

json.trial_status_wrappers do
  json.array!(@trial.trial_status_wrappers) do |status|
    json.extract! status, :trial_id, :id, :status_date, :why_stopped, :trial_status_id, :trial_status, :comment, :created_at, :updated_at
  end
end

json.ind_ides do
  json.array!(@trial.ind_ides) do |ind_ide|
    json.extract! ind_ide, :trial_id, :id, :ind_ide_type, :grantor, :nih_nci, :holder_type_id, :holder_type, :ind_ide_number
  end
end

json.trial_documents do
  json.array!(@trial.trial_documents) do |document|
    json.extract! document, :id, :file, :file_name, :document_type, :document_subtype, :is_latest, :created_at, :updated_at, :added_by_id
    json.set! :added_by, document.added_by_id.nil? ? User.find(1) : ''    #document.added_by_id
  end
end

json.collaborators do
  json.array!(@trial.collaborators) do |collaborator|
    json.extract! collaborator, :id, :organization_id, :org_name
  end
end

json.collaborators_attributes do
  json.array!(@trial.collaborators) do |collaborator|
    json.extract! collaborator, :id, :organization_id, :org_name
  end
end

json.participating_sites_list do
  json.array!(@trial.participating_sites) do |participating_site|
    json.id participating_site.id
    json.investigator participating_site.person.present? ? participating_site.person.lname : ""
    json.primary_contact participating_site.contact_name
    json.organization participating_site.organization
    json.site_rec_status_wrappers do
      json.array!(participating_site.site_rec_status_wrappers) do |site_rec_status_wrapper|
        json.id site_rec_status_wrapper.id
        json.status_date  site_rec_status_wrapper.status_date
        json.site_recruitment_status  site_rec_status_wrapper.site_recruitment_status.name
        json.comments  site_rec_status_wrapper.comments
      end
    end

    json.participating_site_investigators do
      json.array!(participating_site.participating_site_investigators) do |inv|
        json.po_id inv.person.present? ? inv.person.id : ""
        json.lname  inv.person.present? ? inv.person.lname : ""
        json.fname  inv.person.present? ? inv.person.fname : ""
        json.investigator_type inv.investigator_type
        json.set_as_contact inv.set_as_contact
        json.status_code ""
      end
    end

    latest_site_rec_status = participating_site.site_rec_status_wrappers.blank? ? nil:participating_site.site_rec_status_wrappers.last
    unless latest_site_rec_status.nil?
      json.site_recruitment_status latest_site_rec_status.site_recruitment_status.name
      json.site_recruitment_status_date latest_site_rec_status.status_date
    else
      json.site_recruitment_status ""
      json.site_recruitment_status_date ""
    end
  end
end


## append the protocol_id_origin.name
unless @trial.other_ids.empty?
  oids_hash = []
  @trial.other_ids.each do |o|
    oid_hash = Hash.new
    oid_hash = {"name" => o.protocol_id_origin.name, "other_id_obj" => o}
    oids_hash << oid_hash
  end
  json.other_ids_hash oids_hash
end

json.submissions do
  json.array!(@trial.submissions) do |submission|
    json.extract! submission, :trial_id, :id, :submission_num, :submission_date, :amendment_num, :amendment_date,
                  :amendment_reason_id, :amendment_reason, :created_at, :updated_at, :user_id, :submission_source_id
  end
end

json.current_trial_status @trial.trial_status_wrappers.present? ?
    @trial.trial_status_wrappers.last.trial_status.name : nil

json.current_trial_status_date @trial.trial_status_wrappers.present? ?
    @trial.trial_status_wrappers.last.status_date : nil

json.current_trial_why_stopped @trial.trial_status_wrappers.present? ?
    @trial.trial_status_wrappers.last.why_stopped : nil

json.processing_status @trial.processing_status_wrappers.present? ?
    @trial.processing_status_wrappers.last.processing_status.name : nil

if SubmissionType.find_by_code('AMD')
  last_amd = @trial.submissions.where('submission_type_id = ?', SubmissionType.find_by_code('AMD').id).last
else
  last_amd = nil
end
json.last_amendment_num last_amd.amendment_num if last_amd.present?
json.last_amendment_date last_amd.amendment_date if last_amd.present?

json.submission_method @trial.submissions.empty? ? '' : (@trial.submissions.last.submission_method.nil? ? '' : @trial.submissions.last.submission_method.name)

## get trial's last submitter
submitter = @trial.submissions.empty? ? nil : (@trial.submissions.last.user_id.nil? ? nil : @trial.submissions.last.user)

## submitter's username
#json.submitter submitter.nil? ? '' : submitter.username
json.submitter submitter

## get the submitter's organization name
json.submitters_organization submitter.nil? ? '' : (submitter.organization.nil? ? '' : submitter.organization.name)

## @trial.board_affiliation_id = 24068

json.board_affiliated_org @trial.board_affiliation_id.nil? ? nil : @trial.board_affiliation

json.last_submission_source @trial.submissions.empty? ? '' : (@trial.submissions.last.submission_source_id.nil? ? '' : SubmissionSource.find(@trial.submissions.last.submission_source_id))

#json.sponsor_nci @trial.is_sponsor_nci?

send_trial_rules_flag = @trial.set_send_trial_info_flag ? "Yes":"No"

json.send_trial_rules_flag send_trial_rules_flag

json.send_trial_flag @trial.send_trial_flag.nil? ? send_trial_rules_flag : @trial.send_trial_flag

json.pa_editable @trial.pa_editable_check

json.internal_source @trial.internal_source_id.nil? ? nil : @trial.internal_source

#json.admin_checkout @trial.admin_checkout

#json.scientific_checkout @trial.scientific_checkout

#extract NCT Trial ID, if present
if @trial.other_ids.present?
  other_ids = @trial.other_ids
  nct_trial_id = nil

  other_ids.each do |o|
    name = o.protocol_id_origin.name
    unless name.nil?
      name.gsub!("Identifier", "")
      if name.downcase.include? "ClinicalTrials".downcase
        nct_trial_id = o.protocol_id
      end
    end
  end
  json.nct_trial_id nct_trial_id
end
