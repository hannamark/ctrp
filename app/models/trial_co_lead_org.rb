# == Schema Information
#
# Table name: trial_co_lead_orgs
#
#  id              :integer          not null, primary key
#  trial_id        :integer
#  organization_id :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#
# Indexes
#
#  index_trial_co_lead_orgs_on_organization_id  (organization_id)
#  index_trial_co_lead_orgs_on_trial_id         (trial_id)
#

class TrialCoLeadOrg < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
  belongs_to :organization
end
