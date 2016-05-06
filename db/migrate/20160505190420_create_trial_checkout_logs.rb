class CreateTrialCheckoutLogs < ActiveRecord::Migration
  def change
    create_table :trial_checkout_logs do |t|
      t.integer :trial_id
      t.string :type
      t.string :category
      t.string :username
      t.string :full_name

      t.timestamps null: false
    end
  end
end
