# == Schema Information
#
# Table name: interventions
#
#  id                   :integer          not null, primary key
#  name                 :string(255)
#  other_name           :string(255)
#  description          :text
#  intervention_type_id :integer
#  trial_id             :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#

require 'test_helper'

class InterventionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
