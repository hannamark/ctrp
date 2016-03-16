class CreateMarkerCadsrs < ActiveRecord::Migration
  def change
    create_table :marker_cadsrs do |t|
      t.string :name ,:limit=>2000
      t.string :meaning,:limit=>2000
      t.text :description
      t.integer :cadsr_id
      t.string :nv_term_identifier,:limit=>200
      t.string :pv_name,:limit=>2000

      t.references :source_status, index: true
      t.timestamps null: false
    end
    add_foreign_key :marker_cadsrs, :source_statuses
  end
end
