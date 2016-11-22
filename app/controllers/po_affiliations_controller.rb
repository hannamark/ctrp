class PoAffiliationsController < ApplicationController
  before_action :set_po_affiliation, only: [:show, :edit, :update, :destroy]

  # GET /po_affiliations
  # GET /po_affiliations.json
  def index
    @po_affiliations = PoAffiliation.all
  end

  # GET /po_affiliations/1
  # GET /po_affiliations/1.json
  def show
  end

  # GET /po_affiliations/new
  def new
    @po_affiliation = PoAffiliation.new
  end

  # GET /po_affiliations/1/edit
  def edit
  end

  # POST /po_affiliations
  # POST /po_affiliations.json
  def create
    @po_affiliation = PoAffiliation.new(po_affiliation_params)

    respond_to do |format|
      if @po_affiliation.save
        format.html { redirect_to @po_affiliation, notice: 'Po affiliation was successfully created.' }
        format.json { render :show, status: :created, location: @po_affiliation }
      else
        format.html { render :new }
        format.json { render json: @po_affiliation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /po_affiliations/1
  # PATCH/PUT /po_affiliations/1.json
  def update
    respond_to do |format|
      if @po_affiliation.update(po_affiliation_params)
        format.html { redirect_to @po_affiliation, notice: 'Po affiliation was successfully updated.' }
        format.json { render :show, status: :ok, location: @po_affiliation }
      else
        format.html { render :edit }
        format.json { render json: @po_affiliation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /po_affiliations/1
  # DELETE /po_affiliations/1.json
  def destroy
    @po_affiliation.destroy
    respond_to do |format|
      format.html { redirect_to po_affiliations_url, notice: 'Po affiliation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_po_affiliation
      @po_affiliation = PoAffiliation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def po_affiliation_params
      params[:po_affiliation]
      params.require(:po_affiliation).permit(:person_id, :organization_id, :po_affiliation_status_id, :effective_date, :expiration_date)
    end
end
