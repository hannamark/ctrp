class AddExtraFieldsToComments < ActiveRecord::Migration
  def change
    add_column :comments, :model, :string
    add_column :comments, :field, :string
  end
end
