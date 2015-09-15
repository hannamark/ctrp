class UsersController < ApplicationController
  before_action :set_user
  before_filter :authenticate_user!, :only => :update

  # GET /users
  # GET /users.json
  def index
    # The Current User logged in
    Rails.logger.info "@user = #{@user.inspect}"
    if @user.blank?
      @users = []
    else
      @users = @user.get_all_users_by_role
    end
  end
  
  def show
    unless params.nil? || params[:id].nil?
      user_identifier = params[:id]
      if  user_identifier.to_i > 0
        @user = User.find(user_identifier)
      else
        @user =  User.find_by_username(user_identifier)
      end
    end
  end

  def update
    @user = current_user
    @user.update_attributes(params[:user])
    render :edit
  end

  def approve
    # When an ADMIN approves of the user request for privileges, the role is updated
    # if it is not already chosen and the approved field is set to true
    @user.process_approval
    redirect_to users_path

  end

  def disapprove
      # When an ADMIN disapproves of the user request for privileges, the role is set to nill
      # and the approved field is set to false
    @user.process_disapproval
    redirect_to users_path
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      unless params.nil? || params[:id].nil? || params[:username].nil?
        @user = User.find(params[:id]) || User.find(params[:username])
      else
        @user = current_user || current_local_user || current_ldap_user || current_omniauth_user
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params[:user]
    end
end
