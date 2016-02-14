class CreateIndIdes < ActiveRecord::Migration
  def change
    create_table :ind_ides do |t|
      t.string :type, :limit => 255
      t.integer :number
      t.string :grantor, :limit => 255
      t.string :nih_nci, :limit => 255
      t.string :expanded_access, :limit => 255
      t.string :exempt, :limit => 255
      t.references :holder_type, index: true
      t.references :expanded_access_type, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :ind_ides, :holder_types
    add_foreign_key :ind_ides, :expanded_access_types
    add_foreign_key :ind_ides, :trials
  end
end
