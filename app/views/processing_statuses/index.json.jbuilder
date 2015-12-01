json.array!(@processing_statuses) do |processing_status|
  json.extract! processing_status, :id, :code, :name
  json.url processing_status_url(processing_status, format: :json)
end
