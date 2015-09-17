class AddSourceToUsers < ActiveRecord::Migration
  def change
    remove_index :users, :organization_id
    remove_column :users, :organization_id
    change_table :users do |t|
      t.references :organization, index: true
      t.string :source
      end
  end
  add_foreign_key :users, :organizations
end
