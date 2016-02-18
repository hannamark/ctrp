class ChangeIndideDatesNullable < ActiveRecord::Migration
  def up
    change_column :grants, :created_at, :timestamp, :null => true
    change_column :grants, :updated_at, :timestamp, :null => true
  end
  def down
    change_column :grants, :created_at, :timestamp, :null => false
    change_column :grants, :updated_at, :timestamp, :null => false
  end
end


