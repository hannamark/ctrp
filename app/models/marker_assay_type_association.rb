class MarkerAssayTypeAssociation < ActiveRecord::Base
  belongs_to  :marker
  belongs_to  :assay_type
end
