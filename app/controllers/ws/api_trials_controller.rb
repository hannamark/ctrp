class Ws::ApiTrialsController < Ws::BaseApiController


  #before_filter :find_trial, only: [:update]
  before_filter :sam, only: [:change_status]

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




    if !@errors.empty?
    #render xml:errors, status: :bad_request and return
    end


    ###############Pre Baci validation such as CompleteTrialRegistartion, category node existence checking #####################


    if !@object.has_key?("CompleteTrialRegistration")
      @errors.store("tns:CompleteTrialRegistration","this node has to be included in the request; Parent node for this request");
      #render xml: errors, status: :bad_request and return

    else
      trialkeys = @object["CompleteTrialRegistration"]
      if !trialkeys.has_key?("category")
        @errors.store("tns:category","this node has to be included in the request;");
       # render xml: errors, status: :bad_request and return

      else
        @study_sources = StudySource.pluck(:name);

        if !@study_sources.collect {|el| el.downcase }.include? trialkeys["category"].downcase
          @errors.store("tns:category","Invalid value:following are valid values");
          @errors.store("tns:category:validvalues",@study_sources);
        #render xml: errors, status: :bad_request and return
        else
          @trialMasterMap["study_source_id"]=StudySource.find_by_name(trialkeys["category"]).id
        end

      end

      if !trialkeys.has_key?("leadOrgTrialID")
        @errors.store("leadOrgTrialID", "please verify its not existed")
      else
        @trialMasterMap.store("lead_protocol_id",trialkeys["leadOrgTrialID"])

      end

    end


    if !@errors.empty?
      render xml: @errors, status: :bad_request
    else
       @validate_errors = Hash.new();
    #############################################################################################################################




    ##################################################### VALIDATE Data #########################################################



    ###############============>>>>>>> TrailDetails   <<<<<<<<<<<<<<<<=================###################

    #Phase phase_id

    if trialkeys.has_key?("phase")
      process_phase(trialkeys)
    else
      @validate_errors.store("tns:phase","this node has to be included in the request;");
      #render xml: errors, status: :bad_request
    end


    #accrualDiseaseTerminology  accrual_disease_term_id
       if trialkeys.has_key?("accrualDiseaseTerminology")
         process_accrual_diseageterminology(trialkeys)
       else
         @validate_errors.store("tns:accrualDiseaseTerminology","accrualDiseaseTerminology expected;");
       end

#pilot
     process_pilot(trialkeys)


    #title official_title

       if !trialkeys.has_key?("title")
      @validate_errors.store("tns:title","title expected;");
      #render xml: errors, status: :bad_request
    else
      if trialkeys["title"].nil?
        @validate_errors.store("tns:title","Title can not be null");
        #render xml: errors, status: :bad_request
      else
        @trialMasterMap["official_title"]=trialkeys["title"]
      #trialkeys.delete("title")
      end
    end

    #Primary Purpose
    if trialkeys.has_key?("primaryPurpose")
      process_primary_purpose(trialkeys)
    else
      @validate_errors.store("tns:primaryPurpose","primaryPurpose is expected");
      #render xml: validate_errors, status: :bad_request
    end


    ###############============>>>>>>> TrailDetails Ending   <<<<<<<<<<<<<<<<=================###################

########Other_IDS#######

       @other_ids = Array.new()
       process_other_trial_id(trialkeys)

#############################




    ###############============>>>>>>> Trail Lead,Pi,Sposor (Refractoring)   <<<<<<<<<<<<<<<<=================###################

  ###lead_org_id
    if trialkeys.has_key?("leadOrganization") && trialkeys["leadOrganization"].has_key?("existingOrganization")


      process_lead_org_id(trialkeys)

    else

      @validate_errors.store("tns:leadOrganization","Lead organization expected; with existingOrganization with active status and CTRP Context")

#        render xml: errors, status: :bad_request
      end

########## Sponosr
    if trialkeys.has_key?("sponsor") && trialkeys["sponsor"].has_key?("existingOrganization")


    process_sponsor(trialkeys)

    else

      @validate_errors.store("tns:sponsor","sponsor organization expected; with existingOrganization with active status and CTRP Context")

#        render xml: errors, status: :bad_request
    end



