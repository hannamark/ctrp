class FamilyRelationshipsController < ApplicationController
  before_action :set_family_relationship, only: [:show, :edit, :update, :destroy]

  # GET /family_relationships
  # GET /family_relationships.json
  def index
    @family_relationships = FamilyRelationship.all
  end

  # GET /family_relationships/1
  # GET /family_relationships/1.json
  def show
  end

  # GET /family_relationships/new
  def new
    @family_relationship = FamilyRelationship.new
  end

  # GET /family_relationships/1/edit
  def edit
  end

  # POST /family_relationships
  # POST /family_relationships.json
  def create
    @family_relationship = FamilyRelationship.new(family_relationship_params)

    respond_to do |format|
      if @family_relationship.save
        format.html { redirect_to @family_relationship, notice: 'Family relationship was successfully created.' }
        format.json { render :show, status: :created, location: @family_relationship }
      else
        format.html { render :new }
        format.json { render json: @family_relationship.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /family_relationships/1
  # PATCH/PUT /family_relationships/1.json
  def update
    respond_to do |format|
      if @family_relationship.update(family_relationship_params)
        format.html { redirect_to @family_relationship, notice: 'Family relationship was successfully updated.' }
        format.json { render :show, status: :ok, location: @family_relationship }
      else
        format.html { render :edit }
        format.json { render json: @family_relationship.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /family_relationships/1
  # DELETE /family_relationships/1.json
  def destroy
    @family_relationship.destroy
    respond_to do |format|
      format.html { redirect_to family_relationships_url, notice: 'Family relationship was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_family_relationship
      @family_relationship = FamilyRelationship.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def family_relationship_params
      params.require(:family_relationship).permit(:code, :name)
    end
end
