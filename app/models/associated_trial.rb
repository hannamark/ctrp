# == Schema Information
#
# Table name: associated_trials
#
#  id                 :integer          not null, primary key
#  trial_identifier   :string(255)
#  identifier_type_id :integer
#  trial_id           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  uuid               :string(255)
#  lock_version       :integer          default(0)
#  official_title     :text
#
# Indexes
#
#  index_associated_trials_on_identifier_type_id  (identifier_type_id)
#  index_associated_trials_on_trial_id            (trial_id)
#

class AssociatedTrial < ActiveRecord::Base
  include BasicConcerns

  belongs_to :identifier_type
  belongs_to :trial

  scope :search_trial_associations, -> (trial_identifier, identifier_type_id, trial_id) {
    where(trial_identifier: trial_identifier, identifier_type_id: trial_identifier, trial_id: trial_id)
    # where(trial_identifier: trial_identifier)
  }

end