##############PI


    if trialkeys.has_key?("pi") && trialkeys["pi"].has_key?("existingPerson")

     process_pi(trialkeys)
    else

      @validate_errors.store("tns:pi","pi person expected; with existingPerson with active status and CTRP Context")

#        render xml: errors, status: :bad_request
    end


################################ IND/IDE ##########################

       @ind_ides=Array.new
       if trialkeys.has_key?("ind") || trialkeys.has_key?("ide")
         process_ind_ides(trialkeys)
       else
         @validate_errors.store("tns:ide/tns:ind","Either tns:ind or tnd:ide expected")

       end

  ####Funding Sources
       @trial_funding_sources=Array.new

if trialkeys.has_key?("summary4FundingSponsor")

  process_funding_sponsor(trialkeys)

else
  @validate_errors.store("tns:summary4FundingSponsor","summary4FundingSponsor expected;")

end

### Program Code

    if trialkeys.has_key?("programCode")
     @trialMasterMap.store("program_code",trialkeys["programCode"]);
    end


    ################################################################################################################################
#### Grants
      @grants=Array.new()
      if trialkeys.has_key?("grant")
      process_grants(trialkeys)
      else
        @validate_errors.store("tns:grant","grant expected;")
       end


    ##########################Trial Status && Trial Dates########################################################################################################


       @trial_status_wrapper=Array.new();

       process_trialstatus(trialkeys)


       if trialkeys.has_key?("trialStartDate")
       process_trial_start_date(trialkeys)
       else
         @validate_errors.store("tns:trialStartDate","trialStartDate expected;")
       end


       if trialkeys.has_key?("primaryCompletionDate")
         process_trial_primary_completion_date(trialkeys)
       else
         @validate_errors.store("tns:primaryCompletionDate","primaryCompletionDate expected;")
       end


       if trialkeys.has_key?("completionDate")
         process_trial_completion_date(trialkeys)
       else
         @validate_errors.store("tns:completionDate","completionDate expected;")
       end

    ####################

       process_regulatory_section(trialkeys)
       process_responsible_party(trialkeys)

    #############
    ############ *****************  TRIAL DOCS ******************  ##########################


       @trialDocs = Array.new

       if trialkeys.has_key?("protocolDocument")

         process_docs(trialkeys["protocolDocument"],"Protocol Document" )
       else
         @validate_errors.store("tns:protocolDocument","completionDate expected;")
       end


       if trialkeys.has_key?("irbApprovalDocument")

         process_docs(trialkeys["irbApprovalDocument"], "IRB Approval")
       else
         @validate_errors.store("tns:irbApprovalDocument","irbApprovalDocument expected;")
       end

       if trialkeys.has_key?("participatingSitesDocument")

         process_docs(trialkeys["participatingSitesDocument"], "List of Participating Sites")

       end

       if trialkeys.has_key?("informedConsentDocument")

         process_docs(trialkeys["informedConsentDocument"], "Informed Consent")

       end

       if trialkeys.has_key?("otherDocument")

         process_docs(trialkeys["otherDocument"], "Other Document")

       end


       @trialMasterMap.store("trial_documents_attributes",@trialDocs);



    #########################################################################################



    ##################################################################################################################################


       render xml: @validate_errors, status: :bad_request if !@validate_errors.empty?

    end
    puts "************* Master Map ****************"
    puts @trialMasterMap
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

    if trialkeys.has_key?("accrualDiseaseTerminology")
      process_accrual_diseageterminology(trialkeys)
    end

    @grants=Array.new()

    if trialkeys.has_key?("grant")
      delete_grants(trialkeys)
      process_grants(trialkeys)
    end

    @trial_status_wrapper=Array.new();
    delete_trialstatus(trialkeys)
    process_trialstatus(trialkeys)


       if trialkeys.has_key?("trialStartDate")
       process_trial_start_date(trialkeys)
      end


       if trialkeys.has_key?("primaryCompletionDate")
         process_trial_primary_completion_date(trialkeys)
       end



       if trialkeys.has_key?("completionDate")
         process_trial_completion_date(trialkeys)
       end


    @trialDocs = Array.new

    if trialkeys.has_key?("protocolDocument")

      process_docs(trialkeys["protocolDocument"], "Protocol Document")

    end


    if trialkeys.has_key?("irbApprovalDocument")

      process_docs(trialkeys["irbApprovalDocument"], "IRB Approval")

    end

    if trialkeys.has_key?("participatingSitesDocument")

      process_docs(trialkeys["participatingSitesDocument"], "List of Participating Sites")

    end

    if trialkeys.has_key?("informedConsentDocument")

      process_docs(trialkeys["informedConsentDocument"],"Informed Consent")

    end

    if trialkeys.has_key?("otherDocument")

      process_docs(trialkeys["otherDocument"], "Other Document")

    end





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


    if trialkeys.has_key?("accrualDiseaseTerminology")
      process_accrual_diseageterminology(trialkeys)
    end

    @grants=Array.new()

    if trialkeys.has_key?("grant")
      delete_grants(trialkeys)
      process_grants(trialkeys)
    end

    @trial_status_wrapper=Array.new();
    delete_trialstatus(trialkeys)
    process_trialstatus(trialkeys)


       if trialkeys.has_key?("trialStartDate")
       process_trial_start_date(trialkeys)
      end


       if trialkeys.has_key?("primaryCompletionDate")
         process_trial_primary_completion_date(trialkeys)
       end



       if trialkeys.has_key?("completionDate")
         process_trial_completion_date(trialkeys)
       end


    @trialDocs = Array.new

    if trialkeys.has_key?("protocolDocument")

      process_docs(trialkeys["protocolDocument"],"Protocol Document")

    end


    if trialkeys.has_key?("irbApprovalDocument")

      process_docs(trialkeys["irbApprovalDocument"],"IRB Approval")

    end

    if trialkeys.has_key?("participatingSitesDocument")

      process_docs(trialkeys["participatingSitesDocument"],"List of Participating Sites")

    end

    if trialkeys.has_key?("informedConsentDocument")

      process_docs(trialkeys["informedConsentDocument"],"Informed Consent")

    end

    if trialkeys.has_key?("otherDocument")

      process_docs(trialkeys["otherDocument"],"Other Document")

    end




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
    delete_other_trial_ids(trialkeys)
    process_other_trial_id(trialkeys)

