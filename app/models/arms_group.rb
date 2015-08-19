# == Schema Information
#
# Table name: arms_groups
#
#  id          :integer          not null, primary key
#  label       :string(255)
#  type        :string(255)
#  description :text
#  trial_id    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  uuid        :string(255)
#
# Indexes
#
#  index_arms_groups_on_trial_id  (trial_id)
#

class ArmsGroup < ActiveRecord::Base
end
