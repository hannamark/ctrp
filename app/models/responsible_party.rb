# == Schema Information
#
# Table name: responsible_parties
#
#  id         :integer          not null, primary key
#  code       :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#

class ResponsibleParty < ActiveRecord::Base
  include BasicConcerns

  validates :code, uniqueness: true
end
