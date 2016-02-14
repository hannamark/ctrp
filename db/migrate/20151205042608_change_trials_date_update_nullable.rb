class ChangeTrialsDateUpdateNullable < ActiveRecord::Migration
  def change
    change_column :trials, :updated_at, :timestamp, :null => true
  end
end
