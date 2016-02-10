# == Schema Information
#
# Table name: participating_sites
#
#  id              :integer          not null, primary key
#  protocol_id     :string(255)
#  program_code    :string(255)
#  contact_name    :string(255)
#  contact_phone   :string(255)
#  contact_email   :string(255)
#  trial_id        :integer
#  organization_id :integer
#  person_id       :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#  lock_version    :integer          default(0)
#  extension       :string(255)
#
# Indexes
#
#  index_participating_sites_on_organization_id  (organization_id)
#  index_participating_sites_on_person_id        (person_id)
#  index_participating_sites_on_trial_id         (trial_id)
#

class ParticipatingSite < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
  belongs_to :organization
  belongs_to :person
  has_many :site_rec_status_wrappers, -> { order 'site_rec_status_wrappers.id' }
  has_many :participating_site_investigators, -> { order 'participating_site_investigators.id' }
  has_many :people, through: :participating_site_investigators

  scope :by_value, ->  (value) {
    joins(:organization).where("organizations.name ilike  ?","#{value.to_s}")
  }


end