######################### Trial Details AMENDMENT################

    #title official_title

    if trialkeys.has_key?("title")
      @trialMasterMap["official_title"]=trialkeys["title"]
    end

    #Primary Purpose
    if trialkeys.has_key?("primaryPurpose")
      process_primary_purpose(trialkeys)
    end

    #Phase phase_id

    if trialkeys.has_key?("phase")
      process_phase(trialkeys)
    end

    #pilot
    process_pilot(trialkeys)

    ####Funding Sources
    @trial_funding_sources=Array.new

    if trialkeys.has_key?("summary4FundingSponsor")
      delete_funding_sponsor(trialkeys)
      process_funding_sponsor(trialkeys)

    end

    ### Program Code

    if trialkeys.has_key?("programCode")
      @trialMasterMap.store("program_code",trialkeys["programCode"]);
    end


    ########IND_IDES#########

    @ind_ides=Array.new
    if trialkeys.has_key?("ind") || trialkeys.has_key?("ide")
      delete_ind_ides(trialkeys)
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
        @accrualdiseaseterms = AccrualDiseaseTerm.pluck(:name);
        @validate_errors.store("tns:accrualDiseaseTerminology","Invalid value:following are valid values;")
        @validate_errors.store("tns:accrualDiseaseTerminology:validvalues",@accrualdiseaseterms);
      end

