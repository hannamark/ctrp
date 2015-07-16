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
#
# Indexes
#
#  index_trial_status_wrappers_on_trial_id         (trial_id)
#  index_trial_status_wrappers_on_trial_status_id  (trial_status_id)
#

class TrialStatusWrapper < ActiveRecord::Base
end
