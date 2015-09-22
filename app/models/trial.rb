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

class Trial < ActiveRecord::Base
  include BasicConcerns

  belongs_to :study_source
  belongs_to :phase
  belongs_to :research_category
  belongs_to :primary_purpose
  belongs_to :secondary_purpose
  belongs_to :responsible_party
  belongs_to :lead_org, class_name: "Organization"
  belongs_to :pi, class_name: "Person"
  belongs_to :sponsor, class_name: "Organization"
  belongs_to :investigator, class_name: "Person"
  belongs_to :investigator_aff, class_name: "Organization"
  has_many :other_ids
  has_many :ind_ides
  has_many :grants
  has_many :trial_status_wrappers
  has_many :trial_funding_sources
  has_many :funding_sources, through: :trial_funding_sources, source: :organization
  has_many :trial_co_lead_orgs
  has_many :co_lead_orgs, through: :trial_co_lead_orgs, source: :organization
  has_many :trial_co_pis
  has_many :co_pis, through: :trial_co_pis, source: :person
  has_many :oversight_authorities
  has_many :trial_documents

  accepts_nested_attributes_for :other_ids, allow_destroy: true
  accepts_nested_attributes_for :trial_funding_sources, allow_destroy: true
  accepts_nested_attributes_for :grants, allow_destroy: true
  accepts_nested_attributes_for :trial_status_wrappers, allow_destroy: true
  accepts_nested_attributes_for :ind_ides, allow_destroy:  true
  accepts_nested_attributes_for :trial_documents, allow_destroy: true

  validates :lead_protocol_id, presence: true
end
