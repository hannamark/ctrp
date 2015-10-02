# == Schema Information
#
# Table name: organizations
#
#  id                :integer          not null, primary key
#  source_id         :string(255)
#  name              :string(255)
#  address           :string(255)
#  address2          :string(255)
#  city              :string(255)
#  state_province    :string(255)
#  postal_code       :string(255)
#  country           :string(255)
#  email             :string(255)
#  phone             :string(255)
#  fax               :string(255)
#  source_status_id  :integer
#  source_context_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  ctrp_id           :integer
#  created_by        :string
#  updated_by        :string
#
# Indexes
#
#  index_organizations_on_source_context_id  (source_context_id)
#  index_organizations_on_source_status_id   (source_status_id)
#

require 'test_helper'

class OrganizationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
