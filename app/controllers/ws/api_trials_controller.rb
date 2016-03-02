class Ws::ApiTrialsController < Ws::BaseApiController


  @@requestString

  before_action :validate_rest_request


  before_filter only: [:create] do

    @p = TrialXml.load_from_xml(REXML::Document.new(@@requestString).root)

    if !@p.errors.empty?
       render xml: @p.errors, status: :bad_request
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



    trialkeys = @object["CompleteTrialUpdate"]
    @trialMasterMap = Hash.new
    @validate_errors = Hash.new
    @@mode = "update"

    @grants=Array.new()
    @trialDocs = Array.new

    if trialkeys.has_key?("grant")
      delete_x(trialkeys,Grant,@grants,"grants_attributes")
    end

    @trial_status_wrapper=Array.new();
    delete_x(trialkeys,TrialStatusWrapper,@trial_status_wrapper,"trial_status_wrappers_attributes")
    process_trialstatus(trialkeys)

    @other_ids = Array.new()
    delete_x(trialkeys,OtherId,@other_ids,"other_ids_attributes")
    process_other_trial_id(trialkeys)

         @@masterKeyMap.each do | key, v |
          process_entity(trialkeys,key)
         end

    @trialMasterMap.store("trial_documents_attributes",@trialDocs);

    @trialMasterMap["coming_from"] = "rest"
    @trialMasterMap["edit_type"] = "update"


    render xml: @validate_errors, status: :bad_request if !@validate_errors.empty?

    #@trialMasterMap["accrual_disease_term_id"]
  end #end of before_update


  before_filter only: [:amend] do
    @docs =Array.new()
    @trialService = TrialService.new

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
    @@mode = "amend"


    if request.content_type == "application/xml"
      @object = Hash.from_xml(string)
    else
      @errors.store("xml request body is not wellformed","");
    end

   render xml: @errors, status: :bad_request if !@errors.empty?

    trialkeys = @object["CompleteTrialAmendment"]



    @grants=Array.new()
    @trial_status_wrapper=Array.new();
    @trialDocs = Array.new
    @trial_funding_sources=Array.new
    @other_ids = Array.new()
    @ind_ides=Array.new


    if trialkeys.has_key?("grant")
      delete_x(trialkeys,Grant,@grants,"grants_attributes")
    end

    delete_x(trialkeys,TrialStatusWrapper,@trial_status_wrapper,"trial_status_wrappers_attributes")
    process_trialstatus(trialkeys)

     @@masterKeyMap.each do | key, v |
        process_entity(trialkeys,key)
     end




      @trialMasterMap.store("lead_protocol_id",trialkeys["leadOrgTrialID"])
      @trialMasterMap.store("program_code",trialkeys["programCode"]);

      delete_x(trialkeys,OtherId,@other_ids,"other_ids_attributes")
      process_other_trial_id(trialkeys)

    process_pilot(trialkeys)
    process_interventional_design(trialkeys)
    process_regulatory_section(trialkeys)

    if trialkeys.has_key?("summary4FundingSponsor")
      delete_x(trialkeys,TrialFundingSource,@trial_funding_sources,"trial_funding_sources_attributes")
      #process_funding_sponsor(trialkeys)

    end



    if trialkeys.has_key?("ind") || trialkeys.has_key?("ide")
      delete_x(trialkeys,IndIde,@ind_ides,"ind_ides_attributes")
      process_ind_ides(trialkeys)
    end


    @trialMasterMap.store("trial_documents_attributes",@trialDocs);

    @trialMasterMap["coming_from"] = "rest"
    @trialMasterMap["edit_type"] = "amend"

    #p @trialMasterMap

    render xml: @validate_errors, status: :bad_request if !@validate_errors.empty?

    #@trialMasterMap["accrual_disease_term_id"]
  end #end of before_amend



  def create

   @trial = @p.trial

    if @trial.save!
      if request.content_type == "application/json"
        print response
        render json: @trial
        return
      elsif request.content_type == "application/xml"
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

  def validate_rest_request

    @@requestString = request.body.read

    xsd = Nokogiri::XML::Schema(File.open("/local/content/ctrp/apps/ctrp/ws.xsd"))
    #puts xsd

    doc = Nokogiri::XML(@@requestString)
    p doc.root


    xsd.validate(doc).each do |error|
      puts error.message
    end


  end


  def validate(document_path, schema_path, root_element)
    schema = Nokogiri::XML::Schema(File.read("/Users/dullam/Downloads/Registration ws.xsd"))
    document = Nokogiri::XML(File.read(document_path))
    schema.validate(document.xpath("//#{root_element}").to_s)
  end




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





