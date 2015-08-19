# == Schema Information
#
# Table name: biomarker_purposes
#
#  id         :integer          not null, primary key
#  code       :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#

class BiomarkerPurpose < ActiveRecord::Base
end
