json.users do
  json.array!(@users) do |user|
    json.extract! user, :domain, :id, :username, :first_name, :last_name, :email, :approved, :user_status
    json.organization_name user.organization.nil? ? nil : user.organization.name
    json.organization_id  user.organization.nil? ? nil : user.organization.id
    json.url user_url(user, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @users.respond_to?(:total_count) ? @users.total_count : @users.size
json.sort params[:sort]
json.order params[:order]
