# == Schema Information
#
# Table name: onholds
#
#  id               :integer          not null, primary key
#  onhold_desc      :text
#  onhold_date      :date
#  onhold_reason_id :integer
#  trial_id         :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#
# Indexes
#
#  index_onholds_on_onhold_reason_id  (onhold_reason_id)
#  index_onholds_on_trial_id          (trial_id)
#

require 'test_helper'

class OnholdTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
