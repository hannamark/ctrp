class PoAffiliationStatus < ActiveRecord::Base
  include BasicConcerns

  validates :name, presence: true
  #validates :code, presence: true

end
