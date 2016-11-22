class AddExtensionColumns < ActiveRecord::Migration
  def change
    add_column :organizations, :extension, :string, :limit => 255
    add_column :people, :extension, :string, :limit => 255
  end
end
