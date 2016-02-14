class CreateSourceClusters < ActiveRecord::Migration
  def change
    create_table :source_clusters do |t|
      t.string :name, :limit => 255

      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
