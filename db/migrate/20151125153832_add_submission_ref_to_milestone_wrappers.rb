class AddSubmissionRefToMilestoneWrappers < ActiveRecord::Migration
  def change
    add_reference :milestone_wrappers, :submission, index: true
    add_foreign_key :milestone_wrappers, :submissions
  end
end
