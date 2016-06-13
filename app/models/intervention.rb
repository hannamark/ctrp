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
#  index                :integer
#  arms_group_id        :integer
#
# Indexes
#
#  index_interventions_on_arms_group_id         (arms_group_id)
#  index_interventions_on_intervention_type_id  (intervention_type_id)
#  index_interventions_on_trial_id              (trial_id)
#

class Intervention < ActiveRecord::Base
  include BasicConcerns

  # belongs_to :intervention_type_cancer_gov, :class_name => 'InterventionType'
  # belongs_to :intervention_type_ct_gov, :class_name => 'InterventionType'

  belongs_to :intervention_type
  belongs_to :trial
  has_many :arms_groups_interventions_associations, dependent: :destroy

  after_save :update_intervention_type

  private

  # update intervention types for all records with the same intervention name if the intervention type changes for this intervention
  def update_intervention_type
    if self.c_code_was == self.c_code and self.intervention_type_id_was != self.intervention_type_id
      Intervention.where(c_code: self.c_code).update_all(intervention_type_id: self.intervention_type_id)
    end
  end

end
