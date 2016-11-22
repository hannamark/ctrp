json.array!(@po_affiliation_statuses) do |po_affiliation_status|
  json.extract! po_affiliation_status, :id
  json.extract! po_affiliation_status, :name
  json.extract! po_affiliation_status, :code
  json.url po_affiliation_status_url(po_affiliation_status, format: :json)
end
