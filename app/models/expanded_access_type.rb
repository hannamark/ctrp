# == Schema Information
#
# Table name: expanded_access_types
#
#  id         :integer          not null, primary key
#  code       :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#

class ExpandedAccessType < ActiveRecord::Base
  include BasicConcerns

  validates :code, uniqueness: true
end
