# == Schema Information
#
# Table name: trial_ownerships
#
#  id           :integer          not null, primary key
#  trial_id     :integer
#  user_id      :integer
#  created_at   :datetime
#  updated_at   :datetime
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

class TrialOwnership < TrialBase
  belongs_to :trial
  belongs_to :user
end
