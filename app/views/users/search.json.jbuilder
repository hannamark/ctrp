
json.users do
  json.array!(@users) do |user|
    if current_user.role == 'ROLE_SITE-SU' || current_user.role == 'ROLE_SUPER' || current_user.role == 'ROLE_ADMIN'  || current_user.role == 'ROLE_ABSTRACTOR' || current_user.role == 'ROLE_ABSTRACTOR-SU'
      json.extract! user, :domain, :id, :username, :first_name, :last_name, :email, :user_status_id, :role
      json.user_status_name user.user_status ? user.user_status.name : ''
      json.url user_url(user, format: :json)
      org_family_name = ''
      if user.organization.present?
        json.organization_name user.organization.name
        json.families do
          json.array!(user.organization.families) do |family|
            json.extract! family, :id, :name
            org_family_name = org_family_name + family.name + ','
          end
        end
      end
      json.admin_role user.role == 'ROLE_SITE-SU' || user.role == 'ROLE_SUPER' || user.role == 'ROLE_ADMIN'? 'Yes': 'No'
      json.organization_family_name org_family_name.chomp(',')
      if user.receive_email_notifications then
        json.receive_email_notifications "Yes"
      else
        json.receive_email_notifications user.receive_email_notifications === false ? "No" : ""
      end
    else
      json.extract! user, :username, :first_name, :last_name
      json.url user_url(user, format: :json)
      if user.organization.present?
        json.organization_name user.organization.name
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

