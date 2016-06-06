# == Schema Information
#
# Table name: arms_groups
#
#  id               :integer          not null, primary key
#  label            :string(255)
#  description      :text
#  trial_id         :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#  arms_groups_type :string
#
# Indexes
#
#  index_arms_groups_on_trial_id  (trial_id)
#

class ArmsGroup < ActiveRecord::Base
  include BasicConcerns
  
  belongs_to :trial
  has_many :arms_groups_interventions_associations, dependent: :destroy
  accepts_nested_attributes_for :arms_groups_interventions_associations, allow_destroy: true

end
