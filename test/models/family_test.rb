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
#  ctrp_id          :integer
#  lock_version     :integer          default(0)
#
# Indexes
#
#  index_families_on_family_status_id  (family_status_id)
#  index_families_on_family_type_id    (family_type_id)
#

require 'test_helper'

class FamilyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
