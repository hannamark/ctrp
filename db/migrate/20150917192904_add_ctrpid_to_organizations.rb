class AddCtrpidToOrganizations < ActiveRecord::Migration
  def change
    add_column :organizations, :ctrp_id, :integer
  end
end
