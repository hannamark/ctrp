class RestControllersController < ApplicationController
  #before_action :set_rest_controller, only: [:show, :edit, :update, :destroy]
  http_basic_authenticate_with name: "ctrpadmin", password: "Welcome02", except: :index

  # GET /rest_controllers
  # GET /rest_controllers.json
  def index
    @rest_controllers = RestController.all
  end

  # GET /rest_controllers/1
  # GET /rest_controllers/1.json
  def show
  end

  # GET /rest_controllers/new
  def new
    @rest_controller = RestController.new
  end

  # GET /rest_controllers/1/edit
  def edit
  end

  # POST /rest_controllers
  # POST /rest_controllers.json
  def create

    #@rest_controller = RestController.new(rest_controller_params)

    @person = Person.new(rest_controller_params)


    respond_to do |format|
      if @person.save
        format.json { render :show, status: :created, location: @person }
      else
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /rest_controllers/1
  # PATCH/PUT /rest_controllers/1.json
  def update
    respond_to do |format|
      if @rest_controller.update(rest_controller_params)
        format.html { redirect_to @rest_controller, notice: 'Rest controller was successfully updated.' }
        format.json { render :show, status: :ok, location: @rest_controller }
      else
        format.html { render :edit }
        format.json { render json: @rest_controller.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /rest_controllers/1
  # DELETE /rest_controllers/1.json
  def destroy
    @rest_controller.destroy
    respond_to do |format|
      format.html { redirect_to rest_controllers_url, notice: 'Rest controller was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rest_controller
      @rest_controller = RestController.find(params[:id])
    end

  # Never trust parameters from the scary internet, only allow the white list through.
  def rest_controller_params
    params.permit(:source_id, :fname, :mname, :lname, :suffix,:prefix, :email, :phone,
                                   :source_status_id,:source_context_id, :lock_version,
                                   po_affiliations_attributes: [:id, :organization_id, :effective_date,
                                                                :expiration_date, :po_affiliation_status_id,
                                                                :lock_version, :_destroy])
  end


end
