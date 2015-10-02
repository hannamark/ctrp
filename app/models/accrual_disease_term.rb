# == Schema Information
#
# Table name: accrual_disease_terms
#
#  id         :integer          not null, primary key
#  code       :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#

class AccrualDiseaseTerm < ActiveRecord::Base
end
