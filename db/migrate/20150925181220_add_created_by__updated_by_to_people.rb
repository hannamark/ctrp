class AddCreatedByUpdatedByToPeople < ActiveRecord::Migration
  def change
    add_column :people, :created_by, :string
    add_column :people, :updated_by, :string
  end
end
