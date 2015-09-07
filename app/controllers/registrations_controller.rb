class RegistrationsController < Devise::RegistrationsController

  def create
    Rails.logger.info "HIIiIIIIIIII!!!!!!!"
    super
  end

  protected
  def after_sign_up_path_for(resource)
    Rails.logger.info "HIIiIIIIIIII!!!!!!!"
    after_signup_path(:add_user_details)
  end
end