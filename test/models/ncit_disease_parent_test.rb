# == Schema Information
#
# Table name: ncit_disease_parents
#
#  id                  :integer          not null, primary key
#  parent_disease_code :string(255)
#  ncit_status_id      :integer
#  child_id            :integer
#  parent_id           :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  uuid                :string(255)
#  lock_version        :integer          default(0)
#

require 'test_helper'

class NcitDiseaseParentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
