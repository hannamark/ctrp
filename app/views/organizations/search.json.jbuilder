json.orgs do
  json.array!(@organizations) do |organization|
    json.extract! organization, :id, :po_id, :source_id, :name, :address, :address2, :city, :state_province, :postal_code, :country, :email, :phone, :fax
    json.url organization_url(organization, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @organizations.total_count
