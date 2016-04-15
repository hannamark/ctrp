json.trial_versions do
  json.array!(@trial_versions) do |trial_version|
    json.extract! trial_version, :event, :created_at
    json.nci_id trial_version.object_changes["nci_id"]?  trial_version.object_changes["nci_id"][1] : nil
    json.lead_protocol_id trial_version.object_changes["lead_protocol_id"]?  trial_version.object_changes["lead_protocol_id"][1] : nil
    json.official_title trial_version.object_changes["official_title"]?  trial_version.object_changes["official_title"][1] : nil

    sub = TrialVersion.find_by_item_type_and_transaction_id("Submission",trial_version.transaction_id)
    submission = Submission.find_by_id(sub.item_id) if sub
    if submission
          json.submission_num submission.submission_num
          json.submission_date submission.submission_date
          json.submission_source SubmissionSource.find_by_id(submission.submission_source_id).name
          json.comment submission.acknowledge_comment
          json.date submission.acknowledge_date
          json.user submission.acknowledged_by
    end
  end
end
