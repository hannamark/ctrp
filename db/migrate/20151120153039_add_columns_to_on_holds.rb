class AddColumnsToOnHolds < ActiveRecord::Migration
  def change
    add_column :onholds, :onhold_reason_code, :string, :limit => 255
    add_column :onholds, :offhold_date, :date
  end
end
