class ApplicationController < ActionController::Base
  respond_to :html, :xml, :json
  #before_filter :wrapper_authenticate_user unless Rails.env.test?
  #check_authorization :unless => :devise_controller?
  rescue_from DeviseLdapAuthenticatable::LdapException do |exception|
    render :text => exception, :status => 500
  end
  rescue_from CanCan::AccessDenied do |exception|
    Rails.logger.debug "Access denied onn #{exception.action} #{exception.subject.inspect}"
    Rails.logger.debug "Access denied onn #{exception.subject.inspect}"
    unless exception.subject ==  :rails_admin
      respond_with do |format|
        if user_signed_in?
          format.json { render json: { message: "You don't have permissions." }, status: :forbidden }
        else
          format.json { render json: { message: "You need to be logged in." }, status: :unauthorized }
        end
      end
    end
  end
  before_action :configure_permitted_parameters, if: :devise_controller?

  #@@current_user = current_user

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  # CSRF protection for AngularJS
  #after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def reset_current_user
    @current_user = nil
  end

  def wrapper_authenticate_user
    #Rails.logger.info "In wrapper_authenticate_user session = #{session.inspect}"
    #reset_current_user
    # Extract JWT token from the request header
    token = request.headers['Authorization']
    ## If the App was accessed with the Angular UI, it will have a token, else the token will be nil
    if token.blank?
      ## The App was signed/accessed via the Rails App (not Angular)
      username = params["username"]
      unless username.blank?
        Rails.logger.info "Authenticating user with username = #{username.inspect}"
        user = User.find_by_username(username.downcase)
      end
      Rails.logger.info "#{user.inspect}" unless user.blank?
      # Authenticate User using the methods provided by the Devise gem based on the type of User
      # If the user in nil, a 401 error, CanCan::AccessDenied is generated by these methods
      if local_user_signed_in?
        Rails.logger.info "In authenticate_user signing in as local_user"
        @current_user = current_local_user
        authenticate_local_user!
        Rails.logger.info "Completed authenticate_user signing in as local_user"
      elsif ldap_user_signed_in?
        @current_user = current_ldap_user
        Rails.logger.info "In authenticate_user signing in as ldap_user"
        authenticate_ldap_user!
      else
        Rails.logger.info "In authenticate_user signing in as omniauth_user"
        authenticate_user!
      end

    else
      # The App was signed in using Angular
      Rails.logger.info "token = " + token
      # Decode the token
      begin
        decoded_token = decode_token(token)
        user_id =  decoded_token[0]["user_id"]
      rescue => e
        Rails.logger.debug "Unable to decode token exception #{e.backtrace}"
        raise "Unable to decode token. The Authentication of the user cannot be performed"
      end
      user = User.find_by_id(user_id)
      begin
        # All options given to sign_in is passed forward to the set_user method in warden.
        # The only exception is the :bypass option, which bypass warden callbacks and stores
        # the user straight in session. This option is useful in cases the user is already
        # signed in, but we want to refresh the credentials in session.
        sign_in user, :bypass => true
      rescue => e
        e.backtrace
        Rails.logger.debug "Unable to authenticate user exception #{e.backtrace}"
        raise "Unable to authenticate User. The Authentication of the user cannot be performed"
      end
      @current_user = user
      current_user = user
      if user.is_a?(LdapUser)
        current_ldap_user = user
      elsif user.is_a?(LocalUser)
        current_local_user = user
      else
        current_user = user
      end
    end
    Rails.logger.info "End of wrapper_authenticate_user"
  end

  ## TODO secret must be an environmental variable
  def create_token(token_data)
    secret = "secret" # must be an environment variable
    JWT.encode(token_data, secret)
  end

  ## TODO secret must be an environmental variable
  def decode_token(token)
    secret = "secret" # must be an environment variable
    return JWT.decode token, secret
  end


  ## TODO secret must be an environmental variable
  def create_authorization_json(user, token)
    begin
      Rails.logger.info "In create_authorization_json user=#{user.inspect}"

      app_version = Rails.configuration.application_version
      auth_json = {
          app_version: app_version,
          token: token,
          role: user.role,
          privileges: user.get_privileges,
          user_type: user.type,
          env: Rails.env
                    }

      Rails.logger.info "In create_authorization_json auth_json = #{auth_json.inspect}"
      return auth_json
    rescue => e
      Rails.logger.info "In Application Controller, exception handling"
      Rails.logger.info e.message
      Rails.logger.info e.backtrace
    end
  end

  rescue_from ActiveRecord::StaleObjectError do |exception|
    respond_to do |format|
      format.html {
        flash.now[:error] = "Another user has updated this record while you were editing"
        render :edit, status: :conflict
      }
      format.json { render json: { "error": "Another user has updated this record while you were editing" }, status: :conflict }
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :role) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:username, :email, :password) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :password, :password_confirmation, :current_password, :role) }
  end

=begin
  def verified_request?
    if respond_to?(:valid_authenticity_token?, true)
      # Rails 4.2 and above
      super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
    else
      # Rails 4.1 and below
      super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
    end
  end
=end

  def after_sign_out_path_for(resource)
    request.referrer
  end

 # def after_sign_up_path_for(resource)
 #   Rails.logger.info "In after_sign_up_path_for"
 #   redirect_to users_path
 # end


  def current_ctrp_user
    unless current_local_user.blank? && current_ldap_user.blank?
       current_local_user || current_ldap_user
    end
  end

end
