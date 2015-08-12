class CreatePhases < ActiveRecord::Migration
  def change
    create_table :phases do |t|

      t.static_member_base_columns
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
