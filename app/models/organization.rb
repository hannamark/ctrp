# == Schema Information
#
# Table name: organizations
#
#  id                :integer          not null, primary key
#  po_id             :integer
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
#  source_cluster_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#
# Indexes
#
#  index_organizations_on_source_cluster_id  (source_cluster_id)
#  index_organizations_on_source_context_id  (source_context_id)
#  index_organizations_on_source_status_id   (source_status_id)
#

class Organization < ActiveRecord::Base
  include BasicConcerns

  has_many :name_aliases
  has_many :family_memberships
  has_many :families, through: :family_memberships
  belongs_to :source_status
  belongs_to :source_context
  belongs_to :source_cluster

  validates :po_id, uniqueness: true
  validates :name, presence: true

  # Scope definitions used for search
  scope :contains, -> (column, value) { where("organizations.#{column} ilike ?", "%#{value}%") }
  scope :matches, -> (column, value) { where("organizations.#{column} = ?", "#{value}") }
  scope :matches_wc, -> (column, value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      where("organizations.#{column} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("organizations.#{column} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("organizations.#{column} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      where("organizations.#{column} ilike ?", "#{value}")
    end
  }
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
end
