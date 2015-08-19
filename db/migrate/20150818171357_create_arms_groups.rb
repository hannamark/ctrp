class CreateArmsGroups < ActiveRecord::Migration
  def change
    create_table :arms_groups do |t|
      t.string :label, :limit => 255
      t.string :type, :limit => 255
      t.text :description
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :interventions, :trials
  end
end
