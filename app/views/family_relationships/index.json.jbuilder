json.array!(@family_relationships) do |family_relationship|
  json.extract! family_relationship, :id, :code, :name
  json.url family_relationship_url(family_relationship, format: :json)
end
