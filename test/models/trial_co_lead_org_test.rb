# == Schema Information
#
# Table name: trial_co_lead_orgs
#
#  id              :integer          not null, primary key
#  trial_id        :integer
#  organization_id :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#  lock_version    :integer          default(0)
#
# Indexes
#
#  index_trial_co_lead_orgs_on_organization_id  (organization_id)
#  index_trial_co_lead_orgs_on_trial_id         (trial_id)
#

require 'test_helper'

class TrialCoLeadOrgTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
