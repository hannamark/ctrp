# == Schema Information
#
# Table name: people
#
#  id                :integer          not null, primary key
#  source_id         :string(255)
#  prefix            :string(255)
#  suffix            :string(255)
#  email             :string(255)
#  phone             :string(255)
#  source_status_id  :integer
#  source_context_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  fname             :string(255)
#  mname             :string(255)
#  lname             :string(255)
#  ctrp_id           :integer
#  created_by        :string
#  updated_by        :string
#  lock_version      :integer          default(0)
#
# Indexes
#
#  index_people_on_source_context_id  (source_context_id)
#  index_people_on_source_status_id   (source_status_id)
#

class Person < ActiveRecord::Base
  include BasicConcerns

  has_many :po_affiliations
  has_many :organizations, through: :po_affiliations
  belongs_to :source_status
  belongs_to :source_context
  belongs_to :source_cluster
  has_many :trial_co_pis
  has_many :copi_trials, through: :trial_co_pis, source: :trial
  has_many :pi_trials, foreign_key: :pi_id, class_name: "Trial"
  has_many :investigator_trials, foreign_key: :investigator_id, class_name: "Trial"

  accepts_nested_attributes_for :po_affiliations, allow_destroy: true

  validates :fname, presence: true
  validates :lname, presence: true

  before_destroy :check_for_organization
  after_create   :save_id_to_ctrp_id

  private

  def save_id_to_ctrp_id
    if self.source_context && self.source_context.code == "CTRP"
      self.ctrp_id = self.id
      self.source_id =self.id
      self.save!
    end
  end

  def check_for_organization
    unless po_affiliations.size == 0
      self.errors[:organization] << "Cannot delete Person while it belongs to an Organization."
      return false
    end
  end


  def self.nullify_duplicates(params)

    self.transaction do
      @toBeNullifiedPerson = Person.find_by_id(params[:id_to_be_nullified]);
      @toBeRetainedPerson =  Person.find_by_id(params[:id_to_be_retained]);
      #print "hello "+toBeRetainedPerson
      raise ActiveRecord::RecordNotFound if @toBeNullifiedPerson.nil? or @toBeRetainedPerson.nil?
      poAffiliationsOfNullifiedPerson = PoAffiliation.where(person_id:@toBeNullifiedPerson.id);

      poAffiliationsOfRetainedPerson  = PoAffiliation.where(person_id:@toBeRetainedPerson.id);

      orgs = poAffiliationsOfRetainedPerson.collect{|x| x.organization_id}

      ##Iterating through po_afilliations of to be nullified person and assigning to retained person.
      ##
      poAffiliationsOfNullifiedPerson.each do |po_affiliation|
        #new_po_aff=po_affiliation.clone;# Should be careful when choosing between dup and clone. See more details in Active Record dup and clone documentation.
        if(!orgs.include?po_affiliation.organization_id)
          po_affiliation.person_id=@toBeRetainedPerson.id;
          po_affiliation.save!
        else
          po_affiliation.destroy!
        end
      end

      ## Destroy associations of to_be_nullified_person
      ##

      ## Destroy to_be_nullified_person
      ##
      @toBeNullifiedPerson.source_status_id=SourceStatus.find_by_code('NULLIFIED').id;
      @toBeNullifiedPerson.save!
    end
  end

  # Scope definitions for people search
  scope :matches, -> (column, value) { where("people.#{column} = ?", "#{value}") }

  scope :with_source_context, -> (value) { joins(:source_context).where("source_contexts.name = ?", "#{value}") }

  scope :with_source_status, -> (value) { joins(:source_status).where("source_statuses.name = ?", "#{value}") }

  scope :matches_wc, -> (column, value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      where("people.#{column} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("people.#{column} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("people.#{column} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      where("people.#{column} ilike ?", "#{value}")
    end
  }

  scope :sort_by_col, -> (column, order) {
    if column == 'id' || column == 'updated_at'
      order("#{column} #{order}")
    elsif column == 'source_context'
      joins("LEFT JOIN source_contexts ON source_contexts.id = people.source_context_id").order("source_contexts.name #{order}").group(:'source_contexts.name')
    elsif column == 'source_status'
      joins("LEFT JOIN source_statuses ON source_statuses.id = people.source_status_id").order("source_statuses.name #{order}").group(:'source_statuses.name')
    elsif column == 'po_affiliation'
      joins("LEFT_JOIN_po_affiliations ON po_affiliations.id = people.po_affiliation_id").order("po_affiliations.id #{order}").group(:'po_affiliations.id')
    else
      order("LOWER(people.#{column}) #{order}")
    end
  }

  scope :affiliated_with_organization, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:organizations).where("organizations.name ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:organizations).where("organizations.name ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:organizations).where("organizations.name ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:organizations).where("organizations.name ilike ?", "#{value}")
    end
  }

  scope :updated_date_range, -> (dates) {
    start_date = DateTime.parse(dates[0])
    end_date = DateTime.parse(dates[1])
    where("people.updated_at BETWEEN ? and ?", start_date, end_date)
  }

end
