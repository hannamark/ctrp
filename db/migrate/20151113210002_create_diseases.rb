class CreateDiseases < ActiveRecord::Migration
  def change
    create_table :diseases do |t|
      t.string :preferred_name, :limit => 255
      t.string :code, :limit => 255
      t.string :thesaurus_id, :limit => 255
      t.string :display_name, :limit => 255
      t.string :parent_preferred, :limit => 255
      t.string :in_xml, :limit => 255
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :diseases, :trials
  end
end
