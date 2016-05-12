class TrialOwnershipsController < ApplicationController
  #before_action :set_trial_ownership, only: [:show, :edit, :update, :destroy]

  # GET /trial_ownerships
  # GET /trial_ownerships.json
  def index
    @trial_ownerships = TrialOwnership.all
    @trial_ownerships = @trial_ownerships.matches()
    @trial_ownerships
  end


  # GET /trial_ownerships/search.json
  def search
    # Pagination/sorting params initialization
    params[:start] = 1 if params[:start].blank?
    params[:rows] = 10 if params[:rows].blank?
    params[:sort] = 'comp_date' if params[:sort].blank?
    params[:order] = 'asc' if params[:order].blank?

    @trial_ownerships = TrialOwnership.all
    @trial_ownerships = @trial_ownerships.matches('user_id', params[:user_id])
    @trial_ownerships = @trial_ownerships.order("#{params[:sort]} #{params[:order]}").page(params[:start]).per(params[:rows])

    @trial_ownerships
  end

  # GET /trial_documents/1
  # GET /trial_ownerships/1.json
  def show
  end

  # GET /trial_ownerships/new
  def new
    @trial_ownerships = TrialOwnership.new
  end

  # GET /trial_ownerships/1/edit
  def edit
  end

  # POST /trial_ownerships
  # POST /trial_ownerships.json
  def create
    Rails.logger.info "params: #{params}"

    @trial_ownership = TrialOwnership.new(trial_ownership_params)

    respond_to do |format|
      if @trial_ownership.save

        format.html { redirect_to @trial_ownership, notice: 'Trial ownership was successfully created.' }
        format.json { render :show, status: :created, location: @trial_ownership }
      else
        format.html { render :new }
        format.json { render json: @trial_ownership.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /trial_ownerships/1
  # PATCH/PUT /trial_ownerships/1.json
  def update
    respond_to do |format|
      if @trial_ownership.update(trial_ownership_params)
        format.html { redirect_to @trial_ownership, notice: 'Trial ownership was successfully updated.' }
        format.json { render :show, status: :ok, location: @trial_ownership }
      else
        format.html { render :edit }
        format.json { render json: @trial_ownership.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trial_ownerships/1
  # DELETE /trial_ownerships/1.json
  def destroy
    @trial_ownership.destroy
    respond_to do |format|
      format.html { redirect_to trial_ownerships_url, notice: 'Trial ownership was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trial_ownership
      @trial_ownership = TrialOwnership.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trial_ownership_params
      params.permit(:trial_id, :user_id)
    end
end
