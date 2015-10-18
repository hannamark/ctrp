class RegistrationsController < Devise::RegistrationsController


  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_flashing_format?
        sign_up(resource_name, resource)
        render :status => 200,
               :json => { :success => true,
                          :info => "Logged out",
               }
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
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
