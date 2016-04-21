# == Schema Information
#
# Table name: ncit_interventions
#
#  id               :integer          not null, primary key
#  preferred_name   :string
#  synonyms         :string
#  description      :text
#  type_code        :string
#  ct_gov_type_code :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  ncit_status_id   :integer
#
# Indexes
#
#  index_ncit_interventions_on_preferred_name  (preferred_name)
#

require 'test_helper'

class NcitInterventionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
