json.trial_versions do
  json.array!(@submissions) do |submission|

    json.submission_num submission.submission_num
    json.id submission.id
    json.submission_date submission.submission_date
    submission_type = SubmissionType.find_by_id(submission.submission_type_id).name
    Array submission_type_list= Array.new
    submission_type_list.push(submission_type)

    if submission_type=="Amendment"
      submission_type_list.push('Date: ' + submission.amendment_date.to_s)
      submission_type_list.push('Reason: ' +submission.amendment_reason_id.to_s)
      submission_type_list.push('Number: '  +submission.amendment_num.to_s)
    end

    json.submission_type submission_type
    json.submission_type_list submission_type_list

    submission_version = TrialVersion.find_by_item_type_and_item_id("Submission", submission.id)

    doc = TrialDocument.find_by_id(24)

    json.doc_id doc.id
    json.doc_name doc.file_name

  end

end
