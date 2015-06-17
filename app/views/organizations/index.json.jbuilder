json.array!(@organizations) do |organization|
  json.extract! organization, :id, :source_id, :name, :address, :address2, :city, :state_province, :postal_code, :country, :email, :phone, :fax
  json.url organization_url(organization, format: :json)
end
