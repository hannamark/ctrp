class CadsrMarkerSynonym < ActiveRecord::Base
  include BasicConcerns

  belongs_to  :cadsr_marker
  belongs_to :cadsr_marker_status

end
