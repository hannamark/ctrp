class UsersController < ApplicationController
  #before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!, :only => :update

  # GET /users
  # GET /users.json
  def index
    @users = User.all
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
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params[:user]
    end
end
