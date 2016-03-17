class MarkerSpecTypeAssociation < ActiveRecord::Base
  belongs_to  :marker
  belongs_to  :specimen_type
end
