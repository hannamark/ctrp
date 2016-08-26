class AddStatustoSourceStatuses < ActiveRecord::Migration
  def change
    add_column :source_statuses, :status, :string
  end
end
