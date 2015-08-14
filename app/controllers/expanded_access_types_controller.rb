class ExpandedAccessTypesController < ApplicationController
  before_action :set_expanded_access_type, only: [:show, :edit, :update, :destroy]

  # GET /expanded_access_types
  # GET /expanded_access_types.json
  def index
    @expanded_access_types = ExpandedAccessType.all
  end

  # GET /expanded_access_types/1
  # GET /expanded_access_types/1.json
  def show
  end

  # GET /expanded_access_types/new
  def new
    @expanded_access_type = ExpandedAccessType.new
  end

  # GET /expanded_access_types/1/edit
  def edit
  end

  # POST /expanded_access_types
  # POST /expanded_access_types.json
  def create
    @expanded_access_type = ExpandedAccessType.new(expanded_access_type_params)

    respond_to do |format|
      if @expanded_access_type.save
        format.html { redirect_to @expanded_access_type, notice: 'Expanded access type was successfully created.' }
        format.json { render :show, status: :created, location: @expanded_access_type }
      else
        format.html { render :new }
        format.json { render json: @expanded_access_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /expanded_access_types/1
  # PATCH/PUT /expanded_access_types/1.json
  def update
    respond_to do |format|
      if @expanded_access_type.update(expanded_access_type_params)
        format.html { redirect_to @expanded_access_type, notice: 'Expanded access type was successfully updated.' }
        format.json { render :show, status: :ok, location: @expanded_access_type }
      else
        format.html { render :edit }
        format.json { render json: @expanded_access_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /expanded_access_types/1
  # DELETE /expanded_access_types/1.json
  def destroy
    @expanded_access_type.destroy
    respond_to do |format|
      format.html { redirect_to expanded_access_types_url, notice: 'Expanded access type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expanded_access_type
      @expanded_access_type = ExpandedAccessType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def expanded_access_type_params
      params.require(:expanded_access_type).permit(:code, :name)
    end
end
