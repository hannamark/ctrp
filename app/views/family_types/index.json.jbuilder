json.array!(@family_types) do |family_type|
  json.extract! family_type, :id, :code, :name
  json.url family_type_url(family_type, format: :json)
end
