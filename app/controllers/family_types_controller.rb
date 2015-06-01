class FamilyTypesController < ApplicationController
  before_action :set_family_type, only: [:show, :edit, :update, :destroy]

  # GET /family_types
  # GET /family_types.json
  def index
    @family_types = FamilyType.all
  end

  # GET /family_types/1
  # GET /family_types/1.json
  def show
  end

  # GET /family_types/new
  def new
    @family_type = FamilyType.new
  end

  # GET /family_types/1/edit
  def edit
  end

  # POST /family_types
  # POST /family_types.json
  def create
    @family_type = FamilyType.new(family_type_params)

    respond_to do |format|
      if @family_type.save
        format.html { redirect_to @family_type, notice: 'Family type was successfully created.' }
        format.json { render :show, status: :created, location: @family_type }
      else
        format.html { render :new }
        format.json { render json: @family_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /family_types/1
  # PATCH/PUT /family_types/1.json
  def update
    respond_to do |format|
      if @family_type.update(family_type_params)
        format.html { redirect_to @family_type, notice: 'Family type was successfully updated.' }
        format.json { render :show, status: :ok, location: @family_type }
      else
        format.html { render :edit }
        format.json { render json: @family_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /family_types/1
  # DELETE /family_types/1.json
  def destroy
    @family_type.destroy
    respond_to do |format|
      format.html { redirect_to family_types_url, notice: 'Family type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_family_type
      @family_type = FamilyType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def family_type_params
      params.require(:family_type).permit(:code, :name)
    end
end
