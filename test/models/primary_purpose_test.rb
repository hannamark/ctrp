# == Schema Information
#
# Table name: primary_purposes
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  name         :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

require 'test_helper'

class PrimaryPurposeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
