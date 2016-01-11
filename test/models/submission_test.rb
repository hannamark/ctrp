# == Schema Information
#
# Table name: submissions
#
#  id                   :integer          not null, primary key
#  submission_num       :integer
#  submission_date      :date
#  amendment_date       :date
#  amendment_reason_id  :integer
#  trial_id             :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  uuid                 :string(255)
#  lock_version         :integer          default(0)
#  amendment_num        :string(255)
#  submission_type_id   :integer
#  submission_source_id :integer
#  submission_method_id :integer
#  user_id              :integer
#
# Indexes
#
#  index_submissions_on_amendment_reason_id   (amendment_reason_id)
#  index_submissions_on_submission_method_id  (submission_method_id)
#  index_submissions_on_submission_source_id  (submission_source_id)
#  index_submissions_on_submission_type_id    (submission_type_id)
#  index_submissions_on_trial_id              (trial_id)
#  index_submissions_on_user_id               (user_id)
#

require 'test_helper'

class SubmissionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
