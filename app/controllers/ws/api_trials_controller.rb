class Ws::ApiTrialsController < Ws::BaseApiController
  #wrap_parameters format: [:json, :xml]

  before_filter :find_person, only: [:show, :update]
  before_filter :sam, only: [:change_status]

  before_filter only: [:create,:update] do
    string = request.body.read
    begin
    bad_doc = Nokogiri::XML(string) { |config| config.options = Nokogiri::XML::ParseOptions::STRICT }
    rescue Nokogiri::XML::SyntaxError => e
    puts "caught exception: #{e}"
    end

    errors =Hash.new
    @trialMasterMap = Hash.new

    if request.content_type == "application/xml"
        @object = Hash.from_xml(string)
        puts "before raw input"
        puts @object
        puts "after raw output"
      #doc = Nokogiri::XML(string)
      #@object=Hash.from_xml(doc.to_s)
      else
        errors.store("xml request body is not wellformed","");

    end

    if !errors.empty?
    #render xml:errors, status: :bad_request and return
    end

    ###############Pre Baci validation such as CompleteTrialRegistartion, category node existence checking #####################


    if !@object.has_key?("CompleteTrialRegistration")
      errors.store("tns:CompleteTrialRegistration","this node has to be included in the request; Parent node for this request");
      #render xml: errors, status: :bad_request and return

    else
      trialkeys = @object["CompleteTrialRegistration"]
      if !trialkeys.has_key?("category")
        errors.store("tns:category","this node has to be included in the request;");
       # render xml: errors, status: :bad_request and return

      else
        @study_sources = StudySource.pluck(:name);

        if !@study_sources.collect {|el| el.downcase }.include? trialkeys["category"].downcase
        errors.store("tns:category","Invalid value:following are valid values");
        errors.store("tns:category:validvalues",@study_sources);
        #render xml: errors, status: :bad_request and return
        else
          @trialMasterMap["study_source_id"]=StudySource.find_by_name(trialkeys["category"]).id
        end

      end

      if !trialkeys.has_key?("leadOrgTrialID")
        errors.store("leadOrgTrialID", "please verify its not existed")
      else
        @trialMasterMap.store("lead_protocol_id",trialkeys["leadOrgTrialID"])

      end

    end


    if !errors.empty?
      render xml: errors, status: :bad_request
    else
       validate_errors = Hash.new();
    #############################################################################################################################




    ##################################################### VALIDATE Data #########################################################



    ###############============>>>>>>> TrailDetails   <<<<<<<<<<<<<<<<=================###################

    #Phase phase_id

    if trialkeys.has_key?("phase")
      if Phase.find_by_name(trialkeys["phase"])
        @trialMasterMap["phase_id"]=Phase.find_by_name(trialkeys["phase"]).id
        trialkeys.delete("phase")
      else
        @phases = Phase.pluck(:name);
        validate_errors.store("tns:phase","Invalid value:following are valid values;")
        validate_errors.store("tns:phase:validvalues",@phases);
        #render xml: errors, status: :bad_request
      end
    else
      validate_errors.store("tns:phase","this node has to be included in the request;");
      #render xml: errors, status: :bad_request
    end

    #accrualDiseaseTerminology  accrual_disease_term_id

    if trialkeys.has_key?("accrualDiseaseTerminology")
      if AccrualDiseaseTerm.find_by_name(trialkeys["accrualDiseaseTerminology"])
        @trialMasterMap["accrual_disease_term_id"]=AccrualDiseaseTerm.find_by_name(trialkeys["accrualDiseaseTerminology"]).id
        trialkeys.delete("accrualDiseaseTerminology")
      else
        @accrualdiseaseterms = AccrualDiseaseTerm.pluck(:name);
        validate_errors.store("tns:accrualDiseaseTerminology","Invalid value:following are valid values;")
        validate_errors.store("tns:accrualDiseaseTerminology:validvalues",@accrualdiseaseterms);
        #render xml: errors, status: :bad_request

      end
    else
      validate_errors.store("tns:accrualDiseaseTerminology","this node has to be included in the request;");
      #render xml: errors, status: :bad_request
    end

    #title official_title

    if !trialkeys.has_key?("title")
      validate_errors.store("tns:title","this node has to be included in the request;");
      #render xml: errors, status: :bad_request
    else
      if trialkeys["title"].nil?
        validate_errors.store("tns:title","Title can not be null");
        #render xml: errors, status: :bad_request
      else
        @trialMasterMap["official_title"]=trialkeys["title"]
      trialkeys.delete("title")
      end
    end

    #Primary Purpose
    if trialkeys.has_key?("primaryPurpose")
      if PrimaryPurpose.find_by_name(trialkeys["primaryPurpose"])
        @trialMasterMap["primary_purpose_id"]=PrimaryPurpose.find_by_name(trialkeys["primaryPurpose"]).id
        #trialkeys.delete("primaryPurpose")
        if trialkeys["primaryPurpose"].to_s.downcase=="Other".downcase
          if trialkeys.has_key?("primaryPurposeOtherDescription")
            @trialMasterMap["primary_purpose_other"]= trialkeys["primaryPurposeOtherDescription"]
          else
            validate_errors.store("tns:primaryPurposeOtherDescription","When primaryPurpose is other; primaryPurposeOtherDescription expected with minimum length of 1");
          end
        end
        trialkeys.delete("primaryPurpose")
      else
        @primarypurposes = PrimaryPurpose.pluck(:name);
        validate_errors.store("tns:primaryPurpose","Invalid value:following are valid values;")
        validate_errors.store("tns:primaryPurpose:validvalues",@primarypurposes);

      end


    else
      validate_errors.store("tns:primaryPurpose","primaryPurpose is expected");
      #render xml: validate_errors, status: :bad_request
    end


    ###############============>>>>>>> TrailDetails Ending   <<<<<<<<<<<<<<<<=================###################






    ###############============>>>>>>> Trail Lead,Pi,Sposor   <<<<<<<<<<<<<<<<=================###################

  ###lead_org_id
    if trialkeys.has_key?("leadOrganization") && trialkeys["leadOrganization"].has_key?("existingOrganization")
      puts trialkeys["leadOrganization"]["existingOrganization"]

      if trialkeys["leadOrganization"]["existingOrganization"].has_key?("poID")
      lead_org =trialkeys["leadOrganization"]["existingOrganization"]["poID"]
      count = Organization.where("ctrp_id=?", lead_org).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTRP").id,SourceStatus.find_by_name("Active").id).count;
      if count > 0

        @trialMasterMap["lead_org_id"]=lead_org
      else
        validate_errors.store("tns:poID","given poID not existed Org in CTRP 5.X ; expected active and CTRP org")

      end

      else
        validate_errors.store("tns:poID","poID node missing; this node is exoected")
      end

    else

      validate_errors.store("tns:leadOrganization","Lead organization expected; with existingOrganization with active status and CTRP Context")

