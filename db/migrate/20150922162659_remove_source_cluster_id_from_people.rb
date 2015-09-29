class RemoveSourceClusterIdFromPeople < ActiveRecord::Migration
  def down
    add_column :people, :source_cluster_id, :integer
    add_foreign_key "people", "source_clusters", column: "source_cluster_id"
  end
  def up
    remove_foreign_key :people, column: :source_cluster_id
    remove_column :people, :source_cluster_id, :integer
  end
end