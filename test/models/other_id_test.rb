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
# Indexes
#
#  index_other_ids_on_protocol_id_origin_id  (protocol_id_origin_id)
#  index_other_ids_on_trial_id               (trial_id)
#

require 'test_helper'

class OtherIdTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
