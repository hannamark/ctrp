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
    @user = User.find(params[:id])
  end

  def update
    @user = current_user
    @user.update_attributes(params[:user])
    render :edit
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = current_user || current_local_user || current_ldap_user || current_omniauth_user
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params[:user]
    end
end
