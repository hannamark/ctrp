class CreateCadsrMarkerStatuses < ActiveRecord::Migration
  def change
    create_table :cadsr_marker_statuses do |t|
      t.string :code
      t.string :name

      t.timestamps null: false
    end
  end
end
