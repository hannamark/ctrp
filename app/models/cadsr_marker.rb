class CadsrMarker < ActiveRecord::Base

  has_many :cadsr_marker_synonyms
  belongs_to :cadsr_marker_status

end
