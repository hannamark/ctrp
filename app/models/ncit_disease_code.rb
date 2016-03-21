# == Schema Information
#
# Table name: ncit_disease_codes
#
#  id                :integer          not null, primary key
#  disease_code      :string(255)
#  nt_term_id        :string(255)
#  preferred_name    :string(1000)
#  menu_display_name :string(1000)
#  ncit_status_id    :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#  lock_version      :integer          default(0)
#
# Indexes
#
#  index_ncit_disease_codes_on_ncit_status_id  (ncit_status_id)
#

class NcitDiseaseCode < ActiveRecord::Base
  include BasicConcerns

  belongs_to :ncit_status
  has_many :ncit_disease_synonyms, -> { order 'ncit_disease_synonyms.id' }
  # Self-referential many-to-many
  has_many :child_ncit_disease_parents, class_name: "NcitDiseaseParent", foreign_key: "parent_id"
  has_many :children, through: :child_ncit_disease_parents
  has_many :parent_ncit_disease_parents, class_name: "NcitDiseaseParent", foreign_key: "child_id"
  has_many :parents, through: :parent_ncit_disease_parents
end
