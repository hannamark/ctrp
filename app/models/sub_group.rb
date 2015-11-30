# == Schema Information
#
# Table name: sub_groups
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  description  :text
#  trial_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#
# Indexes
#
#  index_sub_groups_on_trial_id  (trial_id)
#

class SubGroup < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
end
