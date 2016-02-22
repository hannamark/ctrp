class Ws::ApiTrialsController < Ws::BaseApiController

  @@masterKeyMap = Hash.new();

  @@masterKeyMap.store("phase","required")
  @@masterKeyMap.store("accrualDiseaseTerminology","required")
  @@masterKeyMap.store("primaryPurpose","required")
  @@masterKeyMap.store("summary4FundingSponsor","required")
  @@masterKeyMap.store("trialStartDate","required")
  @@masterKeyMap.store("primaryCompletionDate","required")
  @@masterKeyMap.store("completionDate","required")
  @@masterKeyMap.store("grant","required")
  @@masterKeyMap.store("category","required")
  @@masterKeyMap.store("title","required")
  @@masterKeyMap.store("leadOrganization","required")
  @@masterKeyMap.store("sponsor","required")
  @@masterKeyMap.store("pi","required")
  @@masterKeyMap.store("responsibleParty","required")
  @@masterKeyMap.store("protocolDocument","required")
  @@masterKeyMap.store("irbApprovalDocument","required")
  @@masterKeyMap.store("participatingSitesDocument","notrequired")
  @@masterKeyMap.store("informedConsentDocument","notrequired")
  @@masterKeyMap.store("otherDocument","notrequired")




  #load_master_key_map()


  before_filter only: [:create] do

    string = request.body.read
    @docs =Array.new()

    begin
    bad_doc = Nokogiri::XML(string) { |config| config.options = Nokogiri::XML::ParseOptions::STRICT }
    rescue Nokogiri::XML::SyntaxError => e
    puts "caught exception: #{e}"
    end

    @errors =Hash.new
    @trialMasterMap = Hash.new
    @trialService = TrialService.new
    @trialMasterMap["coming_from"] = "rest"


    if request.content_type == "application/xml"
        @object = Hash.from_xml(string)
        puts "before raw input"
        puts @object
        puts "after raw output"
        #doc = Nokogiri::XML(string)
        #@object=Hash.from_xml(doc.to_s)
      else
        @errors.store("xml request body is not wellformed","");
    end


    if !@object.has_key?("CompleteTrialRegistration")
      @errors.store("tns:CompleteTrialRegistration","this node has to be included in the request; Parent node for this request");
    else
      trialkeys = @object["CompleteTrialRegistration"]
    end


      trialkeys.has_key?("leadOrgTrialID") ? @trialMasterMap.store("lead_protocol_id",trialkeys["leadOrgTrialID"]) : @errors.store("leadOrgTrialID", "please verify its not existed")





    if !@errors.empty?
      render xml: @errors, status: :bad_request
    else

       @validate_errors = Hash.new();
       @grants=Array.new()
       @trial_funding_sources=Array.new
       @trialDocs = Array.new
       @trial_status_wrapper=Array.new();
       @other_ids = Array.new()
       @ind_ides=Array.new

         @@masterKeyMap.each do | key, v |
         process_entity(trialkeys,key)
         end

       @trialMasterMap.store("program_code",trialkeys["programCode"]) if trialkeys.has_key?("programCode")

       process_trialstatus(trialkeys)
       process_regulatory_section(trialkeys)
       process_pilot(trialkeys)
       process_other_trial_id(trialkeys)

       if trialkeys.has_key?("ind") || trialkeys.has_key?("ide")
         process_ind_ides(trialkeys)
       else
         @validate_errors.store("tns:ide/tns:ind","Either tns:ind or tnd:ide expected")
       end

       @trialMasterMap.store("trial_documents_attributes",@trialDocs);

       render xml: @validate_errors, status: :bad_request if !@validate_errors.empty?

    end

