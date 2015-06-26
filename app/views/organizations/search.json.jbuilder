json.orgs do
  json.array!(@organizations) do |organization|
    json.extract! organization, :id, :source_id, :name, :address, :address2, :city, :state_province, :postal_code, :country, :email, :phone, :fax
    json.source_status organization.source_status.present? ? organization.source_status.name : nil
    json.url organization_url(organization, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @organizations.total_count
json.sort params[:sort]
json.order params[:order]
json.alias params[:alias]
