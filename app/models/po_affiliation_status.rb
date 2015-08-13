# == Schema Information
#
# Table name: po_affiliation_statuses
#
#  id         :integer          not null, primary key
#  code       :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#

class PoAffiliationStatus < ActiveRecord::Base
  include BasicConcerns

  validates :name, presence: true
  #validates :code, presence: true

end
