class CreateAppSettings < ActiveRecord::Migration
  def change
    create_table :app_settings do |t|
      t.static_member_base_columns
      t.text :description
      t.string :value, :limit => 255
      t.text :big_value

      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
