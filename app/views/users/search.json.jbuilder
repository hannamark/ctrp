
json.users do
  json.array!(@users) do |user|
    if current_user.role == 'ROLE_ACCOUNT-APPROVER' || current_user.role == 'ROLE_SITE-SU' || current_user.role == 'ROLE_SUPER' || current_user.role == 'ROLE_ADMIN'  || current_user.role == 'ROLE_RO'  || current_user.role == 'ROLE_ABSTRACTOR' || current_user.role == 'ROLE_ABSTRACTOR-SU'
      json.extract! user, :domain, :id, :username, :first_name, :middle_name, :last_name, :email, :user_status_id, :role, :organization_family_name
      json.user_status_name user.user_status ? user.user_status.name : ''
      json.url user_url(user, format: :json)
      if user.organization.present?
        json.organization_name user.organization.name
      end
      json.admin_role user.role == 'ROLE_SITE-SU'? 'Yes': 'No'
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
json.search_families @families
json.search_type @searchType

json.start params[:start]
json.rows params[:rows]
json.total @users.respond_to?(:total_count) ? @users.total_count : @users.size
json.sort params[:sort]
json.order params[:order]

