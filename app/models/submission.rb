# == Schema Information
#
# Table name: submissions
#
#  id                   :integer          not null, primary key
#  submission_num       :integer
#  submission_date      :date
#  amendment_date       :date
#  amendment_reason_id  :integer
#  trial_id             :integer
#  created_at           :datetime
#  updated_at           :datetime
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#  amendment_num        :string(255)
#  submission_type_id   :integer
#  submission_source_id :integer
#  submission_method_id :integer
#  user_id              :integer
#  acknowledge          :string(255)
#  acknowledge_comment  :text
#  acknowledge_date     :date
#  acknowledged_by      :string(255)
#
# Indexes
#
#  index_submissions_on_amendment_reason_id   (amendment_reason_id)
#  index_submissions_on_submission_method_id  (submission_method_id)
#  index_submissions_on_submission_source_id  (submission_source_id)
#  index_submissions_on_submission_type_id    (submission_type_id)
#  index_submissions_on_trial_id              (trial_id)
#  index_submissions_on_user_id               (user_id)
#

class Submission < TrialBase
  include BasicConcerns

  belongs_to :amendment_reason
  belongs_to :trial
  belongs_to :submission_type
  belongs_to :submission_source
  belongs_to :submission_method
  belongs_to :user
  has_many :milestone_wrappers, -> { order 'milestone_wrappers.id' }
  has_many :processing_status_wrappers, -> { order 'processing_status_wrappers.id' }
  has_many :trial_documents, -> { order 'trial_documents.id' }

  before_create :set_acknowledge_as_no

  private

  def set_acknowledge_as_no
      self.acknowledge = 'No'
  end

end
