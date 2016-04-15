# == Schema Information
#
# Table name: families
#
#  id               :integer          not null, primary key
#  name             :string(255)
#  family_status_id :integer
#  family_type_id   :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#  ctrp_id          :integer
#

require 'test_helper'

class FamilyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
