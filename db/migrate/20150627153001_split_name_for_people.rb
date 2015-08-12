class SplitNameForPeople < ActiveRecord::Migration
  def change
    remove_column :people, :name, :string
    add_column :people, :fname, :string, :limit => 255
    add_column :people, :mname, :string, :limit => 255
    add_column :people, :lname, :string, :limit => 255
  end
end
