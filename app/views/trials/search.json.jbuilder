json.trials do
  json.array!(@trials) do |trial|
    json.extract! trial, :id, :lead_protocol_id, :official_title
    json.url trial_url(trial, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @trials.respond_to?(:total_count) ? @trials.total_count : @trials.size
json.sort params[:sort]
json.order params[:order]
