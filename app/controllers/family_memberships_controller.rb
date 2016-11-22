class FamilyMembershipsController < ApplicationController
  before_action :set_family_membership, only: [:show, :edit, :update, :destroy]
  ## Please comment the next two lines if you donot want the Authorization checks
  before_filter :wrapper_authenticate_user unless Rails.env.test?
  load_and_authorize_resource unless Rails.env.test?

  # GET /family_memberships
  # GET /family_memberships.json
  def index
    @family_memberships = FamilyMembership.all
  end

  # GET /family_memberships/1
  # GET /family_memberships/1.json
  def show
  end

  # GET /family_memberships/new
  def new
    @family_membership = FamilyMembership.new
  end

  # GET /family_memberships/1/edit
  def edit
  end

  # POST /family_memberships
  # POST /family_memberships.json
  def create
    @family_membership = FamilyMembership.new(family_membership_params)

    respond_to do |format|
      if @family_membership.save
        format.html { redirect_to @family_membership, notice: 'Family membership was successfully created.' }
        format.json { render :show, status: :created, location: @family_membership }
      else
        format.html { render :new }
        format.json { render json: @family_membership.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /family_memberships/1
  # PATCH/PUT /family_memberships/1.json
  def update
    respond_to do |format|
      if @family_membership.update(family_membership_params)
        format.html { redirect_to @family_membership, notice: 'Family membership was successfully updated.' }
        format.json { render :show, status: :ok, location: @family_membership }
      else
        format.html { render :edit }
        format.json { render json: @family_membership.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /family_memberships/1
  # DELETE /family_memberships/1.json
  def destroy
    @family_membership.destroy
    respond_to do |format|
      format.html { redirect_to family_memberships_url, notice: 'Family membership was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_family_membership
      @family_membership = FamilyMembership.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def family_membership_params
      params.require(:family_membership).permit(:family_id, :organization_id, :family_relationship_id, :effective_date, :expiration_date)
    end
end
