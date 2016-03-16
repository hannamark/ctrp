class MarkerSynonym < ActiveRecord::Base
  include BasicConcerns

  belongs_to  :marker_cadsr

end
