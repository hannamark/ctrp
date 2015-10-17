class UsersController < ApplicationController
  before_action :set_user, :only => :index
 # before_filter :authenticate_user!, :only => :update

  attr_accessor :gsa_text

  # GET /users
  # GET /users.json
  def index
    # The Current User logged in
    Rails.logger.info "@user = #{@user.inspect}"
    @users = []
    unless @user.blank?
      @users = @user.get_all_users_by_role
      Rails.logger.info "UserController,index @users = #{@users.inspect}"
    end
  end

  def show
    @user = User.find_by_username(params[:username])
  end


  def update
    @user = User.find_by_username(params[:user][:username])
    Rails.logger.info "In Users Controller, update before user = #{@user.inspect}"


    respond_to do |format|
      #@person.po_affiliations.destroy
      if @user.update_attributes(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render json: @user}
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end

    Rails.logger.info "In Users Controller, update after user = #{@user.inspect}"
  end

  def approve
    # When an ADMIN approves of the user request for privileges, the role is updated
    # if it is not already chosen and the approved field is set to true
    @user = User.find_by_username(params[:username])
    @user.process_approval
    redirect_to users_path

  end

  def disapprove
      # When an ADMIN disapproves of the user request for privileges, the role is set to nill
      # and the approved field is set to false
    @user = User.find_by_username(params[:username])
    @user.process_disapproval
    redirect_to users_path
  end

  def gsa
    yml_content = YAML.load_file('config/locales/en.yml')

    if local_user_signed_in?
      Rails.logger.info "GSA for localUser"
      @user.gsa_text = "abc"
    elsif ldap_user_signed_in?
      Rails.logger.info "GSA for ldapUser"
      @user.gsa_text = "xyz"
    else
      Rails.logger.info "GSA for Unknown user"
    end

    respond_to do |format|
      format.html { redirect_to @user, notice: 'User was successfully updated.' }
    end
=begin
    respond_to do |format|
      #@person.po_affiliations.destroy
      if @user.update_attributes(user_params)
        Rails.logger.info "@user = #{@user.inspect}"
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render json: @user}
      else
        #format.html { render :edit }
        Rails.logger.info "@user= #{@user.inspect}"
        Rails.logger.info "@user.errors = #{@user.errors.inspect}"
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
=end
end


  def search
    Rails.logger.info "In User controller params = #{params.inspect}"
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 10 if params[:rows].blank?
    params[:sort] = 'username' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?
    @users = User.all

    if params[:username].present? || params[:first_name].present? || params[:last_name].present? || params[:email].present?
      @users = @users.select{|x| x.username && x.username.include?(params[:username])} if params[:username].present?
      @users = @users.select{|x| x.first_name && x.first_name.include?(params[:first_name])} if params[:first_name].present?
      @users = @users.select{|x| x.last_name && x.last_name.include?(params[:last_name])} if params[:last_name].present?
      @users = @users.select{|x| x.email && x.email.include?(params[:email])} if params[:email].present?
    end
    Rails.logger.info "In User controller, search @users = #{@users.inspect}"
    @users
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
      params.require(:user).permit(:username, :email, :zipcode, :first_name, :last_name, :middle_name, :receive_email_notifications,  :updated_at, :created_at, :role, :street_address, :organization_id)
    end
end
