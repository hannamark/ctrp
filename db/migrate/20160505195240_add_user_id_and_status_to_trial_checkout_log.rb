class AddUserIdAndStatusToTrialCheckoutLog < ActiveRecord::Migration
  def change
    add_column :trial_checkout_logs, :user_id, :integer
    add_column :trial_checkout_logs, :result, :string
  end
end
