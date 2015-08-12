class CreateOtherIds < ActiveRecord::Migration
  def change
    create_table :other_ids do |t|
      t.string :protocol_id, :limit => 255
      t.references :protocol_id_origin, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :other_ids, :protocol_id_origins
    add_foreign_key :other_ids, :trials
  end
end
