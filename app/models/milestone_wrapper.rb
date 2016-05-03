# == Schema Information
#
# Table name: milestone_wrappers
#
#  id                :integer          not null, primary key
#  milestone_date    :date
#  milestone_id      :integer
#  trial_id          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  submission_id     :integer
#  comment           :text
#  milestone_type_id :integer
#  created_by        :string(255)
#
# Indexes
#
#  index_milestone_wrappers_on_milestone_id       (milestone_id)
#  index_milestone_wrappers_on_milestone_type_id  (milestone_type_id)
#  index_milestone_wrappers_on_submission_id      (submission_id)
#  index_milestone_wrappers_on_trial_id           (trial_id)
#

class MilestoneWrapper < TrialBase
  include BasicConcerns

  belongs_to :milestone
  belongs_to :milestone_type
  belongs_to :submission
  belongs_to :trial

  before_create :save_type
  after_create :recording_triggers

  private

  def save_type
    if self.milestone.present?
      if ['APS', 'APC', 'RAQ', 'AQS', 'AQC'].include? self.milestone.code
        self.milestone_type = MilestoneType.find_by_code('ADM')
      elsif ['SPS', 'SPC', 'RSQ', 'SQS', 'SQC'].include? self.milestone.code
        self.milestone_type = MilestoneType.find_by_code('SCI')
      else
        self.milestone_type = MilestoneType.find_by_code('GEN')
      end
    end
  end

  def recording_triggers
    if self.milestone.present?
      if self.milestone.code == 'VPC'
        MilestoneWrapper.create(milestone: Milestone.find_by_code('RVQ'), submission: self.submission, trial: self.trial, created_by: self.created_by)
      elsif self.milestone.code == 'APC'
        MilestoneWrapper.create(milestone: Milestone.find_by_code('RAQ'), submission: self.submission, trial: self.trial, created_by: self.created_by)
      end
    end
  end

  scope :by_value, ->  (value) {
    joins(:milestone).where("milestone_wrappers.milestone_id = milestones.id and milestones.code = ?","#{value.to_s}")
  }

  scope :latest, -> {
    order("updated_at DESC").first
  }

end
