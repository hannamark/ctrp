class ArmsGroupsInterventionsAssociation < ActiveRecord::Base
  belongs_to :arms_group
  belongs_to :intervention
end
