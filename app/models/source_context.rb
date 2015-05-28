# == Schema Information
#
# Table name: source_contexts
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#  code       :string(255)
#  name       :string(255)
#

class SourceContext < ActiveRecord::Base
  include BasicConcerns

  validates :code, uniqueness: true
end
