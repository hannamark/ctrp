# == Schema Information
#
# Table name: trial_ownerships
#
#  id           :integer          not null, primary key
#  trial_id     :integer
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#
# Indexes
#
#  index_trial_ownerships_on_trial_id  (trial_id)
#  index_trial_ownerships_on_user_id   (user_id)
#

class TrialOwnership < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
  belongs_to :user
end
