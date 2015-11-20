# == Schema Information
#
# Table name: central_contacts
#
#  id                      :integer          not null, primary key
#  country                 :string(255)
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
#
# Indexes
#
#  index_central_contacts_on_central_contact_type_id  (central_contact_type_id)
#  index_central_contacts_on_person_id                (person_id)
#  index_central_contacts_on_trial_id                 (trial_id)
#

class CentralContact < ActiveRecord::Base
  include BasicConcerns

  belongs_to :central_contact_type
  belongs_to :person
  belongs_to :trial
end
