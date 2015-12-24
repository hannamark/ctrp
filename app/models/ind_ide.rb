# == Schema Information
#
# Table name: ind_ides
#
#  id                      :integer          not null, primary key
#  ind_ide_type            :string(255)
#  grantor                 :string(255)
#  nih_nci                 :string(255)
#  holder_type_id          :integer
#  expanded_access_type_id :integer
#  trial_id                :integer
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  uuid                    :string(255)
#  lock_version            :integer          default(0)
#  expanded_access         :boolean
#  exempt                  :boolean
#  ind_ide_number          :string(255)
#
# Indexes
#
#  index_ind_ides_on_expanded_access_type_id  (expanded_access_type_id)
#  index_ind_ides_on_holder_type_id           (holder_type_id)
#  index_ind_ides_on_trial_id                 (trial_id)
#

class IndIde < ActiveRecord::Base
  include BasicConcerns

  belongs_to :expanded_access_type
  belongs_to :holder_type
  belongs_to :trial

  validates :ind_ide_type, presence: true
  validates :grantor, presence: true
  validates :holder_type, presence: true
  validates :ind_ide_number, presence: true
end
