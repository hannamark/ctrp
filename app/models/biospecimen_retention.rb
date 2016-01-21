# == Schema Information
#
# Table name: biospecimen_retentions
#
#  id           :integer          not null, primary key
#  code         :string(255)
#  name         :string(255)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  uuid         :string(255)
#  lock_version :integer          default(0)
#

class BiospecimenRetention < ActiveRecord::Base
  include BasicConcerns
end