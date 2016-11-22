class AddCommentToTrialStatusWrappers < ActiveRecord::Migration
  def change
    add_column :trial_status_wrappers, :comment, :text
  end
end
