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
    params[:sort] = 'nci_id' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    @trial_submissions = Submission.matchesImpPro(
        params[:user_id],
        true,
        InternalSource.find_by_code('IMP').id,
        InternalSource.find_by_code('PRO').id
    )

    @trial_submissions = @trial_submissions.order("#{params[:sort]} #{params[:order]}")

    unless params[:rows].nil?
      @trial_submissions = @trial_submissions.page(params[:start]).per(params[:rows])
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_submission
    @submission = Submission.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def submission_params
    params[:submission].permit(:id,:amendment_num,:amendment_date,:amendment_reason_id,:acknowledge,:acknowledge_comment,
    :expected_abstraction_completion_date,:acknowledge_date,:acknowledged_by,:business_days_since_submitted )
  end
end
