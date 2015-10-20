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
#  accrual_disease_term_id :integer
#  investigator_title      :string(255)
#  investigator_aff_id     :integer
#  created_by              :string(255)
#  updated_by              :string(255)
#  is_draft                :boolean
#  lock_version            :integer          default(0)
#
# Indexes
#
#  index_trials_on_accrual_disease_term_id  (accrual_disease_term_id)
#  index_trials_on_investigator_aff_id      (investigator_aff_id)
#  index_trials_on_investigator_id          (investigator_id)
#  index_trials_on_lead_org_id              (lead_org_id)
#  index_trials_on_phase_id                 (phase_id)
#  index_trials_on_pi_id                    (pi_id)
#  index_trials_on_primary_purpose_id       (primary_purpose_id)
#  index_trials_on_research_category_id     (research_category_id)
#  index_trials_on_responsible_party_id     (responsible_party_id)
#  index_trials_on_secondary_purpose_id     (secondary_purpose_id)
#  index_trials_on_sponsor_id               (sponsor_id)
#  index_trials_on_study_source_id          (study_source_id)
#

class Trial < ActiveRecord::Base
  include BasicConcerns

  belongs_to :study_source
  belongs_to :phase
  belongs_to :research_category
  belongs_to :primary_purpose
  belongs_to :secondary_purpose
  belongs_to :accrual_disease_term
  belongs_to :responsible_party
  belongs_to :lead_org, class_name: "Organization"
  belongs_to :pi, class_name: "Person"
  belongs_to :sponsor, class_name: "Organization"
  belongs_to :investigator, class_name: "Person"
  belongs_to :investigator_aff, class_name: "Organization"
  has_many :other_ids, -> { order 'other_ids.id' }
  has_many :ind_ides, -> { order 'ind_ides.id' }
  has_many :grants, -> { order 'grants.id' }
  has_many :trial_status_wrappers, -> { order 'trial_status_wrappers.id' }
  has_many :trial_funding_sources, -> { order 'trial_funding_sources.id' }
  has_many :funding_sources, through: :trial_funding_sources, source: :organization
  has_many :trial_co_lead_orgs
  has_many :co_lead_orgs, through: :trial_co_lead_orgs, source: :organization
  has_many :trial_co_pis
  has_many :co_pis, through: :trial_co_pis, source: :person
  has_many :oversight_authorities, -> { order 'oversight_authorities.id' }
  has_many :trial_documents, -> { order 'trial_documents.id' }

  accepts_nested_attributes_for :other_ids, allow_destroy: true
  accepts_nested_attributes_for :trial_funding_sources, allow_destroy: true
  accepts_nested_attributes_for :grants, allow_destroy: true
  accepts_nested_attributes_for :trial_status_wrappers, allow_destroy: true
  accepts_nested_attributes_for :ind_ides, allow_destroy: true
  accepts_nested_attributes_for :oversight_authorities, allow_destroy: true
  accepts_nested_attributes_for :trial_documents, allow_destroy: true

  validates :lead_protocol_id, presence: true

  before_create :save_history

  private

  def save_history
    history = {lead_org: self.lead_org, pi: self.pi}
    self.history = history.to_json
  end

  #scopes for search API
  scope :matches, -> (column, value) { where("trials.#{column} = ?", "#{value}") }

  scope :matches_wc, -> (column, value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      where("trials.#{column} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("trials.#{column} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("trials.#{column} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      where("trials.#{column} ilike ?", "#{value}")
    end
  }

  scope :with_protocol_id, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins("LEFT JOIN other_ids ON other_ids.trial_id = trials.id").where("trials.lead_protocol_id ilike ? OR other_ids.protocol_id ilike ?", "%#{value[1..str_len - 1]}", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins("LEFT JOIN other_ids ON other_ids.trial_id = trials.id").where("trials.lead_protocol_id ilike ? OR other_ids.protocol_id ilike ?", "#{value[0..str_len - 2]}%", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins("LEFT JOIN other_ids ON other_ids.trial_id = trials.id").where("trials.lead_protocol_id ilike ? OR other_ids.protocol_id ilike ?", "%#{value[1..str_len - 2]}%", "%#{value[1..str_len - 2]}%")
    else
      joins("LEFT JOIN other_ids ON other_ids.trial_id = trials.id").where("trials.lead_protocol_id ilike ? OR other_ids.protocol_id ilike ?", "#{value}", "#{value}")
    end
  }

  scope :with_phase, -> (value) { joins(:phase).where("phases.code = ?", "#{value}") }

  scope :with_purpose, -> (value) { joins(:primary_purpose).where("primary_purposes.code = ?", "#{value}") }

  scope :with_study_source, -> (value) { joins(:study_source).where("study_sources.code = ?", "#{value}") }

  scope :with_pi_lname, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:pi).where("people.lname ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:pi).where("people.lname ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:pi).where("people.lname ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:pi).where("people.lname ilike ?", "#{value}")
    end
  }

  scope :with_pi_fname, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:pi).where("people.fname ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:pi).where("people.fname ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:pi).where("people.fname ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:pi).where("people.fname ilike ?", "#{value}")
    end
  }

  scope :with_lead_org, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:lead_org).where("organizations.name ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:lead_org).where("organizations.name ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:lead_org).where("organizations.name ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:lead_org).where("organizations.name ilike ?", "#{value}")
    end
  }

  scope :with_sponsor, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:sponsor).where("organizations.name ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:sponsor).where("organizations.name ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:sponsor).where("organizations.name ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:sponsor).where("organizations.name ilike ?", "#{value}")
    end
  }

  scope :sort_by_col, -> (column, order) {
    if column == 'id'
      order("#{column} #{order}")
    elsif column == 'phase'
      joins("LEFT JOIN phases ON phases.id = trials.phase_id").order("phases.name #{order}").group(:'phases.name')
    elsif column == 'purpose'
      joins("LEFT JOIN primary_purposes ON primary_purposes.id = trials.primary_purpose_id").order("primary_purposes.name #{order}").group(:'primary_purposes.name')
    elsif column == 'study_source'
      joins("LEFT JOIN study_sources ON study_sources.id = trials.study_source_id").order("study_sources.name #{order}").group(:'study_sources.name')
    elsif column == 'pi'
      joins("LEFT JOIN people ON people.id = trials.pi_id").order("people.lname #{order}").group(:'people.lname')
    elsif column == 'lead_org'
      joins("LEFT JOIN organizations ON organizations.id = trials.lead_org_id").order("organizations.name #{order}").group(:'organizations.name')
    elsif column == 'sponsor'
      joins("LEFT JOIN organizations ON organizations.id = trials.sponsor_id").order("organizations.name #{order}").group(:'organizations.name')
    else
      order("LOWER(trials.#{column}) #{order}")
    end
  }
end