#        render xml: errors, status: :bad_request
      end

########## Sponosr
    if trialkeys.has_key?("sponsor") && trialkeys["sponsor"].has_key?("existingOrganization")
      puts trialkeys["sponsor"]["existingOrganization"]

      if trialkeys["sponsor"]["existingOrganization"].has_key?("poID")
        sponsor =trialkeys["sponsor"]["existingOrganization"]["poID"]
        count = Organization.where("ctrp_id=?", sponsor).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTRP").id,SourceStatus.find_by_name("Active").id).count;
        if count > 0

          @trialMasterMap["sponsor_id"]=sponsor
        else
          validate_errors.store("tns:sponsor","given sponsor not existed Org in CTRP 5.X ; expected active and CTRP org")

        end

      else
        validate_errors.store("tns:sponsor","sponsor node missing; this node is exoected")
      end

    else

      validate_errors.store("tns:sponsor","sponsor organization expected; with existingOrganization with active status and CTRP Context")

#        render xml: errors, status: :bad_request
    end



##############PI


    if trialkeys.has_key?("pi") && trialkeys["pi"].has_key?("existingPerson")
      puts trialkeys["pi"]["existingPerson"]

      if trialkeys["pi"]["existingPerson"].has_key?("poID")
        pi =trialkeys["pi"]["existingPerson"]["poID"]
        count = Person.where("ctrp_id=?", pi).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTRP").id,SourceStatus.find_by_name("Active").id).count;
        if count > 0

          @trialMasterMap["pi_id"]=pi
        else
          validate_errors.store("tns:pi","given pi not existed Person in CTRP 5.X ; expected active and CTRP org")

        end

      else
        validate_errors.store("tns:pi","pi node missing; this node is exoected")
      end

    else

      validate_errors.store("tns:pi","pi person expected; with existingPerson with active status and CTRP Context")

