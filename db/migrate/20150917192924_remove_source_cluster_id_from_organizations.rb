class RemoveSourceClusterIdFromOrganizations < ActiveRecord::Migration
  def change
    remove_column :organizations, :source_cluster_id, :integer
  end
end
