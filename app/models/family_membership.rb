# == Schema Information
#
# Table name: family_memberships
#
#  id                     :integer          not null, primary key
#  family_id              :integer
#  organization_id        :integer
#  family_relationship_id :integer
#  effective_date         :datetime
#  expiration_date        :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  uuid                   :string(255)
#  lock_version           :integer          default(0)
#

class FamilyMembership < ActiveRecord::Base
  include BasicConcerns

  belongs_to :family
  belongs_to :organization
  belongs_to :family_relationship
end
