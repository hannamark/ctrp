class DmzUtilsController < ActionController::Base

  def get_appver
 #   @appver = AppSetting.find_by_code('APP_VER')
     @appver = Rails.configuration.application_version
  end
end
