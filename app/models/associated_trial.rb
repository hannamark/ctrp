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
#
# Indexes
#
#  index_associated_trials_on_identifier_type_id  (identifier_type_id)
#  index_associated_trials_on_trial_id            (trial_id)
#

class AssociatedTrial < ActiveRecord::Base
  belongs_to :identifier_type
end
