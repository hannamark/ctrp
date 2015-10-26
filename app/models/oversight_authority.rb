# == Schema Information
#
# Table name: oversight_authorities
#
#  id           :integer          not null, primary key
#  country      :string(255)
#  organization :string(255)
#  trial_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#
# Indexes
#
#  index_oversight_authorities_on_trial_id  (trial_id)
#

class OversightAuthority < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
end
