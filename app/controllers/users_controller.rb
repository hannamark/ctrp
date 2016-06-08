class UsersController < ApplicationController
  before_action :set_user, :only => :index
  before_filter :wrapper_authenticate_user, only: [:search] unless Rails.env.test?

  attr_accessor :gsa_text

  # GET /users
  # GET /users.json
  def index
    # The Current User logged in
    Rails.logger.info "@user = #{@user.inspect}"
    @users = []
    unless @user.blank?
      @users = @user.get_all_users_by_role
      #Rails.logger.info "UserController,index @users = #{@users.inspect}"
    end
  end

  def show
    @user = User.find_by_username(params[:username])
  end


  def update
    @user = User.find_by_username(params[:user][:username])
    initalUserRole = @user.role
    Rails.logger.info "In Users Controller, update before user = #{@user.inspect}"

    respond_to do |format|
      #@person.po_affiliations.destroy
      if @user.update_attributes(user_params)
        if user_params[:role] == 'ROLE_SITE-SU' &&  initalUserRole != 'ROLE_SITE-SU'
          begin
            mail_template = MailTemplate.find_by_code('SITE-ADMIN-ACCESS-GRANTED')
            CtrpMailer.general_email(mail_template.from, @user.email, mail_template.cc, mail_template.bcc, mail_template.subject, mail_template.body_text, mail_template.body_html).deliver_now
          rescue  Exception => e
            logger.warn "SITE-ADMIN-ACCESS-GRANTED: Email delivery error = #{e}"
          end
        end
        format.html { redirect_to @user, notice: 'User was successfully updated.' + initalUserRole }
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

  def request_admin_access
    begin
      mail_template = MailTemplate.find_by_code('USER_ADMIN_REQUEST')

      mail_template.body_html.sub!('${username}', params[:username])

      CtrpMailer.general_email(mail_template.from, mail_template.to, mail_template.cc, mail_template.bcc, mail_template.subject, mail_template.body_text, mail_template.body_html).deliver_now

      @success = [true]
    rescue  Exception => e
      logger.warn "USER ADMIN REQUEST: Email delivery error = #{e}"
      @success = [false]
    end
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
      user_id = decode_token(token)
      Rails.logger.debug "UserController, GSA, user_id = #{user_id.inspect}"
      user = User.find(user_id)
      @current_user = user
      Rails.logger.debug "UserController, GSA, user = #{user.username.inspect}" unless user.nil?
    end

    Rails.logger.debug "IN GSA @current_user = #{@current_user}"

    unless user.nil?
      authenticate_user(user)
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
    sortBy = params[:sort]
    if sortBy == 'organization_name'
      sortBy = 'user_org.name'
    end
    @users = User.all

    if ['ROLE_ADMIN'].include? current_user.role
      if params[:family_id].present?
          @users = @users.family_matches(params[:family_id], Date.today) unless @users.blank?
      elsif params[:organization_id].present?
          @users = @users.matches('organization_id', params[:organization_id]) unless @users.blank?
      end
    end

    if ['ROLE_SITE-SU'].include? current_user.role
      family = FamilyMembership.find_by_organization_id(current_user.organization_id)
      if family
        if (family.effective_date == nil || family.effective_date < Date.today) &&
            (family.expiration_date == nil || family.expiration_date > Date.today)
          @users = @users.family_matches(family.family_id, Date.today) unless @users.blank?
        else
          @users = []
        end
      else
          @users = @users.matches('organization_id', current_user.organization_id) unless @users.blank?
      end
    end

    if current_user.role != 'ROLE_SUPER' && current_user.role != 'ROLE_ADMIN' && current_user.role != 'ROLE_ABSTRACTOR' && current_user.role != 'ROLE_ABSTRACTOR-SU'
      @users = @users.matches_wc('user_status_id', UserStatus.find_by_code('ACT').id) unless @users.blank?
      @status = 'Active'
    end

    @searchType = current_user.role

    @users = @users.matches_wc('username', params[:username]) if params[:username].present? unless @users.blank?
    @users = @users.matches_wc('first_name', params[:first_name]) if params[:first_name].present? unless @users.blank?
    @users = @users.matches_wc('last_name', params[:last_name]) if params[:last_name].present? unless @users.blank?
    @users = @users.matches_wc('email', params[:email]) if params[:email].present? unless @users.blank?
    @users = @users.matches_wc('site_admin', params[:site_admin])  if !params[:site_admin].nil? unless @users.blank?
    @users = @users.matches_wc('user_status_id', params[:user_status_id]) if params[:user_status_id].present? unless @users.blank?
    @users = @users.matches_wc('organization_name', params[:organization_name])  if params[:organization_name].present? unless @users.blank?
    @users = @users.matches_wc('organization_family', params[:organization_family])  if params[:organization_family].present? unless @users.blank?
    if (sortBy != 'admin_role')
      @users = @users.order(sortBy ? "#{sortBy} #{params[:order]}" : "last_name ASC, first_name ASC") unless @users.blank?
    else
      temp0 = []
      temp1 = []
      @users.each do |user|
        if user.role == 'ROLE_SITE-SU' || user.role == 'ROLE_SUPER' || user.role == 'ROLE_ADMIN' || user.role == 'ROLE_ABSTRACTOR'
          temp0.push(user)
        else
          temp1.push(user)
        end
      end
      if params[:order].upcase == 'DESC'
        @users = (temp0 + temp1)
      else
        @users = (temp1 + temp0)
      end
    end
    unless params[:rows].nil?
      @users = Kaminari.paginate_array(@users).page(params[:start]).per(params[:rows]) unless @users.blank?
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
      params.require(:user).permit(:domain, :username, :email, :zipcode, :first_name, :last_name, :username,
                                   :middle_name, :receive_email_notifications,  :updated_at, :created_at, :role,
                                   :street_address, :organization_id, :country, :state, :prs_organization_name, :city,
                                   :phone, :user_status_id)
    end
end
