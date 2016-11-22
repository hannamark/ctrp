class AccrualDiseaseTermsController < ApplicationController
  before_action :set_accrual_disease_term, only: [:show, :edit, :update, :destroy]

  # GET /accrual_disease_terms
  # GET /accrual_disease_terms.json
  def index
    @accrual_disease_terms = AccrualDiseaseTerm.all
  end

  # GET /accrual_disease_terms/1
  # GET /accrual_disease_terms/1.json
  def show
  end

  # GET /accrual_disease_terms/new
  def new
    @accrual_disease_term = AccrualDiseaseTerm.new
  end

  # GET /accrual_disease_terms/1/edit
  def edit
  end

  # POST /accrual_disease_terms
  # POST /accrual_disease_terms.json
  def create
    @accrual_disease_term = AccrualDiseaseTerm.new(accrual_disease_term_params)

    respond_to do |format|
      if @accrual_disease_term.save
        format.html { redirect_to @accrual_disease_term, notice: 'Accrual disease term was successfully created.' }
        format.json { render :show, status: :created, location: @accrual_disease_term }
      else
        format.html { render :new }
        format.json { render json: @accrual_disease_term.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /accrual_disease_terms/1
  # PATCH/PUT /accrual_disease_terms/1.json
  def update
    respond_to do |format|
      if @accrual_disease_term.update(accrual_disease_term_params)
        format.html { redirect_to @accrual_disease_term, notice: 'Accrual disease term was successfully updated.' }
        format.json { render :show, status: :ok, location: @accrual_disease_term }
      else
        format.html { render :edit }
        format.json { render json: @accrual_disease_term.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /accrual_disease_terms/1
  # DELETE /accrual_disease_terms/1.json
  def destroy
    @accrual_disease_term.destroy
    respond_to do |format|
      format.html { redirect_to accrual_disease_terms_url, notice: 'Accrual disease term was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_accrual_disease_term
      @accrual_disease_term = AccrualDiseaseTerm.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def accrual_disease_term_params
      params[:accrual_disease_term]
    end
end
