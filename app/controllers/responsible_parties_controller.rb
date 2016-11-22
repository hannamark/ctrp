class ResponsiblePartiesController < ApplicationController
  before_action :set_responsible_party, only: [:show, :edit, :update, :destroy]

  # GET /responsible_parties
  # GET /responsible_parties.json
  def index
    @responsible_parties = ResponsibleParty.all
  end

  # GET /responsible_parties/1
  # GET /responsible_parties/1.json
  def show
  end

  # GET /responsible_parties/new
  def new
    @responsible_party = ResponsibleParty.new
  end

  # GET /responsible_parties/1/edit
  def edit
  end

  # POST /responsible_parties
  # POST /responsible_parties.json
  def create
    @responsible_party = ResponsibleParty.new(responsible_party_params)

    respond_to do |format|
      if @responsible_party.save
        format.html { redirect_to @responsible_party, notice: 'Responsible party was successfully created.' }
        format.json { render :show, status: :created, location: @responsible_party }
      else
        format.html { render :new }
        format.json { render json: @responsible_party.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /responsible_parties/1
  # PATCH/PUT /responsible_parties/1.json
  def update
    respond_to do |format|
      if @responsible_party.update(responsible_party_params)
        format.html { redirect_to @responsible_party, notice: 'Responsible party was successfully updated.' }
        format.json { render :show, status: :ok, location: @responsible_party }
      else
        format.html { render :edit }
        format.json { render json: @responsible_party.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /responsible_parties/1
  # DELETE /responsible_parties/1.json
  def destroy
    @responsible_party.destroy
    respond_to do |format|
      format.html { redirect_to responsible_parties_url, notice: 'Responsible party was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_responsible_party
      @responsible_party = ResponsibleParty.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def responsible_party_params
      params.require(:responsible_party).permit(:code, :name)
    end
end
