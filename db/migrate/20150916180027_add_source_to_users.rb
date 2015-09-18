class AddSourceToUsers < ActiveRecord::Migration
 def change
    remove_index :users, :column => :organization_id
    remove_column :users, :organization_id, :integer
    change_table :users do |t|
      t.references :organization, index: true
      t.string :source
    end
  end
  add_foreign_key :users, :organizations
end
