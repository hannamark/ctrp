# == Schema Information
#
# Table name: trials
#
#  id                      :integer          not null, primary key
#  nci_id                  :string(255)
#  lead_protocol_id        :string(255)
#  official_title          :text
#  pilot                   :string(255)
#  primary_purpose_other   :string(255)
#  secondary_purpose_other :string(255)
#  program_code            :string(255)
#  grant_question          :string(255)
#  start_date              :date
#  start_date_qual         :string(255)
#  primary_comp_date       :date
#  primary_comp_date_qual  :string(255)
#  comp_date               :date
#  comp_date_qual          :string(255)
#  ind_ide_question        :string(255)
#  intervention_indicator  :string(255)
#  sec801_indicator        :string(255)
#  data_monitor_indicator  :string(255)
#  history                 :json
#  study_source_id         :integer
#  phase_id                :integer
#  primary_purpose_id      :integer
#  secondary_purpose_id    :integer
#  responsible_party_id    :integer
#  lead_org_id             :integer
#  pi_id                   :integer
#  sponsor_id              :integer
#  investigator_id         :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  uuid                    :string(255)
#  research_category_id    :integer
#  investigator_title      :string(255)
#  investigator_aff_id     :integer
#
# Indexes
#
#  index_trials_on_investigator_aff_id   (investigator_aff_id)
#  index_trials_on_investigator_id       (investigator_id)
#  index_trials_on_lead_org_id           (lead_org_id)
#  index_trials_on_phase_id              (phase_id)
#  index_trials_on_pi_id                 (pi_id)
#  index_trials_on_primary_purpose_id    (primary_purpose_id)
#  index_trials_on_research_category_id  (research_category_id)
#  index_trials_on_responsible_party_id  (responsible_party_id)
#  index_trials_on_secondary_purpose_id  (secondary_purpose_id)
#  index_trials_on_sponsor_id            (sponsor_id)
#  index_trials_on_study_source_id       (study_source_id)
#

require 'test_helper'

class TrialTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
