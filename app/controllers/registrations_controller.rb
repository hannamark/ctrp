class RegistrationsController < Devise::RegistrationsController
  respond_to :html, :js

  def create
    build_resource(sign_up_params)
      resource[:user_status_id] = UserStatus.find_by_code('INR').id
      if resource.save
        mail_template = MailTemplate.find_by_code('USER_REGISTRATION')
        user = params[:local_user]
        mail_template.body_html.gsub!('${user_name}',      "#{user[:first_name]} #{user[:last_name]}")
        mail_template.body_html.gsub!('${user_username}',  user[:username])
        mail_template.body_html.gsub!('${user_email}',     user[:email])
        mail_template.body_html.gsub!('${user_phone}',     "#{(user[:phone] ? user[:phone] : '')} #{(user[:phone_ext] ? ' ext ' + user[:phone_ext] : '')}" )
        mail_template.body_html.gsub!('${user_org}',       (user[:organization_id] ? Organization.find(user[:organization_id]).name : '') )
        mail_template.body_html.gsub!('${date}',           (Time.now).strftime('%v') )

        CtrpMailerWrapper.send_email(mail_template, nil)

        render :status => 200, :json => { :success => true, :info => "Sign Up"}
      else
        Rails.logger.debug resource.errors.full_messages
        render json: resource.errors, status: :unprocessable_entity
      end
  end

  # Build a devise resource passing in the session. Useful to move
  # temporary session data to the newly created user.
  def build_resource(hash=nil)
    self.resource = resource_class.new_with_session(hash || {}, session)
  end

  private

  def sign_up_params
    params[:local_user].permit(:username, :first_name, :last_name, :email, :password, :password_confirmation, :phone, :phone_ext, :organization_id, :domain)
  end

end
