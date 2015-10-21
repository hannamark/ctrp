# == Schema Information
#
# Table name: grants
#
#  id                :integer          not null, primary key
#  funding_mechanism :string(255)
#  institute_code    :string(255)
#  nci               :string(255)
#  trial_id          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  serial_number     :string(255)
#
# Indexes
#
#  index_grants_on_trial_id  (trial_id)
#

require 'test_helper'

class GrantTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
