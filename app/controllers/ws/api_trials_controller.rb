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
    render xml:errors, status: :bad_request
    end

    ###############Pre Baci validation such as CompleteTrialRegistartion, category node existence checking #####################


    if !@object.has_key?("CompleteTrialRegistration")
      errors.store("tns:CompleteTrialRegistration","this node has to be included in the request; Parent node for this request");
      #render xml: errors, status: :bad_request

    else
      trialkeys = @object["CompleteTrialRegistration"]
      if !trialkeys.has_key?("category")
        errors.store("tns:category","this node has to be included in the request;");
       # render xml: errors, status: :bad_request

      else
        @study_sources = StudySource.pluck(:name);

        if !@study_sources.collect {|el| el.downcase }.include? trialkeys["category"].downcase
        errors.store("tns:category","Invalid value:following are valid values");
        errors.store("tns:category:validvalues",@study_sources);
        #render xml: errors, status: :bad_request
        else
          @trialMasterMap["study_source_id"]=StudySource.find_by_name(trialkeys["category"]).id
        end

      end

    end

    puts errors

    if !errors.empty?
      render xml: errors, status: :bad_request
    end

    #############################################################################################################################




    ##################################################### VALIDATE Data #########################################################

    validate_errors =Hash.new


    ###############============>>>>>>> TrailDetails   <<<<<<<<<<<<<<<<=================###################

    #Phase phase_id

    if trialkeys.has_key?("phase")
      if Phase.find_by_name(trialkeys["phase"])
        @trialMasterMap["phase_id"]=Phase.find_by_name(trialkeys["phase"]).id
        trialkeys.delete("phase")
      else
        @phases = Phase.pluck(:name);
        errors.store("tns:phase","Invalid value:following are valid values;")
        errors.store("tns:phase:validvalues",@phases);
        render xml: errors, status: :bad_request
      end
    else
      validate_errors.store("tns:phase","this node has to be included in the request;");
      render xml: errors, status: :bad_request
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
        render xml: errors, status: :bad_request

      end
    else
      validate_errors.store("tns:accrualDiseaseTerminology","this node has to be included in the request;");
      render xml: errors, status: :bad_request
    end

    #title official_title

    if !trialkeys.has_key?("title")
      validate_errors.store("tns:title","this node has to be included in the request;");
      render xml: errors, status: :bad_request
    else
      if trialkeys["title"].nil?
        validate_errors.store("tns:title","Title can not be null");
        render xml: errors, status: :bad_request
      else
        @trialMasterMap["official_title"]=trialkeys["title"]
      trialkeys.delete("title")
      end
    end


    if !validate_errors.empty?
      #render xml: errors, status: :bad_request

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
            errors.store("tns:primaryPurposeOtherDescription","When primaryPurpose is other; primaryPurposeOtherDescription expected with minimum length of 1");
          end
        end
        trialkeys.delete("primaryPurpose")
      else
        @primarypurposes = PrimaryPurpose.pluck(:name);
        errors.store("tns:primaryPurpose","Invalid value:following are valid values;")
        errors.store("tns:primaryPurpose:validvalues",@primarypurposes);
        #render xml: validate_errors, status: :bad_request

      end


    else
      validate_errors.store("tns:primaryPurpose","primaryPurpose is expected");
      #render xml: validate_errors, status: :bad_request
    end


    ###############============>>>>>>> TrailDetails Ending   <<<<<<<<<<<<<<<<=================###################


    #if trialkeys.assoc("title").length > 0
     # render xml: errors, status: :bad_request
    #end



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
        errors.store("tns:poID","given poID not existed Org in CTRP 5.X ; expected active and CTRP org")

      end

      else
        errors.store("tns:poID","poID node missing; this node is exoected")
      end

    else

      errors.store("tns:leadOrganization","Lead organization expected; with existingOrganization with active status and CTRP Context")

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
          errors.store("tns:sponsor","given sponsor not existed Org in CTRP 5.X ; expected active and CTRP org")

        end

      else
        errors.store("tns:sponsor","sponsor node missing; this node is exoected")
      end

    else

      errors.store("tns:sponsor","sponsor organization expected; with existingOrganization with active status and CTRP Context")

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
          errors.store("tns:pi","given pi not existed Person in CTRP 5.X ; expected active and CTRP org")

        end

      else
        errors.store("tns:pi","pi node missing; this node is exoected")
      end

    else

      errors.store("tns:pi","pi person expected; with existingPerson with active status and CTRP Context")