#        render xml: errors, status: :bad_request
    end







    #############################################################################################################################

  ####Funding Sources

    if trialkeys["summary4FundingSponsor"].length > 0
     len=trialkeys["summary4FundingSponsor"].length
     trial_funding_sources=Array.new
     #puts len
      for i in 0..len-1
       if trialkeys["summary4FundingSponsor"][i].has_key?("existingOrganization")
         poID=trialkeys["summary4FundingSponsor"][i]["existingOrganization"]["poID"]
         count = Organization.where("ctrp_id=?", poID).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTRP").id,SourceStatus.find_by_name("Active").id).count;
         if count > 0
          myHash= Hash.new();
          myHash.store("organization_id",poID);
          trial_funding_sources.push(myHash);
         else
           validate_errors.store("tns:summary4FundingSponsor","org not existed"+poID)
           break;
         end
       else
         validate_errors.store("tns:summary4FundingSponsor","One or more of these nodes are missing existingOrganization")
         break;
       end

      end

    end

    @trialMasterMap.store("trial_funding_sources_attributes",trial_funding_sources);

### Program Code

    if trialkeys.has_key?("programCode")
     @trialMasterMap.store("program_code",trialkeys["programCode"]);
    end


    ################################################################################################################################
#### Grants
    grants=Array.new
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

          grants.push(myHash);

        else
          validate_errors.store("tns:grant"," For each grant fundingMechanism, nihInstitutionCode, serialNumber, nciDivisionProgramCode expected;")
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

    grants.push(myHash);
end
end
    @trialMasterMap.store("grants_attributes",grants);



    ##########################Trial Status && Trial Dates########################################################################################################

    #<tns:trialStatus>In Review</tns:trialStatus>

    #<tns:whyStopped></tns:whyStopped>

    #<tns:trialStatusDate>2015-12-23</tns:trialStatusDate>

#if trialkeys.has_key?("trialStatus")

 #     @trialMasterMap.store("lead_protocol_id",trialkeys["trialStatus"])

  #  end


#    <tns:trialStartDate type="Anticipated">2015-12-27</tns:trialStartDate>

 #   <tns:primaryCompletionDate type="Anticipated">2016-07-15</tns:primaryCompletionDate>

  #  <tns:completionDate type="Anticipated">2016-07-15</tns:completionDate>






    ##################################################################################################################################


       render xml: validate_errors, status: :bad_request if !validate_errors.empty?






  end
    puts @trialMasterMap
end # end of before_create


  def index
    #render json: Project.where('owner_id = ?', @user.id)
  end



  def show
    if request.content_type == "application/json"
      render json: @trial
      return
    elsif request.content_type == "application/xml"
      render xml: @trial
      return
    else
      render json: @trial
      return
    end
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
        render xml: @trial
        return
        return
      else

      end
    else
      render nothing: true, status: :bad_request
      return
    end

    #end
  end


  def update

    @person =Person.find_by_id(params[:id])
    if @person.update(@object["person"])
      if request.content_type == "application/json"
        render json: @person
      elsif request.content_type == "application/xml"
        render xml: @person
      else

      end
    else
      render nothing: true, status: :bad_request
    end
  end

  def change_status
    puts @status
    status_id = SourceStatus.find_by_name(@status.upcase).id
    if @person.update({"source_status_id" => status_id})
      if request.content_type == "application/json"
        render json: @person
      elsif request.content_type == "application/xml"
        render xml: @person
      else
        render json: @person
      end
    else
      render nothing: true, status: :bad_request
    end
  end

  private
  def find_person
    @person = Person.find_by_id(params[:id])
    render nothing: true, status: :not_found unless @person.present?
  end

  def sam
    @status = request.body.read
    @person = Person.find_by_id(params[:id])
    #render nothing: true, status: :not_found unless @person.present? && request.body.read.length > 0  &&  request.content_type == "text/plain"
  end



  def person_params
    params.require(:person).permit(:source_id, :fname, :mname, :lname, :suffix,:prefix, :email, :phone,
                                   :source_status_id,:source_context_id, :lock_version,
                                   po_affiliations_attributes: [:id, :organization_id, :effective_date,
                                                                :expiration_date, :po_affiliation_status_id,
                                                                :lock_version, :_destroy])
  end
end