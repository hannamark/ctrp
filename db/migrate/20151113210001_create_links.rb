class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.text :url
      t.text :description
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :links, :trials
  end
end
