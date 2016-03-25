# == Schema Information
#
# Table name: arms_groups
#
#  id                :integer          not null, primary key
#  label             :string(255)
#  description       :text
#  trial_id          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#  arms_groups_type  :string
#  intervention_text :string
#
# Indexes
#
#  index_arms_groups_on_trial_id  (trial_id)
#

class ArmsGroup < ActiveRecord::Base
  include BasicConcerns
  
  belongs_to :trial
end