end


  def delete_grants(trialkeys)

    existing_grants = Array.new()

    existing_grants = Grant.where(trial_id: @trial.id).pluck(:id)

    len = existing_grants.length
     if len > 0
        for i in 0..len-1
          myHash= Hash.new();
          myHash.store("id", existing_grants[i])
          myHash.store("_destroy","true")
          @grants.push(myHash);
         end
        @trialMasterMap.store("grants_attributes",@grants);

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



  def delete_trialstatus(trialkeys)
    existing_trialstatuses = Array.new()

    existing_trialstatuses = TrialStatusWrapper.where(trial_id: @trial.id).pluck(:id)

    len = existing_trialstatuses.length
    if len > 0
      for i in 0..len-1
        myHash= Hash.new();
        myHash.store("id", existing_trialstatuses[i])
        myHash.store("_destroy","true")
        @trial_status_wrapper.push(myHash);
      end
      @trialMasterMap.store("trial_status_wrappers_attributes",@trial_status_wrapper);

    end
  end


  def process_trialstatus(trialkeys)


     trial_status_map=Hash.new();
     if trialkeys.has_key?("trialStatus")
       if TrialStatus.find_by_name(trialkeys["trialStatus"])
         trial_status_map["trial_status_id"]=TrialStatus.find_by_name(trialkeys["trialStatus"]).id
         trialkeys.delete("trialStatus")
       else
         @trialstatusses = TrialStatus.pluck(:name);
         @validate_errors.store("tns:trialStatus","Invalid value:following are valid values;")
         @validate_errors.store("tns:trialStatus:validvalues",@trialstatusses);
       end
     end

     if trialkeys.has_key?("trialStatusDate")
       trial_status_map["status_date"]=trialkeys["trialStatusDate"]
       trialkeys.delete("trialStatusDate")
     end
     if trialkeys.has_key?("whyStopped")
       trial_status_map["why_stopped"]=trialkeys["whyStopped"]
       trialkeys.delete("whyStopped")
     end

     @trial_status_wrapper.push(trial_status_map);
     @trialMasterMap.store("trial_status_wrappers_attributes",@trial_status_wrapper) if !trial_status_map.empty?

   end


  def  process_trial_start_date(trialkeys)

  if !trialkeys["trialStartDate"].kind_of?(Array) && ( trialkeys["trialStartDate"]["type"].to_s.downcase == "Anticipated".to_s.downcase || trialkeys["trialStartDate"]["type"].to_s.downcase == "Actual".to_s.downcase )
  @trialMasterMap["start_date_qual"]=trialkeys["trialStartDate"]["type"];
  @trialMasterMap["start_date"]=trialkeys["trialStartDate"]["__content__"];
  else
    @validate_errors.store("tns:trialStartDate","exactly one trialStartDate expected; or valid types are Anticipated and Actual ")

  end
    end


  def process_trial_primary_completion_date(trialkeys)
  if !trialkeys["primaryCompletionDate"].kind_of?(Array) && ( trialkeys["primaryCompletionDate"]["type"].to_s.downcase == "Anticipated".to_s.downcase || trialkeys["primaryCompletionDate"]["type"].to_s.down_case == "Actual".to_s.downcase)
    @trialMasterMap["primary_comp_date_qual"]=trialkeys["primaryCompletionDate"]["type"];
    @trialMasterMap["primary_comp_date"]=trialkeys["primaryCompletionDate"]["__content__"];
  else
    @validate_errors.store("tns:primaryCompletionDate","exactly one primaryCompletionDate expected; or valid types are Anticipated and Actual ")

  end
end


  def process_trial_completion_date(trialkeys)
       if !trialkeys["completionDate"].kind_of?(Array) && ( trialkeys["completionDate"]["type"].to_s.downcase == "Anticipated".to_s.downcase || trialkeys["completionDate"]["type"].to_s.down_case == "Actual".to_s.downcase)
           @trialMasterMap["comp_date_qual"]=trialkeys["trialStartDate"]["type"];
           @trialMasterMap["comp_date"]=trialkeys["trialStartDate"]["__content__"];
        else
           @validate_errors.store("tns:completionDate","exactly one completionDate expected; or valid types are Anticipated and Actual ")

         end
