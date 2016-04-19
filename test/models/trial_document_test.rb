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
#  status           :string           default("active")
#  why_deleted      :string
#

require 'test_helper'

class TrialDocumentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
