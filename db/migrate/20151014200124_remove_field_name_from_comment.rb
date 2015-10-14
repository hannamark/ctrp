class RemoveFieldNameFromComment < ActiveRecord::Migration
  def change
    remove_column :comments, :org, :string
  end
end
