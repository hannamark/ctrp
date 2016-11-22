class RemoveSourceClusterIdFromOrganizations < ActiveRecord::Migration
  def down
    add_column :organizations, :source_cluster_id, :integer
    add_foreign_key "organizations", "source_clusters", column: "source_cluster_id"
  end
 def up
   remove_foreign_key :organizations, column: :source_cluster_id
   remove_column :organizations, :source_cluster_id, :integer
 end

end
