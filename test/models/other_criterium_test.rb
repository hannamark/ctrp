# == Schema Information
#
# Table name: other_criteria
#
#  id            :integer          not null, primary key
#  criteria_type :string(255)
#  criteria_desc :string(255)
#  criteria_name :text
#  operator      :string(255)
#  value         :string(255)
#  unit          :string(255)
#  trial_id      :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  uuid          :string(255)
#  lock_version  :integer          default(0)
#
# Indexes
#
#  index_other_criteria_on_trial_id  (trial_id)
#

require 'test_helper'

class OtherCriteriumTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
