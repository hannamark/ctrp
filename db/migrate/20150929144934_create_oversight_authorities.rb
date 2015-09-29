class CreateOversightAuthorities < ActiveRecord::Migration
  def change
    create_table :oversight_authorities do |t|
      t.string :country, :limit => 255
      t.string :organization, :limit => 255
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :oversight_authorities, :trials
  end
end
