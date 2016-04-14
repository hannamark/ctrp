# == Schema Information
#
# Table name: marker_eval_type_associations
#
#  id                 :integer          not null, primary key
#  marker_id          :integer
#  evaluation_type_id :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  uuid               :string(255)
#  lock_version       :integer          default(0)
#

class MarkerEvalTypeAssociation < ActiveRecord::Base
  include BasicConcerns
  belongs_to  :marker
  belongs_to  :evaluation_type
end
