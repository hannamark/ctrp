class CreateProtocolIdOrigins < ActiveRecord::Migration
  def change
    create_table :protocol_id_origins do |t|

      t.static_member_base_columns
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
