# == Schema Information
#
# Table name: sub_groups
#
#  id           :integer          not null, primary key
#  label        :string(255)
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
  after_create :save_index

  private
   def save_index
      max=SubGroup.maximum('index')
      if max.nil?
        p "max"
        new_index=0
      else
        new_index=max.next
      end
        self.index=new_index
        self.save!
    end

end
