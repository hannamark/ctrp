json.array!(@study_sources) do |study_source|
  json.extract! study_source, :id, :code, :name
  json.url study_source_url(study_source, format: :json)
end
