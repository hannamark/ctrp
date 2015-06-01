json.array!(@family_statuses) do |family_status|
  json.extract! family_status, :id, :code, :name
  json.url family_status_url(family_status, format: :json)
end
