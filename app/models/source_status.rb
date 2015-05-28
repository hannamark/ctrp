# == Schema Information
#
# Table name: source_statuses
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#  code       :string(255)
#  name       :string(255)
#

class SourceStatus < ActiveRecord::Base
  include BasicConcerns

  validates :code, uniqueness: true
end
