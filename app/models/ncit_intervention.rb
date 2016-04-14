# == Schema Information
#
# Table name: ncit_interventions
#
#  id               :integer          not null, primary key
#  preferred_name   :string
#  synonyms         :string
#  description      :text
#  type_code        :string
#  ct_gov_type_code :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  ncit_status_id   :integer
#

class NcitIntervention < ActiveRecord::Base
  include BasicConcerns

  belongs_to :ncit_status
  
end
