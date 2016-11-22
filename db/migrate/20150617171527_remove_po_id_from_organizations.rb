class RemovePoIdFromOrganizations < ActiveRecord::Migration
  def change
    remove_column :organizations, :po_id, :bigint
  end
end
