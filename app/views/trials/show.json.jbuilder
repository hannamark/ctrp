json.extract! @trial, :id, :nci_id, :lead_protocol_id, :official_title, :pilot, :research_category_id,
              :primary_purpose_other, :secondary_purpose_other, :investigator_title, :program_code, :grant_question,
              :start_date, :start_date_qual, :primary_comp_date, :primary_comp_date_qual, :comp_date, :comp_date_qual,
              :ind_ide_question, :intervention_indicator, :sec801_indicator, :data_monitor_indicator, :history,
              :study_source_id, :phase_id, :primary_purpose_id, :secondary_purpose_id, :responsible_party_id,
              :accrual_disease_term_id, :lead_org_id, :pi_id, :sponsor_id, :investigator_id, :investigator_aff_id,
              :created_at, :updated_at, :created_by, :updated_by, :study_source, :lead_org, :pi, :sponsor,
              :investigator, :investigator_aff, :other_ids, :trial_funding_sources, :funding_sources, :grants,
              :trial_status_wrappers, :ind_ides, :oversight_authorities, :trial_documents, :is_draft, :lock_version,
              :actions

json.trial_status_wrappers do
  json.array!(@trial.trial_status_wrappers) do |status|
    json.extract! status, :trial_id, :id, :status_date, :why_stopped, :trial_status_id, :trial_status, :comment, :created_at, :updated_at
  end
end
