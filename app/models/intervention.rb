# == Schema Information
#
# Table name: interventions
#
#  id                   :integer          not null, primary key
#  name                 :string(255)
#  other_name           :string(255)
#  description          :text
#  intervention_type_id :integer
#  trial_id             :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#
# Indexes
#
#  index_interventions_on_intervention_type_id  (intervention_type_id)
#  index_interventions_on_trial_id              (trial_id)
#

class Intervention < ActiveRecord::Base
  include BasicConcerns

  belongs_to :intervention_type
  belongs_to :trial
end
