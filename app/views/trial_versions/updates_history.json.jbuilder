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





=begin
protocol
      |Other Protocol Identifiers|
      |Grant Information|
      |trial status|
      |trial status date|
      |start date
      |Start date type|
      |Primary Completion Date
      |Prmary Completion Date Type|
      |completion date
      |completion date type|
      |Trial Related Documents|
=end

     Array updated_fields_array = Array.new

      grants = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "Grant",trial_version.transaction_id)

      puts grants


      if grants
        Hash h = Hash.new
        h[:updated_filed]="Grant Information(Inst Code, Funding , SNo)";

        grants_string_N = ""
        grants_string_O =""
        delimiter = " |"
        grants.each do |o|
          case o.event
            when "destroy"
              p o.event
              institute_code_N = o.object["institute_code"]
              funding_mechanism_N = o.object["funding_mechanism"]
              serial_number_N = o.object["serial_number"]

              destroy_sign = " (D) "
              grants_string_N = grants_string_N + delimiter + institute_code_N.to_s + "   " + funding_mechanism_N.to_s + "  " + serial_number_N.to_s + destroy_sign + delimiter

              grants_string_O=""

            when "create" || "update"
              institute_code_N = o.object_changes["institute_code"][1]
              funding_mechanism_N = o.object_changes["funding_mechanism"][1]
              serial_number_N = o.object_changes["serial_number"][1]

              destroy_sign = " "
              grants_string_N = grants_string_N + delimiter + institute_code_N.to_s + "   " + funding_mechanism_N.to_s + "  " + serial_number_N.to_s + destroy_sign + delimiter

              institute_code_O = o.object_changes["institute_code"][0]
              funding_mechanism_O = o.object_changes["funding_mechanism"][0]
              serial_number_O = o.object_changes["serial_number"][0]

              grants_string_O = grants_string_O + delimiter + institute_code_O.to_s + "   " + funding_mechanism_O.to_s + "  " + serial_number_O.to_s + destroy_sign + delimiter


            else
              grants_string_O =   " "
              grants_string_N =   " "

          end

        end
        #end
        h[:new_value] = grants_string_N
        h[:old_value] = grants_string_O
        updated_fields_array.push(h)
      end





      json.friends do
        json.array!(updated_fields_array) do |h|
          json.field_name h[:updated_filed]
          json.old_value  h[:old_value]
          json.new_value  h[:new_value]
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
