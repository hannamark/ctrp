class SessionsController < Devise::SessionsController
  skip_before_filter :verify_signed_out_user

  def create

    begin
      user_class = nil
      error_string = 'Login failed'
      Rails.logger.info "In SessionController's create method"
      #Rails.logger.info "#{request.inspect}"
      #Rails.logger.info "request params = #{request.params.inspect} "
     # Rails.logger.info "user = #{request.params['user']} "

      unless request.params['user'].blank? && request.params['user']["username"].blank?
        username = request.params['user']["username"]
        request.params['user']["username"]= username.downcase
        Rails.logger.info "username = #{request.params['user']["username"].inspect} "
      end
      # Copy user data to ldap_user and local_user
      request.params['ldap_user'] = request.params['local_user'] = request.params['user']

      user = nil
      unless username.nil?
        user = User.find_by_username(request.params['user']["username"].downcase)
      end

      if user.blank?
        error_text = "The User does not exist in the database as an LdapUser or a LocalUser"
        Rails.logger.error error_text
        raise error_text
      else
        ## Print informational login messages
        if user.is_a?(LocalUser)
          Rails.logger.info "LocalUser #{user.inspect} " unless user.blank?
        elsif user.is_a?(LdapUser)
          Rails.logger.info "LdapUser #{user.inspect} " unless user.blank?
        else
          Rails.logger.info "OmniauthUser #{user.inspect} " unless user.blank?
        end
      end
      if user.is_a?(LdapUser)
        # First try logging in as an LDAP user
        user_class = :ldap_user
        error_string = 'LDAP details incorrect'
        # Use Warden to authenticate the user, if we get nil back, it failed.
        Rails.logger.info "Before warden authenticate for LDAP =  #{self.resource.inspect}"
        begin
          self.resource = warden.authenticate scope: user_class
        rescue
          Rails.logger.info "LDAP Authentication failed."
        end
        Rails.logger.info "Result of warden authenticate for LDAP = #{self.resource.inspect}"
      end
      # If the user is a localUser or LDAP Authentication has failed, try logging in as a Local user
      if self.resource.nil? || user.is_a?(LocalUser)
        if self.resource.nil?
          Rails.logger.info "LDAP Authentication failed. Logging in as an local user"
        end
        user_class = :local_user
        self.resource = warden.authenticate({ scope: resource_name, recall: "#{controller_path}#new" })
        Rails.logger.info "Result of warden authenticate = #{self.resource.inspect}"
        if self.resource.nil?
          raise "Unable to login user=#{user.inspect}"
        end
        set_flash_message(:notice, :signed_in) if is_flashing_format?
        sign_in(resource_name, resource)
        yield resource if block_given?
      else
        # Now we know the LDAP user is authenticated, sign them in to the site with Devise
        # At this point, self.resource is a valid user account.
        Rails.logger.info "#{self.resource.inspect}"
        sign_in(user_class, self.resource)
        #respond_with self.resource, :location => after_sign_in_path_for(self.resource)
      end

      ## Generate JWT token
      token = create_token({:user_id => self.resource.id})
      #user = User.find_by_id(self.resource.id)
      #user.token = token
      #user.save!
      Rails.logger.info "Result of warden authenticate JWT token = #{token.inspect}"
      #self.resource.current_role = self.resource.role
      auth_json = create_authorization_json(self.resource, token)
      Rails.logger.info "authjson= #{auth_json.inspect}"
      render json: auth_json

    rescue  => e
      Rails.logger.info "In Session Controller, exception handling"
      Rails.logger.info "Unable to Login user"
      Rails.logger.info e.backtrace
      Rails.logger.info "#{self.resource.inspect}" unless self.resource.nil?
      flash[:error] = error_string
      render :status => 403,
             :json => { :success => false,
                        :info => "Login Failure",
             }
    ensure
    end

  end

  def destroyrailslogin
    Rails.logger.info "In Session Controller, destroy method, without Angular"
      method(:destroy).super_method.call
  end

  def destroy
    Rails.logger.info "In Session Controller, destroy method"
    #Rails.logger.info "session = #{session.inspect}"
    Rails.logger.info "params = #{request.params} "


    user = User.find_by_username(request.params["username"]) || User.find_by_username(request.params['user']["username"])
    Rails.logger.info "user = #{user.inspect} "
    source = request.params["source"] || ""
    #sign_in user, :bypass => true
    #Rails.logger.info "after sign_in user = #{user.inspect} "
    sign_out(user)
    #Rails.logger.info "after sign_out user = #{user.inspect} "

    ## Reset the token in the DB
    #user.token = nil
    #user.save!

    reset_current_user
    current_user = nil
    current_ldap_user = nil
    current_local_user = nil
    # Destroy session
    #method(:destroy).super_method.call
    if source == "Angular"
      render :status => 200,
             :json => { :success => true,
                        :info => "Logged out",
             }
    else
      method(:destroy).super_method.call
    end
  end

  def new
    # Set up a blank resource for the view rendering
    #Rails.logger.info "#{self.inspect}"
    self.resource = User.new
  end

end
