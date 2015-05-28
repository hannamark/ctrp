# == Schema Information
#
# Table name: name_aliases
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  uuid            :string(255)
#  organization_id :integer
#
# Indexes
#
#  index_name_aliases_on_organization_id  (organization_id)
#

class NameAlias < ActiveRecord::Base
  include BasicConcerns

  belongs_to :organization
end
