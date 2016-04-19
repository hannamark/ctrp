# == Schema Information
#
# Table name: other_ids
#
#  id                    :integer          not null, primary key
#  protocol_id           :string(255)
#  protocol_id_origin_id :integer
#  trial_id              :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  uuid                  :string(255)
#  lock_version          :integer          default(0)
#

require 'test_helper'

class OtherIdTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
