# == Schema Information
#
# Table name: central_contacts
#
#  id                      :integer          not null, primary key
#  phone                   :string(255)
#  email                   :string(255)
#  central_contact_type_id :integer
#  person_id               :integer
#  trial_id                :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  uuid                    :string(255)
#  lock_version            :integer          default(0)
#  extension               :string(255)
#  fullname                :string
#

require 'test_helper'

class CentralContactTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
