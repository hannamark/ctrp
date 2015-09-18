class RegistrationsController < Devise::RegistrationsController
  protected

  def after_sign_up_path_for(resource)
    Rails.logger.info "In after_sign_up_path_for"
    redirect_to users_path
  end
end