#        render xml: errors, status: :bad_request
    end







    #############################################################################################################################


    #puts trialkeys

    puts "#######################"
    puts @trialMasterMap


    if trialkeys.has_key?("leadOrgTrialID")
      errors ={"leadOrgTrialID" => "please verify its not existed"}
#      render xml: errors, status: :bad_request
    end


    if trialkeys.assoc("ind").length > 0 || trialkeys.assoc("ide").length > 0


    else

      puts "no ind present or no ide info"

    end

    if trialkeys.assoc("pi").length > 0

    else

      puts "no principal investigator"

    end



    #############




    if trialkeys.assoc("grant").length > 0
      #  <tns:fundingMechanism>P30</tns:fundingMechanism>
      #  <tns:nihInstitutionCode>CA</tns:nihInstitutionCode>
      #  <tns:serialNumber>36727</tns:serialNumber>
      #  <tns:nciDivisionProgramCode>OD</tns:nciDivisionProgramCode>
      #  <tns:fundingPercentage>100.0</tns:fundingPercentage>
      # {"funding_mechanism"=>"B08", "institute_code"=>"AE", "serial_number"=>"456", "nci"=>"CCT/CTB", "_destroy"=>false}],

      grants_len = trialkeys.assoc("grant").length

      for i in 0..grants_len
#        puts trialkeys["grant"][i]["fundingMechanism"]
      end

      trialkeys["leadOrgTrialID"]

    else

      puts "no grant information"

    end



=begin
mapping = {"lead_protocol_id"=>"lead_protocol_id",
           "pilot"=>"pilot", "grant_question"=>"Yes", "ind_ide_question"=>"Yes", "study_source_id"=>2,
           "official_title"=>"Offtitle", "phase_id"=>1, "research_category_id"=>2, "primary_purpose_id"=>3, "primary_purpose_other"=>"",
           "secondary_purpose_id"=>1, "secondary_purpose_other"=>"", "accrual_disease_term_id"=>1, "start_date"=>"2015-12-03T05:00:00.000Z",
           "primary_comp_date"=>"2015-12-10T05:00:00.000Z", "comp_date"=>"2015-12-26T05:00:00.000Z", "comp_date_qual"=>"Actual",
           "primary_comp_date_qual"=>"Anticipated", "start_date_qual"=>"Anticipated", "responsible_party_id"=>1, "investigator_title"=>"",
           "intervention_indicator"=>"Yes", "sec801_indicator"=>"Yes", "lead_org_id"=>8352734, "pi_id"=>28186245, "sponsor_id"=>595150, "investigator_id"=>nil, "investigator_aff_id"=>nil
}
=end
    #mappings = {"firstName" => "fname", "lastName" => "lname","middleName" => "mname", "prefix" => "prefix", "suffix" => "suffix", "email" => "email", "fax" => "fax", "phone" => "phone"}
    #personkeys.keys.each { |k| personkeys[ mappings[k] ] = personkeys.delete(k) if mappings[k] }



  end


  #before_filter only: :update do
  # unless @json.has_key?('person')
  #  render nothing: true, status: :bad_request
  #end
  # end

  #before_filter only: :create do
  # @person = Person.find_by_name(@json['project']['name'])
  #end

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

    puts @object["trial"]

=begin
    @object= {
     "trial"=>{"lead_protocol_id"=>"nci", "pilot"=>"No", "grant_question"=>"Yes", "ind_ide_question"=>"Yes", "study_source_id"=>2,
               "official_title"=>"Offtitle", "phase_id"=>1, "research_category_id"=>2, "primary_purpose_id"=>3, "primary_purpose_other"=>"",
               "secondary_purpose_id"=>1, "secondary_purpose_other"=>"", "accrual_disease_term_id"=>1, "start_date"=>"2015-12-03T05:00:00.000Z",
               "primary_comp_date"=>"2015-12-10T05:00:00.000Z", "comp_date"=>"2015-12-26T05:00:00.000Z", "comp_date_qual"=>"Actual",
               "primary_comp_date_qual"=>"Anticipated", "start_date_qual"=>"Anticipated", "responsible_party_id"=>1, "investigator_title"=>"",
               "intervention_indicator"=>"Yes", "sec801_indicator"=>"Yes", "lead_org_id"=>8352734, "pi_id"=>28186245, "sponsor_id"=>595150, "investigator_id"=>nil, "investigator_aff_id"=>nil
     }
    }
=end
@trialMasterMap["lead_protocol_id"]="nci"

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