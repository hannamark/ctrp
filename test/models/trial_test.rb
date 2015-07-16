# == Schema Information
#
# Table name: trials
#
#  id                        :integer          not null, primary key
#  nci_id                    :string(255)
#  lead_protocol_id          :string(255)
#  official_title            :text
#  pilot                     :string(255)
#  research_category         :string(255)
#  lead_org                  :json
#  co_lead_org               :json
#  principal_investigator    :json
#  co_principal_investigator :json
#  sponsor                   :json
#  investigator              :json
#  funding_source            :json
#  program_code              :string(255)
#  grant_question            :string(255)
#  start_date                :date
#  start_date_qual           :string(255)
#  primary_comp_date         :date
#  primary_comp_date_qual    :string(255)
#  comp_date                 :date
#  comp_date_qual            :string(255)
#  ind_ide_question          :string(255)
#  authority_country         :string(255)
#  authority_org             :string(255)
#  intervention_indicator    :string(255)
#  sec801_indicator          :string(255)
#  data_monitor_indicator    :string(255)
#  study_source_id           :integer
#  phase_id                  :integer
#  primary_purpose_id        :integer
#  secondary_purpose_id      :integer
#  study_model_id            :integer
#  time_perspective_id       :integer
#  responsible_party_id      :integer
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  uuid                      :string(255)
#
# Indexes
#
#  index_trials_on_phase_id              (phase_id)
#  index_trials_on_primary_purpose_id    (primary_purpose_id)
#  index_trials_on_responsible_party_id  (responsible_party_id)
#  index_trials_on_secondary_purpose_id  (secondary_purpose_id)
#  index_trials_on_study_model_id        (study_model_id)
#  index_trials_on_study_source_id       (study_source_id)
#  index_trials_on_time_perspective_id   (time_perspective_id)
#

require 'test_helper'

class TrialTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
