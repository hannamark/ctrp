class MarkerEvalTypeAssociation < ActiveRecord::Base
  belongs_to  :marker
  belongs_to  :evaluation_type
end
