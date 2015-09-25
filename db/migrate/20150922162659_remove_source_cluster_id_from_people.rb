class RemoveSourceClusterIdFromPeople < ActiveRecord::Migration
  def change
    remove_column :people, :source_cluster_id, :integer
  end
end
