class AddCreatedByUpdatedByToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :created_by, :string
    add_column :organizations, :updated_by, :string
  end
end
