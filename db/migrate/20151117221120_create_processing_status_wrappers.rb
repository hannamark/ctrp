class CreateProcessingStatusWrappers < ActiveRecord::Migration
  def change
    create_table :processing_status_wrappers do |t|
      t.date :status_date
      t.references :processing_status, index: true
      t.references :trial, index: true

      t.timestamps null: false
    end
    add_foreign_key :processing_status_wrappers, :processing_statuses
    add_foreign_key :processing_status_wrappers, :trials
  end
end
