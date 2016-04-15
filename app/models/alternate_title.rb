# == Schema Information
#
# Table name: alternate_titles
#
#  id           :integer          not null, primary key
#  category     :string(255)
#  title        :text
#  trial_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#  source       :string
#

class AlternateTitle < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
end
