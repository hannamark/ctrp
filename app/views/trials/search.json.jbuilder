json.trials do
  json.array!(@trials) do |trial|
    json.extract! trial, :id, :lead_protocol_id, :official_title, :pilot
    json.phase trial.phase.present? ? trial.phase.name : nil
    json.purpose trial.primary_purpose.present? ? trial.primary_purpose.name : nil
    json.pi trial.pi.present? ? trial.pi.lname + ', ' + trial.pi.fname : nil
    json.lead_org trial.lead_org.present? ? trial.lead_org.name : nil
    json.sponsor trial.sponsor.present? ? trial.sponsor.name : nil
    json.url trial_url(trial, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @trials.respond_to?(:total_count) ? @trials.total_count : @trials.size
json.sort params[:sort]
json.order params[:order]
