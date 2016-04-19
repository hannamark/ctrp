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

class Intervention < ActiveRecord::Base
  include BasicConcerns

  belongs_to :intervention_type_cancer_gov, :class_name => 'InterventionType'
  belongs_to :intervention_type_ct_gov, :class_name => 'InterventionType'

  belongs_to :trial
end
