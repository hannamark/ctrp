# == Schema Information
#
# Table name: source_clusters
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  uuid       :string(255)
#

class SourceCluster < ActiveRecord::Base
  include BasicConcerns

  has_many :organizations
end
