# == Schema Information
#
# Table name: participating_sites
#
#  id                     :integer          not null, primary key
#  protocol_id            :string(255)
#  program_code           :string(255)
#  contact_name           :string(255)
#  contact_phone          :string(255)
#  contact_email          :string(255)
#  trial_id               :integer
#  organization_id        :integer
#  person_id              :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  uuid                   :string(255)
#  lock_version           :integer          default(0)
#  extension              :string(255)
#  contact_type           :string(255)
#  local_trial_identifier :string
#

require 'test_helper'

class ParticipatingSiteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
