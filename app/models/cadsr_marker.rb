# == Schema Information
#
# Table name: cadsr_markers
#
#  id                     :integer          not null, primary key
#  name                   :string(2000)
#  meaning                :string(2000)
#  description            :text
#  cadsr_id               :integer
#  nv_term_identifier     :string(200)
#  pv_name                :string(2000)
#  cadsr_marker_status_id :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  uuid                   :string(255)
#  lock_version           :integer          default(0)
#
# Indexes
#
#  index_cadsr_markers_on_cadsr_marker_status_id  (cadsr_marker_status_id)
#

class CadsrMarker < ActiveRecord::Base
  include BasicConcerns
  has_many :cadsr_marker_synonyms
  belongs_to :cadsr_marker_status

  private

  scope :matches_wc, -> (column, value,wc_search) {
    str_len = value.length
    if value[0] == '*' && value[str_len - 1] != '*'
      where("cadsr_markers.#{column} ilike ?", "%#{value[1..str_len - 1]}")
    elsif value[0] != '*' && value[str_len - 1] == '*'
      where("cadsr_markers.#{column} ilike ?", "#{value[0..str_len - 2]}%")
    elsif value[0] == '*' && value[str_len - 1] == '*'
      where("cadsr_markers.#{column} ilike ?", "%#{value[1..str_len - 2]}%")
    else
      if wc_search == "No"
        if !value.match(/\s/).nil?
          value=value.gsub! /\s+/, '%'
        end
        where("cadsr_markers.#{column} ilike ?", "%#{value}%")
      else
        where("cadsr_markers.#{column} ilike ?", "#{value}")
      end
    end
  }

end
