class SubmissionsController < ApplicationController
  before_action :set_submission, only: [:show, :edit, :update, :destroy]

  # GET /submissions
  # GET /submissions.json
  def index
    @submissions = Submission.all
  end

  # GET /submissions/1
  # GET /submissions/1.json
  def show
  end

  # GET /submissions/new
  def new
    @submission = Submission.new
  end

  # GET /submissions/1/edit
  def edit
  end

  # POST /submissions
  # POST /submissions.json
  def create
    @submission = Submission.new(submission_params)

    respond_to do |format|
      if @submission.save
        format.html { redirect_to @submission, notice: 'Sub group was successfully created.' }
        format.json { render :show, status: :created, location: @submission }
      else
        format.html { render :new }
        format.json { render json: @submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /submissions/1
  # PATCH/PUT /submissions/1.json
  def update
    respond_to do |format|
      if @submission.update(submission_params)
        format.html { redirect_to @submission, notice: 'Submission was successfully updated.' }
        format.json { render :show, status: :ok, location: @submission }
      else
        format.html { render :edit }
        format.json { render json: @submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /submissions/1
  # DELETE /submissions/1.json
  def destroy
    @submission.destroy
    respond_to do |format|
      format.html { redirect_to submissions_url, notice: 'Submission was successfully destroyed.' }
      format.json { head :no_content }
    end
  end



  # GET /user_trial_submissions/search.json
  def search
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?

    if params[:sort].blank?
      params[:sort] = 'submission_received_date'
    elsif params[:sort] == 'business_days_since_submitted'
      params[:sort] = 'submission_received_date'
      if params[:order].downcase == 'asc'
        params[:order] = 'desc'
      elsif params[:order].downcase == 'desc'
        params[:order] = 'asc'
      end
    end

    params[:order] = 'asc' if params[:order].blank?

    @trial_submissions = Submission.matchesImpPro(
        params,
        InternalSource.find_by_code('IMP').id,
        InternalSource.find_by_code('PRO').id,
    )

    @trial_submissions = @trial_submissions.order("#{params[:sort]} #{params[:order]}")
    unless params[:rows].nil?
      @trial_submissions = @trial_submissions.page(params[:start]).per(params[:rows])
    end

    @userReadAccess  = userReadAccess  current_site_user
    @userWriteAccess = userWriteAccess current_site_user
    @searchAccess = true
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_submission
    @submission = Submission.find(params[:id])
  end

  def current_site_user
    auth_string = request.headers['Authorization']
    if !auth_string.blank?
      token = auth_string.split(" ")[1]
      user_id = decode_token(token)
      user = User.find(user_id)
    end
    user
  end

  def userReadAccess userToUpdate
    if current_site_user
      user = current_site_user
      write_access = userWriteAccess user
    end
    user && userToUpdate ? (user.role == 'ROLE_RO' || write_access)  : false
  end

  def userWriteAccess userToUpdate
    if current_site_user
      user = current_site_user
    end
    user && userToUpdate ?
        ( user.role == 'ROLE_ADMIN' || user.role == 'ROLE_ACCOUNT-APPROVER' ||
            user.role == 'ROLE_ABSTRACTOR' || user.role == 'ROLE_ABSTRACTOR-SU'  ||
            user.role == 'ROLE_SUPER' ) : false
  end

  def searchAccess
    if current_site_user
      user = current_site_user
    end
    user ?
        ( user.role == 'ROLE_RO' || user.role == 'ROLE_ADMIN' || user.role == 'ROLE_ACCOUNT-APPROVER' ||
            user.role == 'ROLE_ABSTRACTOR' || user.role == 'ROLE_ABSTRACTOR-SU'  ||
            user.role == 'ROLE_SUPER' || (isSiteAdminForOrg user, user.organization_id) ) : false
  end

  def isSiteAdminForOrg user, orgId
    family = FamilyMembership.find_by_organization_id(orgId)
    if family
      org_users = User.family_unexpired_matches_by_org(orgId)
    else
      org_users = User.matches('organization_id', orgId)
    end
    user_found = org_users.find_by_id user.id
    user_found && user_found.role == "ROLE_SITE-SU"
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def submission_params
    params[:submission].permit(:id,:amendment_num,:amendment_date,:amendment_reason_id,:acknowledge,:acknowledge_comment, :owner_user_id,
    :expected_abstraction_completion_date,:expected_abstraction_completion_date_comments,:acknowledge_date,:acknowledged_by,:business_days_since_submitted )
  end
end
