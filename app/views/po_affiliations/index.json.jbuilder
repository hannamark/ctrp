json.array!(@po_affiliations) do |po_affiliation|
  json.extract! po_affiliation, :id, :person_id, :organization_id, :po_affiliation_status_id, :effective_date, :expiration_date
  json.url po_affiliation_url(po_affiliation, format: :json)
end
