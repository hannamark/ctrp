json.trial_versions do
  json.array!(@trial_versions) do |trial_version|

    sub = TrialVersion.find_by_item_type_and_transaction_id("Submission",trial_version.transaction_id)
    submission = Submission.find_by_id(sub.item_id) if sub
    submission_type= SubmissionType.find_by_id(submission.submission_type_id) if submission
    p submission_type

    if submission && submission_type.name == "Update"
      json.extract! trial_version, :event, :created_at
      json.nci_id trial_version.object_changes["nci_id"]?  trial_version.object_changes["nci_id"][1] : nil
      json.lead_protocol_id trial_version.object_changes["lead_protocol_id"]?  trial_version.object_changes["lead_protocol_id"][1] : nil
      json.official_title trial_version.object_changes["official_title"]?  trial_version.object_changes["official_title"][1] : nil


      json.friends do
        subs=Submission.all
        json.array!(subs) do |sub|
          json.field "offcial title"
          json.old_value trial_version.object_changes["official_title"]?  trial_version.object_changes["official_title"][0] : nil
          json.new_value trial_version.object_changes["official_title"]?  trial_version.object_changes["official_title"][1] : nil
        end
      end



      json.submission_num submission.submission_num
          json.id submission.id
          json.submission_date submission.submission_date
          json.submission_source SubmissionSource.find_by_id(submission.submission_source_id).name
          json.acknowledge_comment submission.acknowledge_comment
          json.acknowledge_date submission.acknowledge_date
          json.acknowledged_by submission.acknowledged_by
          json.acknowledge submission.acknowledge
    end





  end
end
