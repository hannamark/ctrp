class CreateNameAliases < ActiveRecord::Migration
  def change
    create_table :name_aliases do |t|
      t.string :name, :limit => 255
      t.references :organization, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :name_aliases, :organizations
  end
end
