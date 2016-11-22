# == Schema Information
#
# Table name: trial_co_pis
#
#  id           :integer          not null, primary key
#  trial_id     :integer
#  person_id    :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#
# Indexes
#
#  index_trial_co_pis_on_person_id  (person_id)
#  index_trial_co_pis_on_trial_id   (trial_id)
#

require 'test_helper'

class TrialCoPiTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
