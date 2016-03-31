class NcitDiseaseCodesController < ApplicationController
  before_action :set_ncit_disease_code, only: [:show, :edit, :update, :destroy]

  # GET /ncit_disease_codes
  # GET /ncit_disease_codes.json
  def index
    @ncit_disease_codes = NcitDiseaseCode.all
  end

  # GET /ncit_disease_codes/1
  # GET /ncit_disease_codes/1.json
  def show
  end

  # GET /ncit_disease_codes/new
  def new
    @ncit_disease_code = NcitDiseaseCode.new
  end

  # GET /ncit_disease_codes/1/edit
  def edit
  end

  # POST /ncit_disease_codes
  # POST /ncit_disease_codes.json
  def create
    @ncit_disease_code = NcitDiseaseCode.new(ncit_disease_code_params)

    respond_to do |format|
      if @ncit_disease_code.save
        format.html { redirect_to @ncit_disease_code, notice: 'Ncit disease code was successfully created.' }
        format.json { render :show, status: :created, location: @ncit_disease_code }
      else
        format.html { render :new }
        format.json { render json: @ncit_disease_code.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ncit_disease_codes/1
  # PATCH/PUT /ncit_disease_codes/1.json
  def update
    respond_to do |format|
      if @ncit_disease_code.update(ncit_disease_code_params)
        format.html { redirect_to @ncit_disease_code, notice: 'Ncit disease code was successfully updated.' }
        format.json { render :show, status: :ok, location: @ncit_disease_code }
      else
        format.html { render :edit }
        format.json { render json: @ncit_disease_code.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ncit_disease_codes/1
  # DELETE /ncit_disease_codes/1.json
  def destroy
    @ncit_disease_code.destroy
    respond_to do |format|
      format.html { redirect_to ncit_disease_codes_url, notice: 'Ncit disease code was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ncit_disease_code
      @ncit_disease_code = NcitDiseaseCode.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ncit_disease_code_params
      params.require(:ncit_disease_code).permit(:disease_code, :nt_term_id, :preferred_name, :menu_display_name)
    end
end
