# == Schema Information
#
# Table name: participating_sites
#
#  id                         :integer          not null, primary key
#  protocol_id                :string(255)
#  status_date                :date
#  program_code               :string(255)
#  trial_id                   :integer
#  organization_id            :integer
#  person_id                  :integer
#  site_recruitment_status_id :integer
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  uuid                       :string(255)
#
# Indexes
#
#  index_participating_sites_on_organization_id             (organization_id)
#  index_participating_sites_on_person_id                   (person_id)
#  index_participating_sites_on_site_recruitment_status_id  (site_recruitment_status_id)
#  index_participating_sites_on_trial_id                    (trial_id)
#

require 'test_helper'

class ParticipatingSiteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
