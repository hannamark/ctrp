class UsersController < ApplicationController
  before_action :set_user, :only => :index
  #before_filter :wrapper_authenticate_user unless Rails.env.test?

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

    yml_content = YAML.load_file(Rails.root.join('config', 'locales').to_s + '/en.yml')
    #Rails.logger.debug "yml_content = #{yml_content.inspect}"
    # It is critical to make sure that we dont loose the current_user when going through
    # the GSA Acceptance
    user = nil
    if @current_user.nil?
      @current_user = get_user
    end
    user = @current_user


    auth_string = request.headers['Authorization']
    if !auth_string.blank?
      Rails.logger.debug "UserController, GSA, auth_string = #{auth_string.inspect}"
      token = auth_string.split(" ")[1]
      Rails.logger.debug "UserController, GSA, auth_string = #{token.inspect}"
      decoded_token = decode_token(token)
     Rails.logger.debug "UserController, GSA, decoded_token = #{decoded_token.inspect}"
      user_id =  decoded_token[0]["user_id"]
      Rails.logger.debug "UserController, GSA, user_id = #{user_id.inspect}"
      user = User.find(user_id)
      @current_user = user
      Rails.logger.debug "UserController, GSA, user = #{user.inspect}"
    end

    Rails.logger.debug "IN GSA @current_user = #{@current_user}"

    unless user.nil?
      login_user(user)
      set_current_user(user)
      if user.is_a?(LocalUser)
        gsa_text = yml_content['en']['non_nih_user_gsa_msg']
      elsif user.is_a?(LdapUser)
        gsa_text = yml_content['en']['nih_user_gsa_msg']
      else
        gsa_text = yml_content['en']['non_nih_user_gsa_msg']
      end
    else
      gsa_text = yml_content['en']['non_nih_user_gsa_msg']
    end

    render :status => 200, :json => { :success => true, :gsa => "#{gsa_text}", :info => "GSA Msg"}

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
