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

class Link < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
end
