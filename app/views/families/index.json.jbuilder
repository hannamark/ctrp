json.array!(@families) do |family|
  json.extract! family, :id, :name, :description, :family_status_id, :family_type_id
  json.url family_url(family, format: :json)
end
