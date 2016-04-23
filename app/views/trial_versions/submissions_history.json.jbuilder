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

    docs= TrialDocument.where("submission_id = ? ",submission.id);


    docs.each do |doc|
     if doc.source_document == "Registry"
       doc.source_document  = "Original"
     else
       doc.source_document = ""
     end
    end

    json.docs docs

    milestone = MilestoneWrapper.where("submission_id = ?", submission.id).reorder("created_at ASC").last

    if milestone
        milestone_date =  milestone.milestone_date
        milestone_name =  Milestone.find_by_id(milestone.milestone_id).name
        Array milestone = Array.new

        milestone.push(milestone_date)
        milestone.push(milestone_name)
        json.milestone milestone
    end


  end

end
