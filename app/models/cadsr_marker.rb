class CadsrMarker < ActiveRecord::Base
  include BasicConcerns
  has_many :cadsr_marker_synonyms
  belongs_to :cadsr_marker_status

end
