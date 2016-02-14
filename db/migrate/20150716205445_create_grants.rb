class CreateGrants < ActiveRecord::Migration
  def change
    create_table :grants do |t|
      t.string :funding_mechanism, :limit => 255
      t.string :institute_code, :limit => 255
      t.integer :serial_number
      t.string :nci, :limit => 255
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :grants, :trials
  end
end
