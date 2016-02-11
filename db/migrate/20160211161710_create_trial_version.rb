class CreateTrialVersion < ActiveRecord::Migration
  def change
    create_table :trial_versions do |t|
      t.string   :item_type,      null: false
      t.integer  :item_id,        null: false
      t.string   :event,          null: false
      t.string   :whodunnit
      t.json     :object
      t.datetime :created_at
      t.integer  :transaction_id
    end
  end
end
