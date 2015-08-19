class CreateRepDataSetMethods < ActiveRecord::Migration
  def change
    create_table :rep_data_set_methods do |t|

      t.static_member_base_columns
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
