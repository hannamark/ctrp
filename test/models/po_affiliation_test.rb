# == Schema Information
#
# Table name: po_affiliations
#
#  id                       :integer          not null, primary key
#  person_id                :integer
#  organization_id          :integer
#  po_affiliation_status_id :integer
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  uuid                     :string(255)
#  lock_version             :integer          default(0)
#  effective_date           :datetime
#  expiration_date          :datetime
#

require 'test_helper'

class PoAffiliationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
