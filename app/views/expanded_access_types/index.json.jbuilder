json.array!(@expanded_access_types) do |expanded_access_type|
  json.extract! expanded_access_type, :id, :code, :name
  json.url expanded_access_type_url(expanded_access_type, format: :json)
end
