# == Schema Information
#
# Table name: collaborators
#
#  id              :integer          not null, primary key
#  org_name        :string
#  organization_id :integer
#  trial_id        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#  lock_version    :integer          default(0)
#

require 'test_helper'

class CollaboratorTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
