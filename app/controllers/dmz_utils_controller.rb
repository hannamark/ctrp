class DmzUtilsController < ActionController::Base

  def get_app_version
      @app_version = Rails.configuration.application_version
  end

  def get_app_rel_milestone
    @app_rel_milestone = AppSetting.find_by_code('APP_RELEASE_MILESTONE').value()
  end

  def get_login_bulletin
     @login_bulletin = AppSetting.find_by_code('LOGIN_BULLETIN').big_value()
  end

  def get_git_info
    @git_full_revision = CTRP::GIT_FULL_REVISION
    @git_short_revision = CTRP::GIT_SHORT_REVISION
    @git_branch = CTRP::GIT_BRANCH
  end

end
