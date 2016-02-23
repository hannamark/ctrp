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
#  created_at       :datetime
#  updated_at       :datetime
#  uuid             :string(255)
#  lock_version     :integer          default(0)
#  submission_id    :integer
#
# Indexes
#
#  index_trial_documents_on_added_by_id    (added_by_id)
#  index_trial_documents_on_submission_id  (submission_id)
#  index_trial_documents_on_trial_id       (trial_id)
#

class TrialDocument < TrialBase

  belongs_to :added_by, class_name: "User"
  belongs_to :trial
  belongs_to :submission

  cattr_accessor :replaced_doc_id

  mount_uploader :file, TrialDocumentUploader

  # Return true if this is the latest document uploaded in its document type
  def is_latest
    latest_doc = TrialDocument.where("trial_id = ? AND document_type = ?", self.trial_id, self.document_type).order(:id).last
    return latest_doc.id == self.id
  end
end
