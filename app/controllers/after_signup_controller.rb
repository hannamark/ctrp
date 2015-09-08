class AfterSignupController < ApplicationController
  include Wicked::Wizard

  steps :add_user_details, :add_organization


  def show
    Rails.logger.debug "In AfterSignUpController, show, current_local_user = #{current_local_user.inspect}"
    @user = current_local_user
    render_wizard
  end

  def update
    Rails.logger.debug "In AfterSignUpController, update, current_local_user = #{current_local_user.inspect}"
    @user = current_local_user
 #   case step
 #     when :confirm_password
        @user.update_attributes(local_user_params)
 #   end
    #sign_in(@user, bypass: true) # needed for devise
    render_wizard @user
  end

private
  def local_user_params
    params.require(:local_user).permit(:zipcode)
  end

end
