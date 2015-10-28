# == Schema Information
#
# Table name: organizations
#
#  id                :integer          not null, primary key
#  source_id         :string(255)
#  name              :string(255)
#  address           :string(255)
#  address2          :string(255)
#  city              :string(255)
#  state_province    :string(255)
#  postal_code       :string(255)
#  country           :string(255)
#  email             :string(255)
#  phone             :string(255)
#  fax               :string(255)
#  source_status_id  :integer
#  source_context_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  ctrp_id           :integer
#  created_by        :string
#  updated_by        :string
#
# Indexes
#
#  index_organizations_on_source_context_id  (source_context_id)
#  index_organizations_on_source_status_id   (source_status_id)
#

class Organization < ActiveRecord::Base
  include BasicConcerns

  has_many :name_aliases, dependent: :delete_all
  has_many :family_memberships
  has_many :families, through: :family_memberships
  has_many :po_affiliations
  has_many :people, through: :po_affiliations
  has_many :users
  belongs_to :source_status
  belongs_to :source_context
  belongs_to :source_cluster
  has_many :trial_funding_sources
  has_many :fs_trials, through: :trial_funding_sources, source: :trial
  has_many :trial_co_lead_orgs
  has_many :colo_trials, through: :trial_co_lead_orgs, source: :trial
  has_many :lo_trials, foreign_key: :lead_org_id, class_name: "Trial"
  has_many :sponsor_trials, foreign_key: :sponsor_id, class_name: "Trial"
  has_many :inv_aff_trials, foreign_key: :investigator_aff_id, class_name: "Trial"

  accepts_nested_attributes_for :name_aliases, allow_destroy: true

  validates :name, presence: true

  before_destroy :check_for_family
  before_destroy :check_for_person

  after_create   :save_id_to_ctrp_id

  # Get CTEP ID from the CTEP context org in the cluster, comma separate them if there are multiple
  def ctep_id
    ctep_id_arr = []
    ctep_id_arr = Organization.joins(:source_context).where("ctrp_id = ? AND source_contexts.code = ?", self.ctrp_id, "CTEP").pluck(:source_id) if self.ctrp_id.present?
    ctep_id_str = ""
    ctep_id_arr.each_with_index { |e, i|
      if i > 0
        ctep_id_str += ", #{e}"
      else
        ctep_id_str += e
      end
    }
    return ctep_id_str
  end


  def nullifiable
    isNullifiable =true;
    source_status_arr = []
    source_status_arr = Organization.joins(:source_context).where("ctrp_id = ? AND source_contexts.code = ?", self.ctrp_id, "CTEP").pluck(:"source_status_id") if self.ctrp_id.present?
    source_status_arr.each_with_index { |e, i|
      if SourceStatus.find_by_id(e).code == "ACT"
        isNullifiable = false;
      end
    }
    return isNullifiable
  end

  # Get an array of maps of the orgs with the same ctrp_id
  def cluster
    tmp_arr = []
    if self.ctrp_id.present?
      tmp_arr = Organization.joins(:source_context).where("ctrp_id = ?", self.ctrp_id).order(:id).pluck(:id, :"source_contexts.name")
    else
      tmp_arr.push([self.id, self.source_context ? self.source_context.name : ''])
    end

    cluster_arr = []
    tmp_arr.each do |org|
      cluster_arr.push({"id": org[0], "context": org[1]})
    end

    return cluster_arr
  end

  private

  def save_id_to_ctrp_id
    if self.source_context && self.source_context.code == "CTRP"
      self.ctrp_id = self.id
      self.source_id =self.id
      self.save!
    end
  end


  def check_for_family
    unless family_memberships.size == 0
      self.errors[:family] << "Cannot delete Organization while it belongs to a Family."
      return false
    end
  end

  def check_for_person
    unless po_affiliations.size == 0
      self.errors[:person] << "Cannot delete Organization while a Person is affiliated with it."
      return false
    end
  end

  def self.nullify_duplicates(params)

    self.transaction do
      @toBeNullifiedOrg = Organization.find_by_id(params[:id_to_be_nullified]);
      @toBeRetainedOrg =  Organization.find_by_id(params[:id_to_be_retained]);
      raise ActiveRecord::RecordNotFound if @toBeNullifiedOrg.nil? or @toBeRetainedOrg.nil?

      #sleep(2.minutes);

      #All references in CTRP to the nullified organization as Lead Organization will reference the retained organization as Lead Organization
      ##
       @toBeNullifiedOrg.lo_trials.each do |trial|
        p "To be nullified org lo trials " +trial.official_title;
        trial.lead_org_id=@toBeRetainedOrg.id;
        trial.save!;
       end


      #All references in CTRP to the nullified organization as Sponsor will reference the retained organization as Sponsor
      ##
      @toBeNullifiedOrg.sponsor_trials.each do |trial|
        p "To be nullified org sponsor trials " +trial.official_title;
        trial.sponsor_id=@toBeRetainedOrg.id;
        trial.save!;
      end

      #All references in CTRP to the nullified organization as Participating Site will reference the retained organization as Participating Site
      ## Future Implementation

      #All accrual submitted in CTRP on the nullified organization as a Participating Site will be transferred to the retained organization as a Participating Site
      ## Future Implementation

      #All persons affiliated with the nullified organization will be affiliated with the retained organization
      ##
      poAffiliationsOfNullifiedOrganization = PoAffiliation.where(organization_id:@toBeNullifiedOrg.id);

      poAffiliationsOfRetainedOrganization = PoAffiliation.where(organization_id:@toBeRetainedOrg.id);

      persons = poAffiliationsOfRetainedOrganization.collect{|x| x.person_id}

      poAffiliationsOfNullifiedOrganization.each do |po_affiliation|
        #new_po_aff=po_affiliation.clone;# Should be careful when choosing between dup and clone. See more details in Active Record dup and clone documentation.
        if(!persons.include?po_affiliation.person_id)
          po_affiliation.organization_id=@toBeRetainedOrg.id;
          po_affiliation.save!
        else
          po_affiliation.destroy!
        end

      end

      #Name of the Nullified organization will be listed as an alias on the retained organization
      ##
      NameAlias.create(organization_id:@toBeRetainedOrg.id,name:@toBeNullifiedOrg.name);

      ## Aliases of nullified organizations will be moved to aliases of the retained organization
      ##
        aliasesOfNullifiedOrganization = NameAlias.where(organization_id: @toBeNullifiedOrg.id);
        aliasesOfRetainedOrganization = NameAlias.where(organization_id: @toBeRetainedOrg.id);
        aliasesNamesOfRetainedOrganization = aliasesOfRetainedOrganization.collect{|x| x.name.upcase}

        aliasesOfNullifiedOrganization.each do |al|
        if(!aliasesNamesOfRetainedOrganization.include?al.name.upcase)
          al.organization_id=@toBeRetainedOrg.id;
          al.save!
        else
          al.destroy!
        end

      end

      #If both organizations had CTEP IDs only the retained organization CTEP ID will be associated with the retained organization


      #The status of the organization to be nullified will be "Nullified"
      ##
      @toBeNullifiedOrg.source_status_id=SourceStatus.find_by_code('NULLIFIED').id;
      @toBeNullifiedOrg.save!
    end

  end

  # Scope definitions for search
  scope :contains, -> (column, value) { where("organizations.#{column} ilike ?", "%#{value}%") }

  scope :matches, -> (column, value) { where("organizations.#{column} = ?", "#{value}") }

  scope :matches_wc, -> (column, value,user_role) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      where("organizations.#{column} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("organizations.#{column} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("organizations.#{column} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      if user_role != "ROLE_CURATOR"
        if !value.match(/\s/).nil?
          value=value.gsub! /\s+/, '%'
        end
        where("organizations.#{column} ilike ?", "%#{value}%")
      else
        where("organizations.#{column} ilike ?", "#{value}")
      end
    end
  }

  scope :matches_name_wc, -> (value,user_role) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "%#{value[1..str_len - 1]}", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "#{value[0..str_len - 2]}%", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "%#{value[1..str_len - 2]}%", "%#{value[1..str_len - 2]}%")
    else
        if user_role != "ROLE_CURATOR"
          if !value.match(/\s/).nil?
            value=value.gsub! /\s+/, '%'
          end
          joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "%#{value}%", "%#{value}%")
        else
          joins("LEFT JOIN name_aliases ON name_aliases.organization_id = organizations.id").where("organizations.name ilike ? OR name_aliases.name ilike ?", "#{value}", "#{value}")
      end
    end
  }

  scope :with_source_id, -> (value, ctrp_ids) {
    q = "organizations.source_id ilike ?"

    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      conditions = ["%#{value[1..str_len - 1]}"]
    elsif value[0] != '*' && value[str_len - 1] == '*'
      conditions = ["#{value[0..str_len - 2]}%"]
    elsif value[0] == '*' && value[str_len - 1] == '*'
      conditions = ["%#{value[1..str_len - 2]}%"]
    else
      conditions = ["#{value}"]
    end

    ctrp_ids.each_with_index { |e, i|
      if e != nil
        q += " OR organizations.ctrp_id = ?"
        conditions.push(e)
      end
    }
    conditions.insert(0, q)

    where(conditions)
  }

  scope :with_source_context, -> (value) { joins(:source_context).where("source_contexts.name = ?", "#{value}") }

  scope :with_source_status, -> (value) { joins(:source_status).where("source_statuses.name = ?", "#{value}") }

  scope :with_family, -> (value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      joins(:families).where("families.name ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      joins(:families).where("families.name ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      joins(:families).where("families.name ilike ?", "%#{value[1..str_len - 2]}%")
    else
      joins(:families).where("families.name ilike ?", "#{value}")
    end
  }

  scope :sort_by_col, -> (column, order) {
    if Organization.columns_hash[column] && Organization.columns_hash[column].type == :integer
      order("#{column} #{order}")
    elsif column == 'source_context'
      joins("LEFT JOIN source_contexts ON source_contexts.id = organizations.source_context_id").order("source_contexts.name #{order}").group(:'source_contexts.name')
    elsif column == 'source_status'
      joins("LEFT JOIN source_statuses ON source_statuses.id = organizations.source_status_id").order("source_statuses.name #{order}").group(:'source_statuses.name')
    else
      order("LOWER(organizations.#{column}) #{order}")
    end
  }
  scope :updated_date_range, -> (dates) {
    start_date = DateTime.parse(dates[0])
    end_date = DateTime.parse(dates[1])
    where("organizations.updated_at BETWEEN ? and ?", start_date, end_date)
  }
end
