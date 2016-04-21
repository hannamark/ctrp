# == Schema Information
#
# Table name: milestone_wrappers
#
#  id                :integer          not null, primary key
#  milestone_date    :date
#  milestone_id      :integer
#  trial_id          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  submission_id     :integer
#  comment           :text
#  milestone_type_id :integer
#
# Indexes
#
#  index_milestone_wrappers_on_milestone_id       (milestone_id)
#  index_milestone_wrappers_on_milestone_type_id  (milestone_type_id)
#  index_milestone_wrappers_on_submission_id      (submission_id)
#  index_milestone_wrappers_on_trial_id           (trial_id)
#

require 'test_helper'

class MilestoneWrapperTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
