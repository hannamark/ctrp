# == Schema Information
#
# Table name: trials
#
#  id                            :integer          not null, primary key
#  nci_id                        :string(255)
#  lead_protocol_id              :string(255)
#  official_title                :text
#  pilot                         :string(255)
#  primary_purpose_other         :string(255)
#  secondary_purpose_other       :text
#  program_code                  :string(255)
#  grant_question                :string(255)
#  start_date                    :date
#  start_date_qual               :string(255)
#  primary_comp_date             :date
#  primary_comp_date_qual        :string(255)
#  comp_date                     :date
#  comp_date_qual                :string(255)
#  ind_ide_question              :string(255)
#  intervention_indicator        :string(255)
#  sec801_indicator              :string(255)
#  data_monitor_indicator        :string(255)
#  history                       :json
#  study_source_id               :integer
#  phase_id                      :integer
#  primary_purpose_id            :integer
#  secondary_purpose_id          :integer
#  responsible_party_id          :integer
#  lead_org_id                   :integer
#  pi_id                         :integer
#  sponsor_id                    :integer
#  investigator_id               :integer
#  created_at                    :datetime         not null
#  updated_at                    :datetime
#  uuid                          :string(255)
#  lock_version                  :integer          default(0)
#  research_category_id          :integer
#  accrual_disease_term_id       :integer
#  investigator_title            :string(255)
#  investigator_aff_id           :integer
#  created_by                    :string(255)
#  updated_by                    :string(255)
#  is_draft                      :boolean
#  admin_checkout                :text
#  scientific_checkout           :text
#  check_in_comment              :text
#  process_priority              :string(255)
#  process_comment               :text
#  xml_required                  :string(255)
#  acronym                       :string(255)
#  keywords                      :text
#  nih_nci_div                   :string(255)
#  nih_nci_prog                  :string(255)
#  send_trial                    :string(255)
#  board_approval_num            :string(255)
#  brief_title                   :text
#  brief_summary                 :text
#  detailed_description          :text
#  objective                     :text
#  target_enrollment             :integer
#  final_enrollment              :integer
#  accruals                      :integer
#  accept_vol                    :string(255)
#  min_age                       :integer
#  max_age                       :integer
#  assigned_to_id                :integer
#  board_approval_status_id      :integer
#  intervention_model_id         :integer
#  masking_id                    :integer
#  allocation_id                 :integer
#  study_classification_id       :integer
#  gender_id                     :integer
#  min_age_unit_id               :integer
#  max_age_unit_id               :integer
#  num_of_arms                   :integer
#  verification_date             :date
#  sampling_method               :string(255)
#  study_pop_desc                :text
#  board_name                    :string(255)
#  board_affiliation_id          :integer
#  masking_role_caregiver        :boolean
#  masking_role_investigator     :boolean
#  masking_role_outcome_assessor :boolean
#  masking_role_subject          :boolean
#  study_model_other             :string(255)
#  time_perspective_other        :string(255)
#  study_model_id                :integer
#  time_perspective_id           :integer
#  biospecimen_retention_id      :integer
#  biospecimen_desc              :text
#  internal_source_id            :integer
#  nci_specific_comment          :text
#  send_trial_flag               :string
#

require 'test_helper'

class TrialTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
