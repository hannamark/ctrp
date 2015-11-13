class CreateOtherCriteria < ActiveRecord::Migration
  def change
    create_table :other_criteria do |t|
      t.string :criteria_type, :limit => 255
      t.string :criteria_desc, :limit => 255
      t.text :criteria_name
      t.string :operator, :limit => 255
      t.string :value, :limit => 255
      t.string :unit, :limit => 255
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :other_criteria, :trials
  end
end
