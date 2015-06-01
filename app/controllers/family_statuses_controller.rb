class FamilyStatusesController < ApplicationController
  before_action :set_family_status, only: [:show, :edit, :update, :destroy]

  # GET /family_statuses
  # GET /family_statuses.json
  def index
    @family_statuses = FamilyStatus.all
  end

  # GET /family_statuses/1
  # GET /family_statuses/1.json
  def show
  end

  # GET /family_statuses/new
  def new
    @family_status = FamilyStatus.new
  end

  # GET /family_statuses/1/edit
  def edit
  end

  # POST /family_statuses
  # POST /family_statuses.json
  def create
    @family_status = FamilyStatus.new(family_status_params)

    respond_to do |format|
      if @family_status.save
        format.html { redirect_to @family_status, notice: 'Family status was successfully created.' }
        format.json { render :show, status: :created, location: @family_status }
      else
        format.html { render :new }
        format.json { render json: @family_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /family_statuses/1
  # PATCH/PUT /family_statuses/1.json
  def update
    respond_to do |format|
      if @family_status.update(family_status_params)
        format.html { redirect_to @family_status, notice: 'Family status was successfully updated.' }
        format.json { render :show, status: :ok, location: @family_status }
      else
        format.html { render :edit }
        format.json { render json: @family_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /family_statuses/1
  # DELETE /family_statuses/1.json
  def destroy
    @family_status.destroy
    respond_to do |format|
      format.html { redirect_to family_statuses_url, notice: 'Family status was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_family_status
      @family_status = FamilyStatus.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def family_status_params
      params.require(:family_status).permit(:code, :name)
    end
end
