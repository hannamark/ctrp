# == Schema Information
#
# Table name: name_aliases
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  organization_id :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#  lock_version    :integer          default(0)
#

require 'test_helper'

class NameAliasTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
