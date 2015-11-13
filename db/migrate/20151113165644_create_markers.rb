class CreateMarkers < ActiveRecord::Migration
  def change
    create_table :markers do |t|
      t.string :name, :limit => 255
      t.string :record_status, :limit => 255
      t.references :evaluation_type, index: true
      t.references :assay_type, index: true
      t.references :biomarker_use, index: true
      t.references :biomarker_purpose, index: true
      t.references :specimen_type, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :markers, :evaluation_types
    add_foreign_key :markers, :assay_types
    add_foreign_key :markers, :biomarker_uses
    add_foreign_key :markers, :biomarker_purposes
    add_foreign_key :markers, :specimen_types
    add_foreign_key :markers, :trials
  end
end
