class AddSignUpFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :street_address, :text
    add_column :users, :zipcode, :string
    add_column :users, :country, :string
    add_column :users, :state, :string
    add_column :users, :middle_name, :string
    add_column :users, :prs_organization_name, :string
    add_column :users, :receive_email_notifications, :boolean
    add_column :users, :role_requested, :string

    add_column :users, :organization_id, :integer
    add_index :users, :organization_id

    add_column :users, :approved, :boolean, :default => false, :null => false
    add_index  :users, :approved
  end
end
