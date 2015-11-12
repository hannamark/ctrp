# == Schema Information
#
# Table name: links
#
#  id           :integer          not null, primary key
#  url          :text
#  description  :text
#  trial_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#
# Indexes
#
#  index_links_on_trial_id  (trial_id)
#

class Link < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
end
