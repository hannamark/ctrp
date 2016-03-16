class MarkerCadsrsController < ApplicationController
  before_action :set_marker_cadsr, only: [:show, :edit, :update, :destroy]

  # GET /marker_cadsrs
  # GET /marker_cadsrs.json
  def index
    @marker_cadsrs = MarkerCadsr.all
  end

  # GET /marker_cadsrs/1
  # GET /marker_cadsrs/1.json
  def show
  end

  # GET /marker_cadsrs/new
  def new
    @marker_cadsr = MarkerCadsr.new
  end

  # GET /marker_cadsrs/1/edit
  def edit
  end

  # POST /marker_cadsrs
  # POST /marker_cadsrs.json
  def create
    @marker_cadsr = MarkerCadsr.new(marker_cadsr_params)

    respond_to do |format|
      if @marker_cadsr.save
        format.html { redirect_to @marker_cadsr, notice: 'Marker cadsr was successfully created.' }
        format.json { render :show, status: :created, location: @marker_cadsr }
      else
        format.html { render :new }
        format.json { render json: @marker_cadsr.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /marker_cadsrs/1
  # PATCH/PUT /marker_cadsrs/1.json
  def update
    respond_to do |format|
      if @marker_cadsr.update(marker_cadsr_params)
        format.html { redirect_to @marker_cadsr, notice: 'Marker cadsr was successfully updated.' }
        format.json { render :show, status: :ok, location: @marker_cadsr }
      else
        format.html { render :edit }
        format.json { render json: @marker_cadsr.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /marker_cadsrs/1
  # DELETE /marker_cadsrs/1.json
  def destroy
    @marker_cadsr.destroy
    respond_to do |format|
      format.html { redirect_to marker_cadsrs_url, notice: 'Marker cadsr was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_marker_cadsr
      @marker_cadsr = MarkerCadsr.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def marker_cadsr_params
      params.require(:marker_cadsr).permit(:name, :meaning, :description, :cadsr_id, :source_status_id, :nv_term_identifier, :pv_name)
    end
end