def   validate_grant(fundingMechanism,nihInstitutionCode,serialNumber,nciDivisionProgramCode)
     isNciPCValid  =  AppSetting.find_by_code("NCI").big_value.split(',').include?(nciDivisionProgramCode)
     isSerialNumValid = Tempgrants.find_by_funding_mechanism_and_institute_code_and_serial_number(fundingMechanism,nihInstitutionCode,serialNumber) ? true : false
     p isNciPCValid
     p isSerialNumValid
     isSerialNumValid && isNciPCValid ? true:false
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
      @trialMasterMap[date_qual_str]=trialkeys[date_attr]["type"];
      @trialMasterMap[date_str]=trialkeys[date_attr]["__content__"];
  end

  def process_other_trial_id(trialkeys)

     other_id_map =Hash.new()
     other_id_map["protocol_id_origin_id"]=ProtocolIdOrigin.find_by_name("Other Identifier").id
     other_id_map["protocol_id"]=trialkeys["otherTrialID"]
     @other_ids.push(other_id_map);
  end

    def process_clinical_trials_dot_gov_trial_ID(trialkeys)

        clinical_id_map=Hash.new()
        clinical_id_map["protocol_id_origin_id"]=ProtocolIdOrigin.find_by_name("ClinicalTrials.gov Identifier").id
        clinical_id_map["protocol_id"]=trialkeys["clinicalTrialsDotGovTrialID"]
        @other_ids.push(clinical_id_map);
    end

  def process_regulatory_section(trialkeys)

     if trialkeys["regulatoryInformation"].has_key?("country") && trialkeys["regulatoryInformation"].has_key?("authorityName")

       country=trialkeys["regulatoryInformation"]["country"]
       authorityName= trialkeys["regulatoryInformation"]["authorityName"]
       oversight_authorities=Array.new()
       oversight_map =Hash.new();

       oversight_map["country"]=country
       oversight_map["organization"]=authorityName
       oversight_authorities.push(oversight_map) if @trialService.getAuthorityOrgArr(country).include?(authorityName)
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


    def process_responsible_party(trialkeys)
     if ResponsibleParty.find_by_name(trialkeys["responsibleParty"]["type"])
        @trialMasterMap["responsible_party_id"]=ResponsibleParty.find_by_name(trialkeys["responsibleParty"]["type"]).id
      else
        pluck_and_save_error(ResponsibleParty,"responsibleParty")
      end
     end

  ############

 def process_organization(trialkeys,keyname,org_attr)
     org =trialkeys[keyname]["existingOrganization"]["poID"]
     trialService=TrialService.new
     trialService.active_ctrp_org_count(org) > 0 ? @trialMasterMap[org_attr]=org : @validate_errors.store("tns:sponsor","Not existed Org in CTRP 5.X ; expected active and CTRP org")
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

        if trialkeys["pilot"].to_s.downcase == "true".to_s.downcase
            @trialMasterMap.store("pilot","Yes");
        elsif trialkeys["pilot"].to_s.downcase == "false".to_s.downcase
            @trialMasterMap.store("pilot","No");
        else
            @validate_errors.store("tns:pilot","True, False are valid values;;");
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


 def process_fundedByNciGrant(trialkeys)
   if trialkeys["fundedByNciGrant"].to_s.downcase == "true".to_s.downcase
     @trialMasterMap.store("grant_question","Yes");
   elsif trialkeys["fundedByNciGrant"].to_s.downcase == "false".to_s.downcase
     @trialMasterMap.store("grant_question","No");
   else
     @validate_errors.store("tns:fundedByNciGrant","True, False are valid values;;");
   end
 end

  def  process_interventional_design(trialkeys)
      @trialMasterMap.store("research_category_id",ResearchCategory.find_by_name("Interventional").id);
  end

def process_non_interventional_design(trialkeys)
  @trialMasterMap.store("research_category_id",ResearchCategory.find_by_name(trialkeys["nonInterventionalDesign"]["trialType"]).id);
end


  def process_entity(trialkeys,attr)
       make_corresponding_call(trialkeys,attr)  if trialkeys.has_key?(attr)
  end


  def make_corresponding_call(trialkeys,attr)

    case attr
     when "trialStatus"
     process_trialstatus(trialkeys)
     when "regulatoryInformation"
        process_regulatory_section(trialkeys)
     when "pilot"
       process_pilot(trialkeys)
     when "otherTrialId"
     process_other_trial_id(trialkeys)
     when "clinicalTrialsDotGovTrialID"
       process_clinical_trials_dot_gov_trial_ID(trialkeys)
     when "phase"
         process_phase(trialkeys)
     when "accrualDiseaseTerminology"
        process_accrual_diseageterminology(trialkeys)
     when "primaryPurpose"
       process_primary_purpose(trialkeys)
     when "interventionalDesign"
       process_interventional_design(trialkeys)
     when "nonInterventionalDesign"
       process_non_interventional_design(trialkeys)
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
     when "fundedByNciGrant"
      process_fundedByNciGrant(trialkeys)
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