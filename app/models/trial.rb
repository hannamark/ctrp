# == Schema Information
#
# Table name: trials
#
#  id                       :integer          not null, primary key
#  nci_id                   :string(255)
#  lead_protocol_id         :string(255)
#  official_title           :text
#  pilot                    :string(255)
#  primary_purpose_other    :string(255)
#  secondary_purpose_other  :string(255)
#  program_code             :string(255)
#  grant_question           :string(255)
#  start_date               :date
#  start_date_qual          :string(255)
#  primary_comp_date        :date
#  primary_comp_date_qual   :string(255)
#  comp_date                :date
#  comp_date_qual           :string(255)
#  ind_ide_question         :string(255)
#  intervention_indicator   :string(255)
#  sec801_indicator         :string(255)
#  data_monitor_indicator   :string(255)
#  history                  :json
#  study_source_id          :integer
#  phase_id                 :integer
#  primary_purpose_id       :integer
#  secondary_purpose_id     :integer
#  responsible_party_id     :integer
#  lead_org_id              :integer
#  pi_id                    :integer
#  sponsor_id               :integer
#  investigator_id          :integer
#  created_at               :datetime         not null
#  updated_at               :datetime
#  uuid                     :string(255)
#  lock_version             :integer          default(0)
#  research_category_id     :integer
#  accrual_disease_term_id  :integer
#  investigator_title       :string(255)
#  investigator_aff_id      :integer
#  created_by               :string(255)
#  updated_by               :string(255)
#  is_draft                 :boolean
#  admin_checkout           :text
#  scientific_checkout      :text
#  check_in_comment         :text
#  process_priority         :string(255)
#  process_comment          :text
#  receive_email            :boolean
#  xml_required             :string(255)
#  acronym                  :string(255)
#  keywords                 :text
#  nih_nci_div              :string(255)
#  nih_nci_prog             :string(255)
#  send_trial               :string(255)
#  board_approval_num       :string(255)
#  board_affiliation        :string(255)
#  brief_title              :text
#  brief_summary            :text
#  detailed_description     :text
#  objective                :text
#  target_enrollment        :integer
#  final_enrollment         :integer
#  accruals                 :integer
#  accept_vol               :string(255)
#  min_age                  :integer
#  max_age                  :integer
#  assigned_to_id           :integer
#  owner_id                 :integer
#  board_approval_status_id :integer
#  board_id                 :integer
#  intervention_model_id    :integer
#  masking_id               :integer
#  allocation_id            :integer
#  study_classification_id  :integer
#  gender_id                :integer
#  min_age_unit_id          :integer
#  max_age_unit_id          :integer
#  anatomic_site_id         :integer
#  num_of_arms              :integer
#  verification_date        :date
#  sampling_method          :string(255)
#  study_pop_desc           :text
#
# Indexes
#
#  index_trials_on_accrual_disease_term_id   (accrual_disease_term_id)
#  index_trials_on_allocation_id             (allocation_id)
#  index_trials_on_anatomic_site_id          (anatomic_site_id)
#  index_trials_on_assigned_to_id            (assigned_to_id)
#  index_trials_on_board_approval_status_id  (board_approval_status_id)
#  index_trials_on_board_id                  (board_id)
#  index_trials_on_gender_id                 (gender_id)
#  index_trials_on_intervention_model_id     (intervention_model_id)
#  index_trials_on_investigator_aff_id       (investigator_aff_id)
#  index_trials_on_investigator_id           (investigator_id)
#  index_trials_on_lead_org_id               (lead_org_id)
#  index_trials_on_masking_id                (masking_id)
#  index_trials_on_max_age_unit_id           (max_age_unit_id)
#  index_trials_on_min_age_unit_id           (min_age_unit_id)
#  index_trials_on_owner_id                  (owner_id)
#  index_trials_on_phase_id                  (phase_id)
#  index_trials_on_pi_id                     (pi_id)
#  index_trials_on_primary_purpose_id        (primary_purpose_id)
#  index_trials_on_research_category_id      (research_category_id)
#  index_trials_on_responsible_party_id      (responsible_party_id)
#  index_trials_on_secondary_purpose_id      (secondary_purpose_id)
#  index_trials_on_sponsor_id                (sponsor_id)
#  index_trials_on_study_classification_id   (study_classification_id)
#  index_trials_on_study_source_id           (study_source_id)
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
  has_many :trial_status_wrappers, -> { order 'trial_status_wrappers.status_date, trial_status_wrappers.id' }
  has_many :trial_funding_sources, -> { order 'trial_funding_sources.id' }
  has_many :funding_sources, through: :trial_funding_sources, source: :organization
  has_many :trial_co_lead_orgs
  has_many :co_lead_orgs, through: :trial_co_lead_orgs, source: :organization
  has_many :trial_co_pis
  has_many :co_pis, through: :trial_co_pis, source: :person
  has_many :oversight_authorities, -> { order 'oversight_authorities.id' }
  has_many :trial_documents, -> { order 'trial_documents.id' }

  # PA fields
  belongs_to :assigned_to, class_name: "User"
  belongs_to :owner, class_name: "User"
  belongs_to :board_approval_status
  belongs_to :board, class_name: "Organization"
  belongs_to :intervention_model
  belongs_to :masking
  belongs_to :allocation
  belongs_to :study_classification
  belongs_to :gender
  belongs_to :min_age_unit, class_name: "AgeUnit"
  belongs_to :max_age_unit, class_name: "AgeUnit"
  belongs_to :anatomic_site
  has_many :submissions, -> { order 'submissions.id' }
  has_many :milestone_wrappers, -> { order 'milestone_wrappers.id' }
  has_many :onholds, -> { order 'onholds.id' }
  has_many :associated_trials, -> { order 'associated_trials.id' }
  has_many :alternate_titles, -> { order 'alternate_titles.id' }
  has_many :central_contacts, -> { order 'central_contacts.id' }
  has_many :outcome_measures, -> { order 'outcome_measures.id' }
  has_many :other_criteria, -> { order 'other_criteria.id' }
  has_many :markers, -> { order 'markers.id' }
  has_many :interventions, -> { order 'interventions.id' }
  has_many :arms_groups, -> { order 'arms_groups.id' }
  has_many :sub_groups, -> { order 'sub_groups.id' }
  has_many :participating_sites, -> { order 'participating_sites.id' }
  has_many :ps_orgs, through: :participating_sites, source: :organization
  has_many :citations, -> { order 'citations.id' }
  has_many :links, -> { order 'links.id' }
  has_many :diseases, -> { order 'diseases.id' }
  has_many :processing_status_wrappers, -> { order 'processing_status_wrappers.id' }
  has_many :collaborators, -> { order 'collaborators.id' }

  attr_accessor :edit_type

  accepts_nested_attributes_for :other_ids, allow_destroy: true
  accepts_nested_attributes_for :trial_funding_sources, allow_destroy: true
  accepts_nested_attributes_for :grants, allow_destroy: true
  accepts_nested_attributes_for :trial_status_wrappers, allow_destroy: true
  accepts_nested_attributes_for :ind_ides, allow_destroy: true
  accepts_nested_attributes_for :oversight_authorities, allow_destroy: true
  accepts_nested_attributes_for :trial_documents, allow_destroy: true
  accepts_nested_attributes_for :submissions, allow_destroy: true

  # Array of actions can be taken on this Trial
  def actions
    actions = []
    if self.is_draft
      actions.append('complete')
    else
      actions.append('update')
      actions.append('amend')
    end
  end

  validates :lead_protocol_id, presence: true
  validates :official_title, presence: true, if: 'is_draft == false'
  validates :phase, presence: true, if: 'is_draft == false'
  validates :pilot, presence: true, if: 'is_draft == false'
  validates :research_category, presence: true, if: 'is_draft == false'
  validates :primary_purpose, presence: true, if: 'is_draft == false'
  validates :accrual_disease_term, presence: true, if: 'is_draft == false'
  validates :lead_org, presence: true, if: 'is_draft == false'
  validates :pi, presence: true, if: 'is_draft == false'
  validates :sponsor, presence: true, if: 'is_draft == false'
  validates :grant_question, presence: true, if: 'is_draft == false'
  validates :ind_ide_question, presence: true, if: 'is_draft == false'
  validates :start_date, presence: true, if: 'is_draft == false'
  validates :start_date_qual, presence: true, if: 'is_draft == false'
  validates :primary_comp_date, presence: true, if: 'is_draft == false'
  validates :primary_comp_date_qual, presence: true, if: 'is_draft == false'
  validates :comp_date, presence: true, if: 'is_draft == false'
  validates :comp_date_qual, presence: true, if: 'is_draft == false'

  before_save :generate_status
  before_create :save_history
  before_save :check_indicator

  private

  def generate_status
    if !self.is_draft && self.nci_id.nil?
      # Generate NCI ID
      current_year = Time.new.year.to_s
      largest_id = Trial.where('nci_id ilike ?', "%NCI-#{current_year}-%").order('nci_id desc').pluck('nci_id').first
      if largest_id.nil?
        new_id = "NCI-#{current_year}-00000"
      else
        new_id = largest_id.next
      end
      self.nci_id = new_id

      # New Submission
      newSubmission = Submission.create(submission_num: 1, submission_date: Date.today, trial: self)

      # New Milestone
      srd = Milestone.find_by_code('SRD')
      MilestoneWrapper.create(milestone_date: Date.today, milestone: srd, trial: self, submission: newSubmission)

      # New Processing Status
      sub = ProcessingStatus.find_by_code('SUB')
      ProcessingStatusWrapper.create(status_date: Date.today, processing_status: sub, trial: self)
    elsif self.edit_type == 'amend'
      # Populate submission number for the latest Submission and create a Milestone
      largest_sub_num = Submission.where('trial_id = ?', self.id).order('submission_num desc').pluck('submission_num').first
      latest_submission = self.submissions.last
      latest_submission.submission_num = largest_sub_num.present? ? largest_sub_num + 1 : 1

      srd = Milestone.find_by_code('SRD')
      MilestoneWrapper.create(milestone_date: Date.today, milestone: srd, trial: self, submission: latest_submission)
    end
  end

  def save_history
    history = {lead_org: self.lead_org, pi: self.pi}
    self.history = history.to_json
  end

  def check_indicator
    if self.intervention_indicator == 'No' && self.sec801_indicator != 'No'
      self.sec801_indicator = 'No'
    end
  end

  #scopes for search API
  #scope :matches_grant, -> (column, value) {Tempgrant.where}
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
    join_clause = 'LEFT JOIN other_ids ON other_ids.trial_id = trials.id'
    where_clause = 'trials.lead_protocol_id ilike ? OR trials.nci_id ilike ? OR other_ids.protocol_id ilike ?'

    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      value_exp = "%#{value[1..str_len - 1]}"
    elsif value[0] != '*' && value[str_len - 1] == '*'
      value_exp = "#{value[0..str_len - 2]}%"
    elsif value[0] == '*' && value[str_len - 1] == '*'
      value_exp = "%#{value[1..str_len - 2]}%"
    else
      value_exp = "#{value}"
    end

    joins(join_clause).where(where_clause, value_exp, value_exp, value_exp)
  }

  scope :with_phase, -> (value) { joins(:phase).where("phases.code = ?", "#{value}") }

  scope :with_phases, -> (value) {
    conditions = []
    q = ""

    value.each_with_index { |e, i|
      if i == 0
        q = "phases.code = ?"
      else
        q += " OR phases.code = ?"
      end
      conditions.push(e[:code])
    }
    conditions.insert(0, q)

    joins(:phase).where(conditions)
  }

  scope :with_purpose, -> (value) { joins(:primary_purpose).where("primary_purposes.code = ?", "#{value}") }

  scope :with_purposes, -> (value) {
    conditions = []
    q = ""

    value.each_with_index { |e, i|
      if i == 0
        q = "primary_purposes.code = ?"
      else
        q += " OR primary_purposes.code = ?"
      end
      conditions.push(e[:code])
    }
    conditions.insert(0, q)

    joins(:primary_purpose).where(conditions)
  }

  scope :with_research_category, -> (value) { joins(:research_category).where("research_categories.code = ?", "#{value}") }

  scope :with_study_source, -> (value) { joins(:study_source).where("study_sources.code = ?", "#{value}") }

  scope :with_study_sources, -> (value) {
    conditions = []
    q = ""

    value.each_with_index { |e, i|
      if i == 0
        q = "study_sources.code = ?"
      else
        q += " OR study_sources.code = ?"
      end
      conditions.push(e[:code])
    }
    conditions.insert(0, q)

    joins(:study_source).where(conditions)
  }

  scope :with_nci_div, -> (value) {where("nih_nci_div = ?", "#{value}") }

  scope :with_nci_prog, -> (value) {where("nih_nci_prog = ?", "#{value}") }

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

  scope :with_any_org, -> (value) {
    #join_clause = "LEFT JOIN organizations lead_orgs ON lead_orgs.id = trials.lead_org_id LEFT JOIN organizations sponsors ON sponsors.id = trials.sponsor_id LEFT JOIN trial_funding_sources ON trial_funding_sources.trial_id = trials.id LEFT JOIN organizations funding_sources ON funding_sources.id = trial_funding_sources.organization_id"
    #where_clause = "lead_orgs.name ilike ? OR sponsors.name ilike ? OR funding_sources.name ilike ?"
    join_clause = "LEFT JOIN organizations lead_orgs ON lead_orgs.id = trials.lead_org_id LEFT JOIN organizations sponsors ON sponsors.id = trials.sponsor_id"
    where_clause = "lead_orgs.name ilike ? OR sponsors.name ilike ?"
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(join_clause).where(where_clause, "%#{value[1..str_len - 1]}", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(join_clause).where(where_clause, "#{value[0..str_len - 2]}%", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(join_clause).where(where_clause, "%#{value[1..str_len - 2]}%", "%#{value[1..str_len - 2]}%")
    else
      joins(join_clause).where(where_clause, "#{value}", "#{value}")
    end
  }

  scope :sort_by_col, -> (params) {
    column = params[:sort]
    order = params[:order]

    if column == 'id'
      order("#{column} #{order}")
    elsif column == 'phase'
      if params[:phases].present?
        order("phases.name #{order}").group(:'phases.name')
      else
        joins("LEFT JOIN phases ON phases.id = trials.phase_id").order("phases.name #{order}").group(:'phases.name')
      end
    elsif column == 'purpose'
      if params[:purposes].present?
        order("primary_purposes.name #{order}").group(:'primary_purposes.name')
      else
        joins("LEFT JOIN primary_purposes ON primary_purposes.id = trials.primary_purpose_id").order("primary_purposes.name #{order}").group(:'primary_purposes.name')
      end
    elsif column == 'study_source'
      if params[:study_sources].present?
        order("study_sources.name #{order}").group(:'study_sources.name')
      else
        joins("LEFT JOIN study_sources ON study_sources.id = trials.study_source_id").order("study_sources.name #{order}").group(:'study_sources.name')
      end
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
