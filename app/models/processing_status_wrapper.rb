# == Schema Information
#
# Table name: processing_status_wrappers
#
#  id                   :integer          not null, primary key
#  status_date          :date
#  processing_status_id :integer
#  trial_id             :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#
# Indexes
#
#  index_processing_status_wrappers_on_processing_status_id  (processing_status_id)
#  index_processing_status_wrappers_on_trial_id              (trial_id)
#

class ProcessingStatusWrapper < ActiveRecord::Base
  include BasicConcerns

  belongs_to :processing_status
  belongs_to :trial
end
