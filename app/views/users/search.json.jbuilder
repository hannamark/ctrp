json.users do
  json.array!(@users) do |user|
    json.extract! user, :id, :username,:first_name, :last_name, :email
    json.organization_name user.organization.name
    json.organization_id user.organization.id
   # json.aff_orgs family.organizations.first(5) do |org|
   #   json.name org.name
   #end
    json.url user_url(user, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @users.respond_to?(:total_count) ? @users.total_count : @users.size
json.sort params[:sort]
json.order params[:order]