end # end of before_create

  before_filter only: [:update] do
    @docs =Array.new()

    if params.has_key?("idType")
      if params[:idType] == "nci"
        @trial = Trial.find_by_nci_id(params[:id])
      else
        render xml: "expected idtypes are nci,pa,dcp,ctep but currently nci is accepting", status: :bad_request
      end
    else
      @trial = Trial.find_by_id(params[:id])
    end
    render nothing: true, status: :not_found unless @trial.present?

    string =request.body.read
    p request.body.read


    if request.content_type == "application/xml"
      @object = Hash.from_xml(string)
    else
      @errors.store("xml request body is not wellformed","");
    end


    p @object

    if !@object.has_key?("CompleteTrialUpdate")
      @errors.store("tns:CompleteTrialUpdate","this node has to be included in the request; Parent node for this request");
    end

    trialkeys = @object["CompleteTrialUpdate"]
    p trialkeys
    @trialMasterMap = Hash.new
    @validate_errors = Hash.new

    process_entity(trialkeys,"accrualDiseaseTerminology")


    @grants=Array.new()

    if trialkeys.has_key?("grant")
      delete_x(trialkeys,Grant,@grants,"grants_attributes")
      process_grants(trialkeys)
    end

    @trial_status_wrapper=Array.new();
    delete_x(trialkeys,TrialStatusWrapper,@trial_status_wrapper,"trial_status_wrappers_attributes")
    process_trialstatus(trialkeys)

    process_entity(trialkeys,"trialStartDate")
    process_entity(trialkeys,"primaryCompletionDate")
    process_entity(trialkeys,"completionDate")



    @trialDocs = Array.new

    process_entity(trialkeys,"protocolDocument")
    process_entity(trialkeys,"irbApprovalDocument")
    process_entity(trialkeys,"participatingSitesDocument")
    process_entity(trialkeys,"informedConsentDocument")
    process_entity(trialkeys,"otherDocument")

    @trialMasterMap.store("trial_documents_attributes",@trialDocs);

    @trialMasterMap["coming_from"] = "rest"
    @trialMasterMap["edit_type"] = "update"

    p @trialMasterMap

    render xml: @validate_errors, status: :bad_request if !@validate_errors.empty?

    #@trialMasterMap["accrual_disease_term_id"]
  end




  before_filter only: [:amend] do
    @docs =Array.new()

    if params.has_key?("idType")
      if params[:idType] == "nci"
        @trial = Trial.find_by_nci_id(params[:id])
      else
        render xml: "expected idtypes are nci,pa,dcp,ctep but currently nci is accepting", status: :bad_request
      end
    else
      @trial = Trial.find_by_id(params[:id])
    end
    render nothing: true, status: :not_found unless @trial.present?

    string =request.body.read
    @trialMasterMap = Hash.new
    @validate_errors = Hash.new
    @errors = Hash.new



    if request.content_type == "application/xml"
      @object = Hash.from_xml(string)
    else
      @errors.store("xml request body is not wellformed","");
    end


    if !@object.has_key?("CompleteTrialAmendment")
      @errors.store("tns:CompleteTrialAmendment","this node has to be included in the request; Parent node for this request");
    end


    render xml: @errors, status: :bad_request if !@errors.empty?

    trialkeys = @object["CompleteTrialAmendment"]
    p trialkeys


    process_entity(trialkeys,"accrualDiseaseTerminology")


    @grants=Array.new()

    if trialkeys.has_key?("grant")
      delete_x(trialkeys,Grant,@grants,"grants_attributes")
      process_grants(trialkeys)
    end

    @trial_status_wrapper=Array.new();

    delete_x(trialkeys,TrialStatusWrapper,@trial_status_wrapper,"trial_status_wrappers_attributes")
    process_trialstatus(trialkeys)

    process_entity(trialkeys,"trialStartDate")
    process_entity(trialkeys,"primaryCompletionDate")
    process_entity(trialkeys,"completionDate")



    @trialDocs = Array.new

    process_entity(trialkeys,"protocolDocument")
    process_entity(trialkeys,"irbApprovalDocument")
    process_entity(trialkeys,"participatingSitesDocument")
    process_entity(trialkeys,"informedConsentDocument")
    process_entity(trialkeys,"otherDocument")


    ############Lead Org, Sponosor, PI #############

    if trialkeys.has_key?("leadOrganization") && trialkeys["leadOrganization"].has_key?("existingOrganization")

      process_lead_org_id(trialkeys)

    end

    ########## Sponosr
    if trialkeys.has_key?("sponsor") && trialkeys["sponsor"].has_key?("existingOrganization")
      process_sponsor(trialkeys)
    end

    ##############PI


    if trialkeys.has_key?("pi") && trialkeys["pi"].has_key?("existingPerson")
      process_pi(trialkeys)
    end

   ##############Amendment Specific Params###################

    if @object.has_key?("amendmentDate")
     # @trialMasterMap["comp_date_qual"]=trialkeys["amendmentDate"]
    else
      #@validate_errors.store("tns:amendmentDate","this node has to be included in the request;");

    end

    if trialkeys.has_key?("changeMemoDocument")

      process_docs(trialkeys["changeMemoDocument"],"Change Memo Document")

    end

    if trialkeys.has_key?("changeMemoDocument")

      process_docs(trialkeys["changeMemoDocument"],"Change Memo Document")

    end

    if trialkeys.has_key?("protocolHighlightDocument")

      process_docs(trialkeys["protocolHighlightDocument"],"Protocol Highlighted Document")

    end


    #################################################
    if trialkeys.has_key?("leadOrgTrialID")
      @trialMasterMap.store("lead_protocol_id",trialkeys["leadOrgTrialID"])
    end

    @other_ids = Array.new()
    delete_x(trialkeys,OtherId,@other_ids,"other_ids_attributes")
    process_other_trial_id(trialkeys)

