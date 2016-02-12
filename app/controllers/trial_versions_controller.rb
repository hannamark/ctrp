class TrialVersionsController < ApplicationController

before_action :set_version, only: [:show, :edit, :update, :destroy]

def diff
end

# GET /versions
# GET /versions.json
def index
  #@data_tables = ActiveRecord::Base.connection.tables
  #@model_options = @data_tables.map{|u| [ u ] }
  @data_tables =TrialVersion.find_by_sql("select distinct item_type from trial_versions");
  print @data_tables
  @versions = TrialVersion.find_by_sql("select distinct item_id,item_type from trial_versions order by item_type");

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
  @datas =TrialVersion.where("item_type = ? AND item_id = ? ", params[:item_type],params[:item_id])
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
