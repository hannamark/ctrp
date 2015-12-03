# == Schema Information
#
# Table name: trial_status_wrappers
#
#  id              :integer          not null, primary key
#  status_date     :date
#  why_stopped     :text
#  trial_status_id :integer
#  trial_id        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#  lock_version    :integer          default(0)
#  comment         :text
#
# Indexes
#
#  index_trial_status_wrappers_on_trial_id         (trial_id)
#  index_trial_status_wrappers_on_trial_status_id  (trial_status_id)
#

class TrialStatusWrapper < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial_status
  belongs_to :trial

  scope :by_value, ->  (value) {
     joins(:trial_status).where("trial_status_wrappers.trial_status_id = trial_statuses.id and trial_statuses.code = ?","#{value.to_s}")
   }

  scope :latest, -> {
    order("updated_at DESC").first
  }


end
