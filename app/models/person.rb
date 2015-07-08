# == Schema Information
#
# Table name: people
#
#  id                :integer          not null, primary key
#  source_id         :string(255)
#  name              :string(255)
#  prefix            :string(255)
#  suffix            :string(255)
#  email             :string(255)
#  phone             :string(255)
#  source_status_id  :integer
#  source_context_id :integer
#  source_cluster_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#
# Indexes
#
#  index_people_on_source_cluster_id  (source_cluster_id)
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

  validates :name, presence: true

  before_destroy :check_for_organization

  private

  def check_for_organization
    unless po_affiliations.size == 0
      self.errors[:organization] << "Cannot delete Person while it belongs to an Organization."
      return false
    end
  end

  # Scope definitions for people search
  scope :matches, -> (column, value) { where("people.#{column} = ?", "#{value}") }

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
    if column == 'id'
      order("#{column} #{order}")
    elsif column == 'source_status'
      joins("LEFT JOIN source_statuses ON source_statuses.id = people.source_status_id").order("source_statuses.name #{order}").group(:'source_statuses.name')
    else
      order("LOWER(people.#{column}) #{order}")
    end
  }
end
