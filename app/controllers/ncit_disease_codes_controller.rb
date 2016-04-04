class NcitDiseaseCodesController < ApplicationController
  before_action :set_ncit_disease_code, only: [:show, :edit, :update, :destroy]

  # GET /ncit_disease_codes
  # GET /ncit_disease_codes.json
  def index
    @ncit_disease_codes = NcitDiseaseCode.all
  end

  # GET /ncit_disease_codes/1
  # GET /ncit_disease_codes/1.json
  def show
  end

  # GET /ncit_disease_codes/new
  def new
    @ncit_disease_code = NcitDiseaseCode.new
  end

  # GET /ncit_disease_codes/1/edit
  def edit
  end

  # POST /ncit_disease_codes
  # POST /ncit_disease_codes.json
  def create
    @ncit_disease_code = NcitDiseaseCode.new(ncit_disease_code_params)

    respond_to do |format|
      if @ncit_disease_code.save
        format.html { redirect_to @ncit_disease_code, notice: 'Ncit disease code was successfully created.' }
        format.json { render :show, status: :created, location: @ncit_disease_code }
      else
        format.html { render :new }
        format.json { render json: @ncit_disease_code.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ncit_disease_codes/1
  # PATCH/PUT /ncit_disease_codes/1.json
  def update
    respond_to do |format|
      if @ncit_disease_code.update(ncit_disease_code_params)
        format.html { redirect_to @ncit_disease_code, notice: 'Ncit disease code was successfully updated.' }
        format.json { render :show, status: :ok, location: @ncit_disease_code }
      else
        format.html { render :edit }
        format.json { render json: @ncit_disease_code.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ncit_disease_codes/1
  # DELETE /ncit_disease_codes/1.json
  def destroy
    @ncit_disease_code.destroy
    respond_to do |format|
      format.html { redirect_to ncit_disease_codes_url, notice: 'Ncit disease code was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_tree
    root_node = NcitDiseaseCode.first
    while root_node.parents.length > 0 do
      root_node = root_node.parents.first
    end

    #@ncit_tree = build_tree(root_node)
    @ncit_tree = {id: root_node.id, nt_term_id: root_node.nt_term_id, label: root_node.menu_display_name, children: []}
    root_node.children.each do |child|
      @ncit_tree[:children].append({id: child.id, nt_term_id: child.nt_term_id, label: child.menu_display_name})
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ncit_disease_code
      @ncit_disease_code = NcitDiseaseCode.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ncit_disease_code_params
      params.require(:ncit_disease_code).permit(:disease_code, :nt_term_id, :preferred_name, :menu_display_name)
    end

  def build_tree(root_node)
    tree = {id: root_node.id, nt_term_id: root_node.nt_term_id, label: root_node.menu_display_name, children: []}
    queue = Queue.new
    queue.push(tree)

    while !queue.empty? do
      current_node = queue.pop
      current_instance = NcitDiseaseCode.find(current_node[:id])
      current_instance.children.each do |child|
        child_node = {id: child.id, nt_term_id: child.nt_term_id, label: child.menu_display_name, children: []}
        current_node[:children].append(child_node)
        queue.push(child_node)
      end
    end

    return tree
  end
end
