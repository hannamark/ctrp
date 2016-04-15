# == Schema Information
#
# Table name: milestone_wrappers
#
#  id             :integer          not null, primary key
#  milestone_date :date
#  milestone_id   :integer
#  trial_id       :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  uuid           :string(255)
#  lock_version   :integer          default(0)
#  submission_id  :integer
#

require 'test_helper'

class MilestoneWrapperTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
