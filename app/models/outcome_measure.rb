# == Schema Information
#
# Table name: outcome_measures
#
#  id                      :integer          not null, primary key
#  title                   :text
#  time_frame              :string(255)
#  description             :text
#  safety_issue            :string(255)
#  outcome_measure_type_id :integer
#  trial_id                :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  uuid                    :string(255)
#  lock_version            :integer          default(0)
#
# Indexes
#
#  index_outcome_measures_on_outcome_measure_type_id  (outcome_measure_type_id)
#  index_outcome_measures_on_trial_id                 (trial_id)
#

class OutcomeMeasure < ActiveRecord::Base
  include BasicConcerns

  belongs_to :outcome_measure_type
  belongs_to :trial
end
