class CreateTrialStatusWrappers < ActiveRecord::Migration
  def change
    create_table :trial_status_wrappers do |t|
      t.date :status_date
      t.text :why_stopped
      t.references :trial_status, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trial_status_wrappers, :trial_statuses
    add_foreign_key :trial_status_wrappers, :trials
  end
end
