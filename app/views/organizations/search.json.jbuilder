json.orgs do
  json.array!(@organizations) do |organization|
    json.extract! organization, :id, :source_id, :name, :address, :address2, :city, :state_province, :postal_code, :country, :email, :phone, :fax, :ctrp_id, :families
    json.source_context organization.source_context.present? ? organization.source_context.name : nil
    json.source_status organization.source_status.present? ? organization.source_status.name : nil
    json.url organization_url(organization, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @organizations.respond_to?(:total_count) ? @organizations.total_count : @organizations.size
json.sort params[:sort]
json.order params[:order]
json.alias params[:alias]
