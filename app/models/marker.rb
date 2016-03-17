# == Schema Information
#
# Table name: markers
#
#  id                    :integer          not null, primary key
#  name                  :string(255)
#  record_status         :string(255)
#  evaluation_type_id    :integer
#  assay_type_id         :integer
#  biomarker_use_id      :integer
#  biomarker_purpose_id  :integer
#  specimen_type_id      :integer
#  trial_id              :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  uuid                  :string(255)
#  lock_version          :integer          default(0)
#  evaluation_type_other :string(255)
#  assay_type_other      :string(255)
#  specimen_type_other   :string(255)
#  protocol_marker_name  :string(255)
#
# Indexes
#
#  index_markers_on_assay_type_id         (assay_type_id)
#  index_markers_on_biomarker_purpose_id  (biomarker_purpose_id)
#  index_markers_on_biomarker_use_id      (biomarker_use_id)
#  index_markers_on_evaluation_type_id    (evaluation_type_id)
#  index_markers_on_specimen_type_id      (specimen_type_id)
#  index_markers_on_trial_id              (trial_id)
#

class Marker < ActiveRecord::Base
  include BasicConcerns

  belongs_to :biomarker_use
  belongs_to :biomarker_purpose
  belongs_to :trial
  has_many   :marker_assay_type_associations
  has_many   :marker_eval_type_associations
  has_many   :marker_spec_type_associations

end
