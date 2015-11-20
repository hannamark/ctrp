class CreateCitations < ActiveRecord::Migration
  def change
    create_table :citations do |t|
      t.string :pub_med_id, :limit => 255
      t.text :description
      t.string :results_reference, :limit => 255
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :citations, :trials
  end
end
