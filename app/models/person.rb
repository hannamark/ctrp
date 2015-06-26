# == Schema Information
#
# Table name: people
#
#  id                :integer          not null, primary key
#  source_id         :string(255)
#  name              :string(255)
#  prefix            :string(255)
#  suffix            :string(255)
#  email             :string(255)
#  phone             :string(255)
#  source_status_id  :integer
#  source_context_id :integer
#  source_cluster_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#
# Indexes
#
#  index_people_on_source_cluster_id  (source_cluster_id)
#  index_people_on_source_context_id  (source_context_id)
#  index_people_on_source_status_id   (source_status_id)
#

class Person < ActiveRecord::Base
  include BasicConcerns

  has_many :po_affiliations
  has_many :organizations, through: :po_affiliations
  belongs_to :source_status
  belongs_to :source_context
  belongs_to :source_cluster
end
