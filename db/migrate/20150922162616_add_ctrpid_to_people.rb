class AddCtrpidToPeople < ActiveRecord::Migration
  def change
    add_column :people, :ctrp_id, :integer
  end
end
