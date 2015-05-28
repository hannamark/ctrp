# == Schema Information
#
# Table name: family_relationships
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#  code       :string(255)
#  name       :string(255)
#

class FamilyRelationship < ActiveRecord::Base
  include BasicConcerns

  validates :code, uniqueness: true
end
