class MarkerSynonymsController < ApplicationController
  before_action :set_marker_synonym, only: [:show, :edit, :update, :destroy]

  # GET /marker_synonyms
  # GET /marker_synonyms.json
  def index
    @marker_synonyms = MarkerSynonym.all
  end

  # GET /marker_synonyms/1
  # GET /marker_synonyms/1.json
  def show
  end

  # GET /marker_synonyms/new
  def new
    @marker_synonym = MarkerSynonym.new
  end

  # GET /marker_synonyms/1/edit
  def edit
  end

  # POST /marker_synonyms
  # POST /marker_synonyms.json
  def create
    @marker_synonym = MarkerSynonym.new(marker_synonym_params)

    respond_to do |format|
      if @marker_synonym.save
        format.html { redirect_to @marker_synonym, notice: 'Marker synonym was successfully created.' }
        format.json { render :show, status: :created, location: @marker_synonym }
      else
        format.html { render :new }
        format.json { render json: @marker_synonym.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /marker_synonyms/1
  # PATCH/PUT /marker_synonyms/1.json
  def update
    respond_to do |format|
      if @marker_synonym.update(marker_synonym_params)
        format.html { redirect_to @marker_synonym, notice: 'Marker synonym was successfully updated.' }
        format.json { render :show, status: :ok, location: @marker_synonym }
      else
        format.html { render :edit }
        format.json { render json: @marker_synonym.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /marker_synonyms/1
  # DELETE /marker_synonyms/1.json
  def destroy
    @marker_synonym.destroy
    respond_to do |format|
      format.html { redirect_to marker_synonyms_url, notice: 'Marker synonym was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_marker_synonym
      @marker_synonym = MarkerSynonym.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def marker_synonym_params
      params.require(:marker_synonym).permit(:alternate_name)
    end
end
