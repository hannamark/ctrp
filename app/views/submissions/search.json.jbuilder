
json.trial_submissions do
  json.array!(@trial_submissions) do |trial_submission|

    json.extract! trial_submission, :id, :trial_id, :user_id
    json.last_name trial_submission.user ? trial_submission.user.last_name : ''
    json.first_name trial_submission.user ? trial_submission.user.first_name : ''
    json.middle_name trial_submission.user ? trial_submission.user.middle_name : ''
    json.username trial_submission.user ? trial_submission.user.username : ''
    json.nci_id trial_submission.trial ? trial_submission.trial.nci_id : ''
    json.official_title trial_submission.trial ? trial_submission.trial.official_title : ''
    json.start_date trial_submission.trial ? trial_submission.trial.start_date : ''
    json.comp_date trial_submission.trial ? trial_submission.trial.comp_date : ''
    json.lead_protocol_id trial_submission.trial ? trial_submission.trial.lead_protocol_id : ''
    json.lead_org_name trial_submission.trial && trial_submission.trial.lead_org ? trial_submission.trial.lead_org.name : ''
    json.lead_org_id trial_submission.trial && trial_submission.trial.lead_org ? trial_submission.trial.lead_org.id : ''
    json.process_priority trial_submission.trial && trial_submission.trial.process_priority ? trial_submission.trial.process_priority : ''
    json.ctep_id trial_submission.trial && trial_submission.trial.lead_org && trial_submission.trial.lead_org.ctep_id ? trial_submission.trial.lead_org.ctep_id : ''

  end
end

json.start params[:start]
json.rows params[:rows]
json.total @trial_submissions.respond_to?(:total_count) ? @trial_submissions.total_count : @trial_submissions.size
json.sort params[:sort]
json.order params[:order]