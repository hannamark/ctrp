# == Schema Information
#
# Table name: collaborators
#
#  id              :integer          not null, primary key
#  org_name        :string
#  organization_id :integer
#  trial_id        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#  lock_version    :integer          default(0)
#
# Indexes
#
#  index_collaborators_on_organization_id  (organization_id)
#  index_collaborators_on_trial_id         (trial_id)
#

class Collaborator < ActiveRecord::Base
  include BasicConcerns

  belongs_to :organization
  belongs_to :trial
end
