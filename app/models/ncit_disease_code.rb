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

  def self.import_ncit
    FileUtils.rm_rf('../../storage/ncit')
    FileUtils.mkdir_p('../../storage/ncit')

    url = AppSetting.find_by_code('NCI_THESAURUS_URL').value
    file_names = AppSetting.find_by_code('NCI_THESAURUS_FILES').big_value.split(',')

    file_names.each do |file_name|
      File.open("../../storage/ncit/#{file_name}", 'wb') do |fo|
        fo.write open(url + file_name).read
      end

      Zip::File.open("../../storage/ncit/#{file_name}") do |zipfile|
        zipfile.each do |entry|
          xml = Nokogiri::XML(entry.get_input_stream.read)
        end
      end
    end
  end
end
