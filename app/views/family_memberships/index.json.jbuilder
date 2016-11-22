json.array!(@family_memberships) do |family_membership|
  json.extract! family_membership, :id, :family_id, :organization_id, :family_relationship_id, :effective_date, :expiration_date
  json.url family_membership_url(family_membership, format: :json)
end
