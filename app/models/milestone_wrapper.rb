# == Schema Information
#
# Table name: milestone_wrappers
#
#  id             :integer          not null, primary key
#  milestone_date :date
#  milestone_id   :integer
#  trial_id       :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  uuid           :string(255)
#  lock_version   :integer          default(0)
#  submission_id  :integer
#
# Indexes
#
#  index_milestone_wrappers_on_milestone_id   (milestone_id)
#  index_milestone_wrappers_on_submission_id  (submission_id)
#  index_milestone_wrappers_on_trial_id       (trial_id)
#

class MilestoneWrapper < TrialBase
  include BasicConcerns

  belongs_to :milestone
  belongs_to :submission
  belongs_to :trial

  scope :by_value, ->  (value) {
    joins(:milestone).where("milestone_wrappers.milestone_id = milestones.id and milestones.code = ?","#{value.to_s}")
  }

  scope :latest, -> {
    order("updated_at DESC").first
  }

end
