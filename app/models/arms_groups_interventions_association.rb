class ArmsGroupsInterventionsAssociation < ActiveRecord::Base
  include BasicConcerns

  belongs_to :arms_group
  belongs_to :intervention
end
