class TrialDocumentsController < ApplicationController
  before_action :set_trial_document, only: [:show, :edit, :update, :destroy]

  # GET /trial_documents
  # GET /trial_documents.json
  def index
    @trial_documents = TrialDocument.all
  end

  # GET /trial_documents/1
  # GET /trial_documents/1.json
  def show
  end

  # GET /trial_documents/new
  def new
    @trial_document = TrialDocument.new
  end

  # GET /trial_documents/1/edit
  def edit
  end

  # POST /trial_documents
  # POST /trial_documents.json
  def create
    @trial_document = TrialDocument.new(trial_document_params)

    respond_to do |format|
      if @trial_document.save
        format.html { redirect_to @trial_document, notice: 'Trial document was successfully created.' }
        format.json { render :show, status: :created, location: @trial_document }
      else
        format.html { render :new }
        format.json { render json: @trial_document.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /trial_documents/1
  # PATCH/PUT /trial_documents/1.json
  def update
    respond_to do |format|
      if @trial_document.update(trial_document_params)
        format.html { redirect_to @trial_document, notice: 'Trial document was successfully updated.' }
        format.json { render :show, status: :ok, location: @trial_document }
      else
        format.html { render :edit }
        format.json { render json: @trial_document.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trial_documents/1
  # DELETE /trial_documents/1.json
  def destroy
    @trial_document.destroy
    respond_to do |format|
      format.html { redirect_to trial_documents_url, notice: 'Trial document was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trial_document
      @trial_document = TrialDocument.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trial_document_params
      params.require(:trial_document).permit(:file, :file_name, :document_type, :document_subtype, :added_by_id, :trial_id)
    end
end
