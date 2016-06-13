# == Schema Information
#
# Table name: trial_ownerships
#
#  id           :integer          not null, primary key
#  trial_id     :integer
#  user_id      :integer
#  created_at   :datetime
#  updated_at   :datetime
#  ended_at     :datetime
#  uuid         :string(255)
#  lock_version :integer          default(0)
#
# Indexes
#
#  index_trial_ownerships_on_trial_id  (trial_id)
#  index_trial_ownerships_on_user_id   (user_id)
#

class TrialOwnership < TrialBase
  belongs_to :trial
  belongs_to :user


  scope :matches, -> (column, value) {
    join_clause  = "LEFT JOIN trials owned_trial ON trial_ownerships.trial_id = owned_trial.id "
    join_clause += "LEFT JOIN users ON trial_ownerships.user_id = users.id "

    if column == 'user_id'
      joins(join_clause).where("trial_ownerships.user_id = #{value} AND trial_ownerships.trial_id is not null AND trial_ownerships.ended_at is null")
    end
  }

end
