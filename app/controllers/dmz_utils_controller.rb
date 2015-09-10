class DmzUtilsController < ActionController::Base

  def get_app_ver
      @app_ver = Rails.configuration.application_version
  end

  def get_login_bulletin
     @login_bulletin = AppSetting.find_by_code('LOGIN_BULLETIN').big_value()

  end

end
