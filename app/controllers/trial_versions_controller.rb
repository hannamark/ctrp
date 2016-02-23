class TrialVersionsController < ApplicationController

#before_action :set_version, only: [:show,  :update, :destroy]

def diff
end

# GET /versions
# GET /versions.json
def index
  #@data_tables = ActiveRecord::Base.connection.tables
  #@model_options = @data_tables.map{|u| [ u ] }
  #@data_tables =TrialVersion.find_by_sql("select distinct item_type from trial_versions");
  #print @data_tables
  #@trial_versions = TrialVersion.find_by_sql("select distinct item_id,item_type from trial_versions order by item_type");
  @trial_versions = TrialVersion.all
  #respond_to do |format|
    #if @trial.save
      #format.html { redirect_to @versions, notice: 'Trial was successfully created.' }
     # format.json { render :show, status: :created, location: @versions }
    #else
     # format.html { render :new }
      #format.json { render json: @trial.errors, status: :unprocessable_entity }
    #end
end

# GET /versions/1
# GET /versions/1.json
def show
end

# DELETE /versions/1
# DELETE /versions/1.json
def destroy
  @version.destroy
  respond_to do |format|
    format.html { redirect_to versions_url, notice: 'Version was successfully destroyed.' }
    format.json { head :no_content }
  end
end


def history
  p params
  p request.body.read
  @object=Hash.new
  @object =request.body.read
  p @object
  #@trial = Trial.find_by_id(21)
  #p @trial.trial_versions.last.changeset
  #widget.versions.last.changeset


  #@trial_versions =TrialVersion.where("item_type = ? AND item_id = ? ", "Trial",params[:trial_id])
  @trial_versions =TrialVersion.where("item_type = ? AND item_id = ? and created_at BETWEEN ? AND ? ", "Trial",params[:trial_id],params[:start_date],params[:end_date]).order('created_at desc')


end


private
# Use callbacks to share common setup or constraints between actions.
def set_version
 # @version = TrialVersion.find(params[:id])
end

# Never trust parameters from the scary internet, only allow the white list through.
def version_params
  params[:version]
end
end
