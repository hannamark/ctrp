class CreateFamilies < ActiveRecord::Migration
  def change
    create_table :families do |t|
      t.string :name, :limit => 255
      t.text :description
      t.references :family_status, index: true
      t.references :family_type, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :families, :family_statuses
    add_foreign_key :families, :family_types
  end
end
