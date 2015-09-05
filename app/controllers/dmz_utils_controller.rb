class DmzUtilsController < ActionController::Base

  def get_appver
    @appver = AppSetting.find_by_code('APP_VER')
  end
end
