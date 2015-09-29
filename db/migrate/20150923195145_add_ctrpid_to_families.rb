class AddCtrpidToFamilies < ActiveRecord::Migration
  def change
    add_column :families, :ctrp_id, :integer
  end
end
