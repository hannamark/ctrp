# == Schema Information
#
# Table name: families
#
#  id               :integer          not null, primary key
#  name             :string(255)
#  family_status_id :integer
#  family_type_id   :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string(255)
#
# Indexes
#
#  index_families_on_family_status_id  (family_status_id)
#  index_families_on_family_type_id    (family_type_id)
#

class Family < ActiveRecord::Base
  include BasicConcerns

  has_many :family_memberships
  has_many :organizations, through: :family_memberships
  belongs_to :family_status
  belongs_to :family_type
  accepts_nested_attributes_for  :family_memberships, allow_destroy: true

  validates :name, presence: true, uniqueness: true

  before_destroy :check_for_organization

  private

  def check_for_organization
    unless family_memberships.size == 0
      self.errors[:organization] << "Cannot delete Family while an Organization belongs to it."
      return false
    end
  end

  #scopes for search API
  scope :matches, -> (column, value) { where("families.#{column} = ?", "#{value}") }

  scope :with_family_status, -> (value) { joins(:family_status).where("family_statuses.name = ?", "#{value}") }
  scope :with_family_type, -> (value) { joins(:family_type).where("family_types.name = ?", "#{value}") }

  scope :matches_wc, -> (column, value) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      where("families.#{column} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("families.#{column} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("families.#{column} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      where("families.#{column} ilike ?", "#{value}")
    end
  }

  scope :sort_by_col, -> (column, order) {
    if column == 'id'
      order("#{column} #{order}")
    else
      order("LOWER(families.#{column}) #{order}")
    end
  }
end
