# == Schema Information
#
# Table name: family_types
#
#  id         :integer          not null, primary key
#  code       :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#

require 'test_helper'

class FamilyTypeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
