json.trial_versions do
  json.array!(@trial_versions) do |trial_version|
    json.extract! trial_version, :event, :created_at
    json.nci_id trial_version.object_changes["nci_id"]?  trial_version.object_changes["nci_id"][1] : nil
    json.lead_protocol_id trial_version.object_changes["lead_protocol_id"]?  trial_version.object_changes["lead_protocol_id"][1] : nil
    json.official_title trial_version.object_changes["official_title"]?  trial_version.object_changes["official_title"][1] : nil
    json.program_code trial_version.object_changes["program_code"]?  trial_version.object_changes["program_code"][1] : nil
    json.grant_question trial_version.object_changes["grant_question"]?  trial_version.object_changes["grant_question"][1] : nil
    json.ind_ide_question trial_version.object_changes["ind_ide_question"]?  trial_version.object_changes["ind_ide_question"][1] : nil
    json.ind_ide_question trial_version.object_changes["pilot"]?  trial_version.object_changes["pilot"][1] : nil

    if trial_version.object_changes["study_source_id"]
      json.study_source StudySource.find_by_id(trial_version.object_changes["study_source_id"][1]).name
    end

    if trial_version.object_changes["phase_id"]
      json.phase Phase.find_by_id(trial_version.object_changes["phase_id"][1]).name
    end

    if trial_version.object_changes["responsible_party_id"]
      json.responsible_party ResponsibleParty.find_by_id(trial_version.object_changes["responsible_party_id"][1]).name
    end

    if trial_version.object_changes["primary_purpose_id"]
      json.primary_purpose PrimaryPurpose.find_by_id(trial_version.object_changes["primary_purpose_id"][1]).name
    end


    if trial_version.object_changes["pi_id"]
        per=Person.find_by_id(trial_version.object_changes["pi_id"][1])
      json.pi  per.fname + " , " + per.lname if per
    end

    if trial_version.object_changes["lead_org_id"]
      org=Organization.find_by_id(trial_version.object_changes["lead_org_id"][1])
      json.lead_org  org.name if org
    end

    if trial_version.object_changes["sponsor_id"]
      org=Organization.find_by_id(trial_version.object_changes["sponsor_id"][1])
      json.sponsor  org.name if org
    end


    if trial_version.object_changes["research_category_id"]
      json.research_category ResearchCategory.find_by_id(trial_version.object_changes["research_category_id"][1]).name
    end

    if trial_version.object_changes["accrual_disease_term_id"]
      json.accrual_disease_term AccrualDiseaseTerm.find_by_id(trial_version.object_changes["accrual_disease_term_id"][1]).name
    end

    json.start_date trial_version.object_changes["start_date"]?  trial_version.object_changes["start_date"][1] : nil
    json.start_date_qual trial_version.object_changes["start_date_qual"]?  trial_version.object_changes["start_date_qual"][1] : nil
    json.primary_comp_date trial_version.object_changes["primary_comp_date"]?  trial_version.object_changes["primary_comp_date"][1] : nil
    json.primary_comp_date_qual trial_version.object_changes["primary_comp_date_qual"]?  trial_version.object_changes["primary_comp_date_qual"][1] : nil
    json.comp_date trial_version.object_changes["comp_date"]?  trial_version.object_changes["comp_date"][1] : nil
    json.comp_date_qual trial_version.object_changes["comp_date_qual"]?  trial_version.object_changes["comp_date_qual"][1] : nil
    json.ind_ide_question trial_version.object_changes["ind_ide_question"]?  trial_version.object_changes["ind_ide_question"][1] : nil
    json.intervention_indicator trial_version.object_changes["intervention_indicator"]?  trial_version.object_changes["intervention_indicator"][1] : nil
    json.sec801_indicator trial_version.object_changes["sec801_indicator"]?  trial_version.object_changes["sec801_indicator"][1] : nil
    json.data_monitor_indicator trial_version.object_changes["data_monitor_indicator"]?  trial_version.object_changes["data_monitor_indicator"][1] : nil


    subs = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "Submission",trial_version.transaction_id)

    if subs
        subs.each do |sub|
           json.submission_number  sub.object_changes["submission_num"]?  sub.object_changes["submission_num"][1]:nil
           json.submission_date sub.object_changes["submission_date"]? sub.object_changes["submission_date"][1]:nil
           #json.submission_type sub.object_changes["submission_type_id"]? SubmissionMethod.find_by_id(sub.object_changes["submission_type_id"][1]).name:nil
        end
    end


    json.other_ids  ""
    other_ids = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "OtherId",trial_version.transaction_id)
     if other_ids
      other_ids_string = ""
      delimiter = ""
      other_ids.each do |o|
        case o.event
          when "destroy"
            #p o.object
            p o.event
            protocol_id = o.object["protocol_id"]
            protocol_id_origin_id = o.object["protocol_id_origin_id"]
          when "create" || "update"
            p o.event
            p o.object_changes
            protocol_id = o.object_changes["protocol_id"][1]
            protocol_id_origin_id = o.object_changes["protocol_id_origin_id"][1]
          else
            protocol_id =""
            protocol_id_origin_id=""
        end
        #name = ProtocolIdOrigin.find_by_protocol_id_origin_id(protocol_id_origin_id).pluck(:nam) if !protocol_id_origin_id
        #next if o.protocol_id_origin.nil?
        #name = o.protocol_id_origin.name
        #unless name.nil?
        #name.gsub!("Identifier", "")
        o.event == "destroy"? destroy_sign = " (D) " : destroy_sign=""

       p color_field_tag destroy_sign
        p destroy_sign
        other_ids_string = other_ids_string + delimiter + protocol_id.to_s + "   " + protocol_id_origin_id.to_s + destroy_sign
        delimiter = ";"

     end
      #end
      json.other_ids  other_ids_string

     end

    json.grants  ""
    grants = TrialVersion.where("item_type = ? AND transaction_id = ?  ", "Grant",trial_version.transaction_id)
    if grants

      puts grants

      grants_string = ""
      delimiter = ""
      grants.each do |o|
        case o.event
          when "destroy"
            p o.event
            institute_code = o.object["institute_code"]
            funding_mechanism = o.object["funding_mechanism"]
            serial_number = o.object["serial_number"]
          when "create" || "update"
            institute_code = o.object_changes["institute_code"][1]
            funding_mechanism = o.object_changes["funding_mechanism"][1]
            serial_number = o.object_changes["serial_number"][1]
          else
            institute_code = ""
            funding_mechanism = ""
            serial_number = ""
        end

        o.event == "destroy"? destroy_sign = " (D) " : destroy_sign=""
        grants_string = grants_string + delimiter + institute_code.to_s + "   " + funding_mechanism.to_s + "  " + serial_number.to_s + destroy_sign
        delimiter = ";"

      end
      #end
      json.grants  grants_string

    end


    json.created_by trial_version.object_changes["created_by"]?  trial_version.object_changes["created_by"][1] : nil
    json.updated_by trial_version.object_changes["updated_by"]?  trial_version.object_changes["updated_by"][1] : nil
    json.min_age trial_version.object_changes["min_age"]?  trial_version.object_changes["min_age"][1] : nil
    json.max_age trial_version.object_changes["max_age"]?  trial_version.object_changes["max_age"][1] : nil

    json.process_priority trial_version.object_changes["process_priority"]?  trial_version.object_changes["process_priority"][1] : nil
    json.process_comment trial_version.object_changes["process_comment"]?  trial_version.object_changes["process_comment"][1] : nil
    json.nih_nci_div trial_version.object_changes["nih_nci_div"]?  trial_version.object_changes["nih_nci_div"][1] : nil
    json.nih_nci_prog trial_version.object_changes["nih_nci_prog"]?  trial_version.object_changes["nih_nci_prog"][1] : nil


    if trial_version.object_changes["masking_id"]
      json.masking Masking.find_by_id(trial_version.object_changes["masking_id"][1]).name
    end

    json.investigator_id trial_version.object_changes["investigator_id"]?  trial_version.object_changes["investigator_id"][1] : nil
    json.nci_specific_comment trial_version.object_changes["nci_specific_comment"]?  trial_version.object_changes["nci_specific_comment"][1] : nil
    json.board_name trial_version.object_changes["board_name"]?  trial_version.object_changes["board_name"][1] : nil
    json.board_affiliation_id trial_version.object_changes["board_affiliation_id"]?  trial_version.object_changes["board_affiliation_id"][1] : nil
    json.board_approval_num trial_version.object_changes["board_approval_num"]?  trial_version.object_changes["board_approval_num"][1] : nil

    if trial_version.object_changes["board_approval_status_id"]
      json.board_approval_status BoardApprovalStatus.find_by_id(trial_version.object_changes["board_approval_status_id"][1]).name
    end



    json.url trial_version_url(trial_version, format: :json)
  end
end

