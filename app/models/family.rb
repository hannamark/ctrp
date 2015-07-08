# == Schema Information
#
# Table name: families
#
#  id               :integer          not null, primary key
#  name             :string(255)
#  description      :text
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

  validates :name, uniqueness: true

  before_destroy :check_for_organization

  private

  def check_for_organization
    unless family_memberships.size == 0
      self.errors[:organization] << "Cannot delete Family while an Organization belongs to it."
      return false
    end
  end
end
