class RegistrationsController < Devise::RegistrationsController
  respond_to :html, :js

  def create
    build_resource(sign_up_params)
      if resource.save
        begin
          mail_template = MailTemplate.find_by_code('USER_REGISTRATION')
          user = params[:local_user]
          selected_functions = "<ul>"
          user[:selected_functions].each do |function|
            selected_functions += "<li>#{function}</li>"
          end
          selected_functions += "</ul>"

          mail_template.body_html.sub!('${first_name}', user[:first_name])
          mail_template.body_html.sub!('${last_name}', user[:last_name])
          mail_template.body_html.sub!('${email}', user[:email])
          mail_template.body_html.sub!('${organization}', user[:organization_name])
          mail_template.body_html.sub!('${functions_list}', selected_functions)

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
