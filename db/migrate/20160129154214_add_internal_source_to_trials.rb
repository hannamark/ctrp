class AddInternalSourceToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :internal_source, :string, :limit => 255
  end
end
