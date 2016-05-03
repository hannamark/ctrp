json.users do
  json.array!(@users) do |user|
    json.extract! user, :domain, :id, :username, :first_name, :last_name, :email, :user_status_id, :role, :receive_email_notifications
    json.user_status_name user.user_status ? user.user_status.name : ''
    json.url user_url(user, format: :json)
    if user.organization.present?
      json.user_organization_name user.organization.name
      json.families do
        json.array!(user.organization.families) do |family|
          json.extract! family, :id, :name
        end
      end
    end
  end
end

json.search_status @status
json.search_organization @organization
json.search_type @searchType

json.start params[:start]
json.rows params[:rows]
json.total @users.respond_to?(:total_count) ? @users.total_count : @users.size
json.sort params[:sort]
json.order params[:order]

