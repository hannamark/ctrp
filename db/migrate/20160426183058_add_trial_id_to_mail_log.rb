class AddTrialIdToMailLog < ActiveRecord::Migration
  def change
    add_column :mail_logs, :trial_id, :integer
  end
end
