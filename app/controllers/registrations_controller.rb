class RegistrationsController < Devise::RegistrationsController
  respond_to :html, :js

  def create
    build_resource(sign_up_params)
      resource[:user_status_id] = UserStatus.find_by_code('INR').id
      if resource.save
        begin
          mail_template = MailTemplate.find_by_code('USER_REGISTRATION')
          user = params[:local_user]
          mail_template.body_html.gsub!('${user_name}',      "#{user[:first_name]} #{user[:last_name]}")
          mail_template.body_html.gsub!('${user_username}',  user[:username])
          mail_template.body_html.gsub!('${user_email}',     user[:email])
          mail_template.body_html.gsub!('${user_phone}',     "#{(user[:phone] ? user[:phone] : '')} #{(user[:phone_ext] ? ' ext ' + user[:phone_ext] : '')}" )
          mail_template.body_html.gsub!('${user_org}',       (user[:organization_id] ? Organization.find(user[:organization_id]).name : '') )
          mail_template.body_html.gsub!('${date}',           (Time.now).strftime('%v') )

          CtrpMailer.general_email(mail_template.from, mail_template.to, mail_template.cc, mail_template.bcc, mail_template.subject, mail_template.body_text, mail_template.body_html).deliver_now
        rescue  Exception => e
          logger.warn "email delivery error = #{e}"
        end
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

  protected
  #def after_sign_up_path_for(resource)
 #   after_signup_path(:add_user_details)
 # end

  #def after_sign_up_path_for(resource)
   # Rails.logger.info "In after_sign_up_path_for"
   # redirect_to users_path
  #end
end
