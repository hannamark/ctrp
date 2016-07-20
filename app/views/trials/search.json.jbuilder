json.trials do
  json.array!(@trials) do |trial|
    json.extract! trial, :id, :lead_protocol_id, :nci_id, :official_title, :pilot, :my_site_id, :ctg_id, :start_date, :verification_date, :primary_comp_date, :submitter, :last_updated_at, :last_updated_by, :last_amended_at, :last_amended_by, :onhold_reason
    json.phase trial.phase.present? ? trial.phase.name : nil
    json.purpose trial.primary_purpose.present? ? trial.primary_purpose.name : nil
    json.pi trial.pi.present? ? trial.pi.lname + ', ' + trial.pi.fname : nil
    json.lead_org trial.lead_org.present? ? trial.lead_org.name : nil
    json.sponsor trial.sponsor.present? ? trial.sponsor.name : nil
    json.study_source trial.study_source.present? ? trial.study_source.name : nil
    json.current_trial_status trial.trial_status_wrappers.present? ? trial.trial_status_wrappers.last.trial_status.name : nil
    json.actions trial.actions
    json.current_processing_status trial.current_processing_status.present? ? trial.current_processing_status.name : nil
    json.accrual_disease_term trial.accrual_disease_term.present? ? trial.accrual_disease_term.name : nil
    json.research_category trial.research_category.present? ? trial.research_category.name : nil
    json.responsible_party trial.responsible_party.present? ? trial.responsible_party.name : nil
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @trials.respond_to?(:total_count) ? @trials.total_count : @trials.size
json.sort params[:sort]
json.order params[:order]