end


  def delete_other_trial_ids(trialkeys)

    existing_others = Array.new()

    existing_others = OtherId.where(trial_id: @trial.id).pluck(:id)

    len = existing_others.length
    if len > 0
      for i in 0..len-1
        myHash= Hash.new();
        myHash.store("id", existing_others[i])
        myHash.store("_destroy","true")
        @other_ids.push(myHash);
      end
      @trialMasterMap.store("other_ids_attributes",@other_ids);

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


     def process_responsible_party(trialkeys)

       if trialkeys.has_key?("responsibleParty")

     if ResponsibleParty.find_by_name(trialkeys["responsibleParty"]["type"])
        @trialMasterMap["responsible_party_id"]=ResponsibleParty.find_by_name(trialkeys["responsibleParty"]["type"]).id
      else
        @responsibleparties = ResponsibleParty.pluck(:name);
        @validate_errors.store("tns:responsibleParty","Invalid value:following are valid values;")
        @validate_errors.store("tns:responsibleParty:validvalues",@responsibleparties);
      end

       # <tns:responsibleParty>
       # <tns:type>Sponsor</tns:type>
       # </tns:responsibleParty>


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


  def process_lead_org_id(trialkeys)

    if trialkeys["leadOrganization"]["existingOrganization"].has_key?("poID")
      lead_org =trialkeys["leadOrganization"]["existingOrganization"]["poID"]

      trialService1=TrialService.new
      count= trialService1.active_ctrp_org_count(lead_org)
      if count > 0

        @trialMasterMap["lead_org_id"]=lead_org
      else
        @validate_errors.store("tns:leadOrganization tns:poID","given poID not existed Org in CTRP 5.X ; expected active and CTRP org")

      end

    else
      @validate_errors.store("tns:leadOrganization tns:poID","poID node missing; this node is exoected")
    end

  end


  def process_sponsor(trialkeys)

    if trialkeys["sponsor"]["existingOrganization"].has_key?("poID")
      sponsor =trialkeys["sponsor"]["existingOrganization"]["poID"]
      trialService=TrialService.new
      count = trialService.active_ctrp_org_count(sponsor)

      if count > 0
        @trialMasterMap["sponsor_id"]=sponsor
      else
        @validate_errors.store("tns:sponsor","given sponsor not existed Org in CTRP 5.X ; expected active and CTRP org")
      end

    else
      @validate_errors.store("tns:sponsor","sponsor node missing; this node is exoected")
    end

  end

  def process_pi(trialkeys)

    if trialkeys["pi"]["existingPerson"].has_key?("poID")
      pi =trialkeys["pi"]["existingPerson"]["poID"]
      trialService=TrialService.new
      count = trialService.active_ctrp_person_count(pi)

      if count > 0

        @trialMasterMap["pi_id"]=pi
      else
        @validate_errors.store("tns:pi","given pi not existed Person in CTRP 5.X ; expected active and CTRP person")

      end

    else
      @validate_errors.store("tns:pi","pi node missing; this node is exoected")
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
      @primarypurposes = PrimaryPurpose.pluck(:name);
      @validate_errors.store("tns:primaryPurpose","Invalid value:following are valid values;")
      @validate_errors.store("tns:primaryPurpose:validvalues",@primarypurposes);

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
      @primarypurposes = PrimaryPurpose.pluck(:name);
      @validate_errors.store("tns:primaryPurpose","Invalid value:following are valid values;")
      @validate_errors.store("tns:primaryPurpose:validvalues",@primarypurposes);

    end

  end


  def process_phase(trialkeys)
    if Phase.find_by_name(trialkeys["phase"])
      @trialMasterMap["phase_id"]=Phase.find_by_name(trialkeys["phase"]).id
      trialkeys.delete("phase")
    else
      @phases = Phase.pluck(:name);
      @validate_errors.store("tns:phase","Invalid value:following are valid values;")
      @validate_errors.store("tns:phase:validvalues",@phases);
    end
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

  def  delete_funding_sponsor(trialkeys)

    existing_fs = Array.new()

    existing_fs = TrialFundingSource.where(trial_id: @trial.id).pluck(:id)

    len = existing_fs.length
     if len > 0
        for i in 0..len-1
          myHash= Hash.new();
          myHash.store("id", existing_fs[i])
          myHash.store("_destroy","true")
          @trial_funding_sources.push(myHash);
         end
  @trialMasterMap.store("trial_funding_sources_attributes",@trial_funding_sources);

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

  def delete_ind_ides(trialkeys)
    existing_ii = Array.new()

    existing_ii = IndIde.where(trial_id: @trial.id).pluck(:id)
    len = existing_ii.length
    if len > 0
      for i in 0..len-1
        myHash= Hash.new();
        myHash.store("id", existing_ii[i])
        myHash.store("_destroy","true")
        @ind_ides.push(myHash);
      end
      @trialMasterMap.store("ind_ides_attributes",@ind_ides);

    end
  end

  end #main end