######################### Trial Details AMENDMENT################

    #title official_title

    if trialkeys.has_key?("title")
      @trialMasterMap["official_title"]=trialkeys["title"]
    end

    process_entity(trialkeys,"phase")
    process_entity(trialkeys,"primaryPurpose")
    process_pilot(trialkeys)

    ####Funding Sources
    @trial_funding_sources=Array.new

    if trialkeys.has_key?("summary4FundingSponsor")
      delete_x(trialkeys,TrialFundingSource,@trial_funding_sources,"trial_funding_sources_attributes")
      process_funding_sponsor(trialkeys)

    end

    ### Program Code

    if trialkeys.has_key?("programCode")
      @trialMasterMap.store("program_code",trialkeys["programCode"]);
    end


    ########IND_IDES#########

    @ind_ides=Array.new
    if trialkeys.has_key?("ind") || trialkeys.has_key?("ide")
      delete_x(trialkeys,IndIde,@ind_ides,"ind_ides_attributes")
      process_ind_ides(trialkeys)
    end

    ##################################################

    @trialMasterMap.store("trial_documents_attributes",@trialDocs);

    @trialMasterMap["coming_from"] = "rest"
    @trialMasterMap["edit_type"] = "amend"

    #p @trialMasterMap

    render xml: @validate_errors, status: :bad_request if !@validate_errors.empty?

    #@trialMasterMap["accrual_disease_term_id"]
  end





  def create
    puts @trialMasterMap
    @trial= Trial.new(@trialMasterMap)
    #@person.assign_attributes(@json['person'])
    if @trial.save
      if request.content_type == "application/json"
        puts "**********"
        print response
        puts "***********"
        render json: @trial
        return
      elsif request.content_type == "application/xml"
        len = @docs.length
        if len > 0
          for i in 0..len-1
            temp=@docs[i]
            File.delete(temp)
          end
        end
        render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)

      else

      end
    else
      render nothing: true, status: :bad_request
      return
    end

    #end
  end


  def update

    if @trial.update(@trialMasterMap)
      if request.content_type == "application/json"
        render json: @trial
      elsif request.content_type == "application/xml"
        render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
      else

      end
    else
      render nothing: true, status: :bad_request
    end
  end



  def amend
    p @trialMasterMap

    if @trial.update(@trialMasterMap)
      if request.content_type == "application/json"
        render json: @trial
      elsif request.content_type == "application/xml"
        render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
      else

      end
    else
      render nothing: true, status: :bad_request
    end
  end



  private

  def process_docs(dochash,document_type)

    p dochash["filename"]
    p dochash["__content__"]

    filename = dochash["filename"]
    content = dochash["__content__"]
    content.gsub!('\\r', "\r")
    content.gsub!('\\n', "\n")
    decode_base64_content = Base64.decode64(content)


       @trialprotocolDocMap = Hash.new
       out_file = File.new(filename, "w")
       out_file.puts(decode_base64_content)
       @docs.push(filename)

       @trialprotocolDocMap.store("file",out_file)
       @trialprotocolDocMap.store("file_name",filename)
       @trialprotocolDocMap.store("document_type",document_type)
       @trialDocs.push(@trialprotocolDocMap)

  end


  def find_trial

    if params.has_key?("idType")
      if params[:idType] == "nci"
        @trial = Trial.find_by_nci_id(params[:id])
      else
        render xml: "expected idtypes are nci,pa,dcp,ctep but currently nci is accepting", status: :bad_request
      end
    else
      @trial = Trial.find_by_id(params[:id])
    end
    render nothing: true, status: :not_found unless @trial.present?
    p request.body.read
    @trialMasterMap = Hash.new
    #@trialMasterMap["accrual_disease_term_id"]

  end

  def process_accrual_diseageterminology(trialkeys)
      if AccrualDiseaseTerm.find_by_name(trialkeys["accrualDiseaseTerminology"])
        @trialMasterMap["accrual_disease_term_id"]=AccrualDiseaseTerm.find_by_name(trialkeys["accrualDiseaseTerminology"]).id
      else
       pluck_and_save_error(AccrualDiseaseTerm,"accrualDiseaseTerminology")
      end
  end

