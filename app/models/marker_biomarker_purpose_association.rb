class MarkerBiomarkerPurposeAssociation < ActiveRecord::Base
  include BasicConcerns
  belongs_to  :marker
  belongs_to  :biomarker_purpose
end
