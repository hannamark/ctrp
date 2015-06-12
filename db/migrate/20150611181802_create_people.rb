class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.bigint :person_id
      t.string :source_id, :limit => 255
      t.string :name, :limit => 255
      t.string :prefix, :limit => 255
      t.string :suffix, :limit => 255
      t.date :status_date
      t.string :email, :limit => 255
      t.string :phone, :limit => 255
      t.references :source_status, index: true
      t.references :source_context, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :people, :source_statuses
    add_foreign_key :people, :source_contexts
  end
end