def process_category(trialkeys)
  if StudySource.find_by_name(trialkeys["category"])
    @trialMasterMap["study_source_id"]=StudySource.find_by_name(trialkeys["category"]).id
  else
    pluck_and_save_error(StudySource,"category")
  end
end


  def process_grants(trialkeys)

    if trialkeys["grant"].kind_of?(Array)
        if trialkeys["grant"].length > 0
          len=trialkeys["grant"].length

          puts "grants length *********>>>>>>>> "

          puts trialkeys["grant"]

          puts len
          for i in 0..len-1
            if trialkeys["grant"][i].has_key?("fundingMechanism") #&& trialkeys["grant"][i].has_key?("nihInstitutionCode") && trialkeys["grant"][i].has_key?("serialNumber") && trialkeys["grant"][i].has_key?("nciDivisionProgramCode")

              fundingMechanism=trialkeys["grant"][i]["fundingMechanism"]
              nihInstitutionCode=trialkeys["grant"][i]["nihInstitutionCode"]
              serialNumber=trialkeys["grant"][i]["serialNumber"]
              nciDivisionProgramCode=trialkeys["grant"][i]["nciDivisionProgramCode"]

              myHash= Hash.new();
              myHash.store("funding_mechanism",fundingMechanism);
              myHash.store("institute_code",nihInstitutionCode);
              myHash.store("serial_number",serialNumber);
              myHash.store("nci",nciDivisionProgramCode);

              @grants.push(myHash);

            else
              @validate_errors.store("tns:grant"," For each grant fundingMechanism, nihInstitutionCode, serialNumber, nciDivisionProgramCode expected;")
              break;
            end

          end

        end
      else
        if trialkeys["grant"].has_key?("fundingMechanism") && trialkeys["grant"].has_key?("nihInstitutionCode") && trialkeys["grant"].has_key?("serialNumber") && trialkeys["grant"].has_key?("nciDivisionProgramCode")

          fundingMechanism=trialkeys["grant"]["fundingMechanism"]
          nihInstitutionCode=trialkeys["grant"]["nihInstitutionCode"]
          serialNumber=trialkeys["grant"]["serialNumber"]
          nciDivisionProgramCode=trialkeys["grant"]["nciDivisionProgramCode"]

          myHash= Hash.new();
          myHash.store("funding_mechanism",fundingMechanism);
          myHash.store("institute_code",nihInstitutionCode);
          myHash.store("serial_number",serialNumber);
          myHash.store("nci",nciDivisionProgramCode);

          @grants.push(myHash);
        end
      end
      @trialMasterMap.store("grants_attributes",@grants);

  end





  def process_trialstatus(trialkeys)
     trial_status_map=Hash.new();
     TrialStatus.find_by_name(trialkeys["trialStatus"]) ?  trial_status_map["trial_status_id"]=TrialStatus.find_by_name(trialkeys["trialStatus"]).id : pluck_and_save_error(TrialStatus,"trialStatus")
     trial_status_map["status_date"]=trialkeys["trialStatusDate"] if trialkeys.has_key?("trialStatusDate")
     trial_status_map["why_stopped"]=trialkeys["whyStopped"] if trialkeys.has_key?("whyStopped")
     @trial_status_wrapper.push(trial_status_map);
     @trialMasterMap.store("trial_status_wrappers_attributes",@trial_status_wrapper) if !trial_status_map.empty?
  end



  def process_trial_date(trialkeys,date_attr,date_qual_str,date_str)
    if !trialkeys[date_attr].kind_of?(Array) && ( trialkeys[date_attr]["type"].to_s.downcase == "Anticipated".to_s.downcase || trialkeys[date_attr]["type"].to_s.down_case == "Actual".to_s.downcase)
      @trialMasterMap[date_qual_str]=trialkeys[date_attr]["type"];
      @trialMasterMap[date_str]=trialkeys[date_attr]["__content__"];
    else
      @validate_errors.store(date_attr,"Exatly one date expected; or valid types are Anticipated and Actual ")

    end
  end

  def process_other_trial_id(trialkeys)


     clinical_id_map=Hash.new()
     other_id_map =Hash.new()

   if trialkeys.has_key?("clinicalTrialsDotGovTrialID")

       clinical_id_map["protocol_id_origin_id"]=ProtocolIdOrigin.find_by_name("ClinicalTrials.gov Identifier").id
       clinical_id_map["protocol_id"]=trialkeys["clinicalTrialsDotGovTrialID"]
       @other_ids.push(clinical_id_map);

  end

  if trialkeys.has_key?("otherTrialID")

       other_id_map["protocol_id_origin_id"]=ProtocolIdOrigin.find_by_name("Other Identifier").id
       other_id_map["protocol_id"]=trialkeys["otherTrialID"]
       @other_ids.push(other_id_map);

  end

 @trialMasterMap.store("other_ids_attributes",@other_ids) if @other_ids.any?

  end


  def process_regulatory_section(trialkeys)

   # oversight_authorities_attributes: [:id, :country, :organization, :_destroy],
   #:responsible_party_id

   #:intervention_indicator, :sec801_indicator, :data_monitor_indicator,
   if trialkeys.has_key?("regulatoryInformation")

     if trialkeys["regulatoryInformation"].has_key?("country") && trialkeys["regulatoryInformation"].has_key?("authorityName")

       country=trialkeys["regulatoryInformation"]["country"]
       authorityName= trialkeys["regulatoryInformation"]["authorityName"]
       oversight_authorities=Array.new()
       oversight_map =Hash.new();

       oversight_map["country"]=country
       oversight_map["organization"]=authorityName

       oversight_authorities.push(oversight_map)

       @trialMasterMap.store("oversight_authorities_attributes",oversight_authorities)

     end

     if trialkeys["regulatoryInformation"].has_key?("section801")
       sec=trialkeys["regulatoryInformation"]["section801"]
         if sec.to_s.downcase == "true".to_s.downcase

           @trialMasterMap.store("sec801_indicator","Yes");

         elsif sec.to_s.downcase == "false".to_s.downcase

           @trialMasterMap.store("sec801_indicator","No");

         else

           @trialMasterMap.store("sec801_indicator","N/A");

         end
     end


     if trialkeys["regulatoryInformation"].has_key?("dataMonitoringCommitteeAppointed")
       sec=trialkeys["regulatoryInformation"]["dataMonitoringCommitteeAppointed"]
       if sec.to_s.downcase == "true".to_s.downcase

         @trialMasterMap.store("data_monitor_indicator","Yes");

       elsif sec.to_s.downcase == "false".to_s.downcase

         @trialMasterMap.store("data_monitor_indicator","No");

       else

         @trialMasterMap.store("data_monitor_indicator","N/A");

       end

     end


     if trialkeys["regulatoryInformation"].has_key?("fdaRegulated")
       sec=trialkeys["regulatoryInformation"]["fdaRegulated"]

       if sec.to_s.downcase == "true".to_s.downcase

         @trialMasterMap.store("intervention_indicator","Yes");

       elsif sec.to_s.downcase == "false".to_s.downcase

         @trialMasterMap.store("intervention_indicator","No");
       else
         @trialMasterMap.store("intervention_indicator","N/A");

       end

     end
   end



  end


    def process_responsible_party(trialkeys)
     if ResponsibleParty.find_by_name(trialkeys["responsibleParty"]["type"])
        @trialMasterMap["responsible_party_id"]=ResponsibleParty.find_by_name(trialkeys["responsibleParty"]["type"]).id
      else
        pluck_and_save_error(ResponsibleParty,"responsibleParty")
      end
     end




  ############

 def process_organization(trialkeys,keyname,org_attr)

   if !trialkeys[keyname].has_key?("existingOrganization")

   @validate_errors.store("tns:leadOrganization","Lead organization expected; with existingOrganization with active status and CTRP Context")

   else

     if trialkeys[keyname]["existingOrganization"].has_key?("poID")
     org =trialkeys[keyname]["existingOrganization"]["poID"]
     trialService=TrialService.new
     trialService.active_ctrp_org_count(org) > 0 ? @trialMasterMap[org_attr]=org : @validate_errors.store("tns:sponsor","Not existed Org in CTRP 5.X ; expected active and CTRP org")
   else
     @validate_errors.store(keyname,"this node is exoected")
   end
   end

 end

  def process_pi(trialkeys)
    if !trialkeys["pi"].has_key?("existingPerson")
      @validate_errors.store("tns:pi","pi person expected; with existingPerson with active status and CTRP Context")
    else
      if trialkeys["pi"]["existingPerson"].has_key?("poID")
      pi =trialkeys["pi"]["existingPerson"]["poID"]
      trialService=TrialService.new
      trialService.active_ctrp_person_count(pi) > 0 ? @trialMasterMap["pi_id"]=pi : @validate_errors.store("tns:pi","given pi not existed Person in CTRP 5.X ; expected active and CTRP person")
    else
      @validate_errors.store("tns:pi","pi node missing; this node is exoected")
    end
    end

  end




  def process_primary_purpose(trialkeys)

    if PrimaryPurpose.find_by_name(trialkeys["primaryPurpose"])
      @trialMasterMap["primary_purpose_id"]=PrimaryPurpose.find_by_name(trialkeys["primaryPurpose"]).id
      #trialkeys.delete("primaryPurpose")
      if trialkeys["primaryPurpose"].to_s.downcase=="Other".downcase
        if trialkeys.has_key?("primaryPurposeOtherDescription")
          @trialMasterMap["primary_purpose_other"]= trialkeys["primaryPurposeOtherDescription"]
        else
          @validate_errors.store("tns:primaryPurposeOtherDescription","When primaryPurpose is other; primaryPurposeOtherDescription expected with minimum length of 1");
        end
      end
      trialkeys.delete("primaryPurpose")
    else
           pluck_and_save_error(PrimaryPurpose,"primaryPurpose")

    end

  end

  def process_secondary_purpose(trialkeys)

    if PrimaryPurpose.find_by_name(trialkeys["primaryPurpose"])
      @trialMasterMap["primary_purpose_id"]=PrimaryPurpose.find_by_name(trialkeys["primaryPurpose"]).id
      #trialkeys.delete("primaryPurpose")
      if trialkeys["primaryPurpose"].to_s.downcase=="Other".downcase
        if trialkeys.has_key?("primaryPurposeOtherDescription")
          @trialMasterMap["primary_purpose_other"]= trialkeys["primaryPurposeOtherDescription"]
        else
          @validate_errors.store("tns:primaryPurposeOtherDescription","When primaryPurpose is other; primaryPurposeOtherDescription expected with minimum length of 1");
        end
      end
      trialkeys.delete("primaryPurpose")
    else
      pluck_and_save_error(PrimaryPurpose,"primaryPurpose")
    end

  end


  def process_phase(trialkeys)
    Phase.find_by_name(trialkeys["phase"]) ?  @trialMasterMap["phase_id"]=Phase.find_by_name(trialkeys["phase"]).id : pluck_and_save_error(Phase,"phase")
  end

  def pluck_and_save_error(x,xattr)
   @validate_errors.store(xattr,"Invalid value:following are valid values;")
   @validate_errors.store("validvalues",x.pluck(:name));
  end


  def process_pilot(trialkeys)
      if trialkeys.has_key?("pilot")
        if trialkeys["pilot"].to_s.downcase == "true".to_s.downcase
            @trialMasterMap.store("pilot","Yes");
        elsif trialkeys["pilot"].to_s.downcase == "false".to_s.downcase
            @trialMasterMap.store("pilot","No");
        else
            @validate_errors.store("tns:pilot","True, False are valid values;;");
         end
      end
  end



  def process_funding_sponsor(trialkeys)
  if trialkeys["summary4FundingSponsor"].kind_of?(Array)
  if trialkeys["summary4FundingSponsor"].length > 0
    len=trialkeys["summary4FundingSponsor"].length
    #puts len
    for i in 0..len-1
      if trialkeys["summary4FundingSponsor"][i].has_key?("existingOrganization")
        poID=trialkeys["summary4FundingSponsor"][i]["existingOrganization"]["poID"]
        count = Organization.where("ctrp_id=?", poID).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTRP").id,SourceStatus.find_by_name("Active").id).count;
        if count > 0
          myHash= Hash.new();
          myHash.store("organization_id",poID);
          @trial_funding_sources.push(myHash);
        else
          @validate_errors.store("tns:summary4FundingSponsor","org not existed "+poID)
          break;
        end
      else
        @validate_errors.store("tns:summary4FundingSponsor","One or more of these nodes are missing existingOrganization")
        break;
      end

    end

  end

  else
    if trialkeys["summary4FundingSponsor"].has_key?("existingOrganization")
      poID=trialkeys["summary4FundingSponsor"]["existingOrganization"]["poID"]
      count = Organization.where("ctrp_id=?", poID).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTRP").id,SourceStatus.find_by_name("Active").id).count;
      if count > 0
        myHash= Hash.new();
        myHash.store("organization_id",poID);
        @trial_funding_sources.push(myHash);
      else
        @validate_errors.store("tns:summary4FundingSponsor","org not existed "+poID)
      end
    else
      @validate_errors.store("tns:summary4FundingSponsor","missing existingOrganization")
    end

  end

  @trialMasterMap.store("trial_funding_sources_attributes",@trial_funding_sources);
  end

  def process_ind_ides(trialkeys)

      if trialkeys.has_key?("ind")
        if trialkeys["ind"].kind_of?(Array)
          if trialkeys["ind"].length > 0
            len=trialkeys["ind"].length
            puts trialkeys["ind"]
            puts len
            for i in 0..len-1
              if trialkeys["ind"][i].has_key?("number") && trialkeys["ind"][i].has_key?("grantor") && trialkeys["ind"][i].has_key?("holderType")

                number=trialkeys["ind"][i]["number"]
                grantor=trialkeys["ind"][i]["grantor"]
                holderType=trialkeys["ind"][i]["holderType"]
                holderTypeId= HolderType.find_by_name(holderType).id;
                myHash= Hash.new();
                myHash.store("ind_ide_type","ind");
                myHash.store("ind_ide_number",number);
                myHash.store("grantor",grantor);
                myHash.store("holder_type_id",holderTypeId);

                @ind_ides.push(myHash);
                # ind_ides_attributes: [:id, :ind_ide_type, :ind_ide_number, :grantor, :holder_type_id, :nih_nci, :expanded_access, :expanded_access_type_id, :exempt, :_destroy],
              else
                @validate_errors.store("tns:ind"," For each ind  number, grantor, holderType expected;")
                break;
              end

            end

          end
        else
          if trialkeys["ind"].has_key?("number") && trialkeys["ind"].has_key?("grantor") && trialkeys["ind"].has_key?("holderType")
            number=trialkeys["ind"]["number"]
            grantor=trialkeys["ind"]["grantor"]
            holderType=trialkeys["ind"]["holderType"]
            holderTypeId= HolderType.find_by_name(holderType).id;

            myHash= Hash.new();
            myHash.store("ind_ide_type","ind");
            myHash.store("ind_ide_number",number);
            myHash.store("grantor",grantor);
            myHash.store("holder_type_id",holderTypeId);

            @ind_ides.push(myHash);
          else
            @validate_errors.store("tns:ind"," number, grantor, holderType expected;")

          end
        end

      end

      if trialkeys.has_key?("ide")
        if trialkeys["ide"].kind_of?(Array)
          if trialkeys["ide"].length > 0
            len=trialkeys["ide"].length


            puts trialkeys["ide"]

            puts len
            for i in 0..len-1
              if trialkeys["ide"][i].has_key?("number") && trialkeys["ide"][i].has_key?("grantor") && trialkeys["ide"][i].has_key?("holderType")

                number=trialkeys["ide"][i]["number"]
                grantor=trialkeys["ide"][i]["grantor"]
                holderType=trialkeys["ide"][i]["holderType"]
                holderTypeId= HolderType.find_by_name(holderType).id;
                myHash= Hash.new();
                myHash.store("ind_ide_type","ide");
                myHash.store("ind_ide_number",number);
                myHash.store("grantor",grantor);
                myHash.store("holder_type_id",holderTypeId);

                @ind_ides.push(myHash);
                # ind_ides_attributes: [:id, :ind_ide_type, :ind_ide_number, :grantor, :holder_type_id, :nih_nci, :expanded_access, :expanded_access_type_id, :exempt, :_destroy],
              else
                @validate_errors.store("tns:ide"," For each ide  number, grantor, holderType expected;")
                break;
              end

            end

          end
        else
          if trialkeys["ide"].has_key?("number") && trialkeys["ide"].has_key?("grantor") && trialkeys["ide"].has_key?("holderType")
            number=trialkeys["ide"]["number"]
            grantor=trialkeys["ide"]["grantor"]
            holderType=trialkeys["ide"]["holderType"]
            holderTypeId= HolderType.find_by_name(holderType).id;

            myHash= Hash.new();
            myHash.store("ind_ide_type","ide");
            myHash.store("ind_ide_number",number);
            myHash.store("grantor",grantor);
            myHash.store("holder_type_id",holderTypeId);

            @ind_ides.push(myHash);
          else
            @validate_errors.store("tns:ide"," number, grantor, holderType expected;")

          end
        end

      end
      @trialMasterMap.store("ind_ides_attributes",@ind_ides);

  end



  def delete_x(trialkeys,x,xarray,xname)

    existing_x = Array.new()

    existing_x = x.where(trial_id: @trial.id).pluck(:id)

    len = existing_x.length

     if len > 0
        for i in 0..len-1
          myHash= Hash.new();
          myHash.store("id", existing_x[i])
          myHash.store("_destroy","true")
          xarray.push(myHash);
         end
        @trialMasterMap.store(xname,xarray);

     end

  end

  def   load_master_key_map
   ##@@masterKeyMap

  end

  def process_title(trialkeys)
    trialkeys["title"].nil? ? @validate_errors.store("tns:title","Title can not be null") : @trialMasterMap["official_title"]=trialkeys["title"]
  end

