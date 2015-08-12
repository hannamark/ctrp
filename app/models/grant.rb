# == Schema Information
#
# Table name: grants
#
#  id                :integer          not null, primary key
#  funding_mechanism :string(255)
#  institute_code    :string(255)
#  serial_number     :integer
#  nci               :string(255)
#  trial_id          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#
# Indexes
#
#  index_grants_on_trial_id  (trial_id)
#

class Grant < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
end
