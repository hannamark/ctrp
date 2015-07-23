# == Schema Information
#
# Table name: trial_funding_sources
#
#  id                :integer          not null, primary key
#  trial_id          :integer
#  funding_source_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#
# Indexes
#
#  index_trial_funding_sources_on_funding_source_id  (funding_source_id)
#  index_trial_funding_sources_on_trial_id           (trial_id)
#

class TrialFundingSource < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
  belongs_to :funding_source, class_name: "Organization"
end
