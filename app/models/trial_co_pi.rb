# == Schema Information
#
# Table name: trial_co_pis
#
#  id         :integer          not null, primary key
#  trial_id   :integer
#  co_pi_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#
# Indexes
#
#  index_trial_co_pis_on_co_pi_id  (co_pi_id)
#  index_trial_co_pis_on_trial_id  (trial_id)
#

class TrialCoPi < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
  belongs_to :co_pi, class_name: "Person"
end
