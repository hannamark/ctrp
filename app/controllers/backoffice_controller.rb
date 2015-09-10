class BackofficeController < ApplicationController
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  rescue_from CanCan::AccessDenied do |exception|
    Rails.logger.debug "Access denied on #{exception.action} #{exception.subject.inspect}"
    redirect_to users_path, :alert => exception.message
  end

  def index
    authorize! :access_backoffice, :manage_backoffice
  end

  def static_members
    authorize! :access_backoffice, :manage_backoffice
  end

  def download_log
    authorize! :access_backoffice, :manage_backoffice
    send_file(
        "#{Rails.root}/../../logs/#{Rails.env}.log",
        filename: "#{Rails.env}.log",
        type: "text/plain"
    )
  end
end
