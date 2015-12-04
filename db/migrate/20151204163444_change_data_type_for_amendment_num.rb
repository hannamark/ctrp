class ChangeDataTypeForAmendmentNum < ActiveRecord::Migration
  def change
    remove_column :submissions, :amendment_num, :integer
    add_column :submissions, :amendment_num, :string, :limit => 255
  end
end