def process_entity(trialkeys,attr)

  @@masterKeyMap[attr] == "required" && !trialkeys.has_key?(attr) ?  @validate_errors.store(attr , "Required") : make_corresponding_call(trialkeys,attr)

end

  def make_corresponding_call(trialkeys,attr)
   case attr
     when "phase"
         process_phase(trialkeys)
     when "accrualDiseaseTerminology"
        process_accrual_diseageterminology(trialkeys)
     when "primaryPurpose"
       process_primary_purpose(trialkeys)
     when "summary4FundingSponsor"
     process_funding_sponsor(trialkeys)
     when  "trialStartDate"
       process_trial_date(trialkeys,"trialStartDate","start_date_qual","start_date")
     when  "primaryCompletionDate"
       process_trial_date(trialkeys,"primaryCompletionDate","primary_comp_date_qual","primary_comp_date")
     when  "completionDate"
       process_trial_date(trialkeys,"completionDate","comp_date_qual","comp_date")
     when "grant"
       process_grants(trialkeys)
     when "category"
       process_category(trialkeys)
     when "title"
       process_title(trialkeys)
     when "leadOrganization"
       process_organization(trialkeys,"leadOrganization","lead_org_id")
     when "sponsor"
       process_organization(trialkeys,"sponsor","sponsor_id")
     when "pi"
       process_pi(trialkeys)
     when "responsibleParty"
       process_responsible_party(trialkeys)
     when "protocolDocument"
       process_docs(trialkeys["protocolDocument"],"Protocol Document" )
     when "irbApprovalDocument"
       process_docs(trialkeys["irbApprovalDocument"], "IRB Approval")
     when "participatingSitesDocument"
       process_docs(trialkeys["participatingSitesDocument"], "List of Participating Sites")
     when "informedConsentDocument"
       process_docs(trialkeys["informedConsentDocument"], "Informed Consent")
     when "otherDocument"
       process_docs(trialkeys["otherDocument"], "Other Document")
     else
       p "nothing"
   end

 end


end #main end