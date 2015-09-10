# == Schema Information
#
# Table name: trial_documents
#
#  id               :integer          not null, primary key
#  file             :string
#  file_name        :string(255)
#  document_type    :string(255)
#  document_subtype :string(255)
#  added_by_id      :integer
#  trial_id         :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string(255)
#
# Indexes
#
#  index_trial_documents_on_added_by_id  (added_by_id)
#  index_trial_documents_on_trial_id     (trial_id)
#

class TrialDocument < ActiveRecord::Base
  include BasicConcerns

  belongs_to :added_by, class_name: "User"
  belongs_to :trial

  mount_uploader :file, TrialDocumentUploader
end
