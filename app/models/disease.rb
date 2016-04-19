# == Schema Information
#
# Table name: diseases
#
#  id               :integer          not null, primary key
#  preferred_name   :string(255)
#  code             :string(255)
#  thesaurus_id     :string(255)
#  display_name     :string(255)
#  parent_preferred :string(255)
#  trial_id         :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#  rank             :string(255)
#

class Disease < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial

  validates_uniqueness_of :thesaurus_id, scope: :trial_id
end
