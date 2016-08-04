class Ws::ApiTrialsController < Ws::BaseApiController
  ##CONSTANTS FOR REQUEST VALIDATIONS
  ##
  XSD_PATH            =   Rails.root.to_s + "/ws.xsd"
  REGISTER_ACTION     =   "create"
  UPDATE_ACTION       =   "update"
  AMEND_ACTION        =   "amend"
  POST                =   "POST"
  PUT                 =   "PUT"
  REGISTER_ROOT_NODE  =   "CompleteTrialRegistration"
  UPDATE_ROOT_NODE    =   "CompleteTrialUpdate"
  AMEND_ROOT_NODE     =   "CompleteTrialAmendment"

  ## Class Variables
  ##
  $requestString
  $rootElement

  before_action only: [:create, :update, :amend] do
    validate_rest_request
  end


  before_filter only: [:create] do
    Rails.logger.info("Restfulservices=> current user #@current_user");
    val_errors = Array.new()

    @xmlMapperObject = ApiTrialCreateXmlMapper.load_from_xml(REXML::Document.new($requestString).root)

    ## Check Lead_org_id and lead_org_trial_id must be unique otherwise throw error
     ##

    #if !@xmlMapperObject.leadOrganization.newOrganization.nil?
     # val_errors.push("Accepting newOrganization element to create Person/Organization on the fly has been deprecated, please refer 5.x wiki for more details");
    #else
      lead_protocol_id = @xmlMapperObject.lead_protocol_id
      lead_org_id = @xmlMapperObject.leadOrganization.existingOrganization.id
      lead_org_id_pk= Organization.find_by_ctrp_id(lead_org_id).id if Organization.find_by_ctrp_id(lead_org_id)

      @trial = Trial.find_by_lead_protocol_id_and_lead_org_id(lead_protocol_id,lead_org_id_pk)


      if @trial.present?
        val_errors.push("A trial has already been existed with given Lead Org Trial ID and Lead organization ID");
      else
        val_errors=    validate_clinicalTrialsDotGovXmlRequired_dependencies(@xmlMapperObject)
      end
    #end

    render xml:val_errors.to_xml, status: '404'  if val_errors.any?
  end


  before_filter only: [:create] do

    @paramsLoader = ApiTrialParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"create","")

    if !@paramsLoader.errors.empty?
      render xml: @paramsLoader.errors, status: '404'
    end
  end # end of before_create



  before_filter only:[:update,:amend] do

    if params[:idType] == "nci"
      @trial = Trial.find_by_nci_id(params[:id])
    else
      render xml: "Expected id types are nci,pa,dcp,ctep but currently trial is being identifed", status: :bad_request
    end
    render xml:  "Given trial with NCI_ID does not exist in CTRP ", status: :not_found unless @trial.present?

  end

  before_filter only: [:update] do

    @xmlMapperObject = ApiTrialCreateXmlMapper.load_from_xml(REXML::Document.new($requestString).root)
    @paramsLoader = ApiTrialParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"update",@trial)
    if !@paramsLoader.errors.empty?
      render xml: @paramsLoader.errors, status:'404'
    end

  end #end of before_update

  before_filter only: [:amend] do
    Rails.logger.info("Restfulservices=> current user #@current_user");
    val_errors = Array.new()

    @xmlMapperObject = ApiTrialCreateXmlMapper.load_from_xml(REXML::Document.new($requestString).root)

    ## Check Lead_org_id and lead_org_trial_id must be unique otherwise throw error
    ##

    #if !@xmlMapperObject.leadOrganization.newOrganization.nil?
    # val_errors.push("Accepting newOrganization element to create Person/Organization on the fly has been deprecated, please refer 5.x wiki for more details");
    #else
    lead_protocol_id = @xmlMapperObject.lead_protocol_id
    lead_org_id = @xmlMapperObject.leadOrganization.existingOrganization.id
    lead_org_id_pk= Organization.find_by_ctrp_id(lead_org_id).id if Organization.find_by_ctrp_id(lead_org_id)

    @trial1 = Trial.find_by_lead_protocol_id_and_lead_org_id(lead_protocol_id,lead_org_id_pk)


    if @trial1.present? && @trial.id != @trial1.id
      val_errors.push("A trial has already been existed with given Lead Org Trial ID and Lead organization ID");
    else
      val_errors=    validate_clinicalTrialsDotGovXmlRequired_dependencies(@xmlMapperObject)
    end
    #end

    render xml:val_errors.to_xml, status: '404'  if val_errors.any?
  end


  before_filter only: [:amend] do

    @xmlMapperObject = ApiTrialCreateXmlMapper.load_from_xml(REXML::Document.new($requestString).root)
    val_errors=    validate_clinicalTrialsDotGovXmlRequired_dependencies(@xmlMapperObject)
    render xml:val_errors.to_xml, status: '404'  if val_errors.any?
    @paramsLoader = ApiTrialParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"amend",@trial)
    if !@paramsLoader.errors.empty?
      render xml: @paramsLoader.errors, status: '404'
    end

  end #end of before_update

  def create
    @rest_params = @paramsLoader.get_rest_params
    @rest_params[:current_user] = @current_user
    @rest_params[:created_by]   = @current_user.username unless @current_user.nil?
    @rest_params[:updated_by]   = @current_user.username unless @current_user.nil?

    ##Make rest service user as default trial owner.
    ##$rest_params[:trial_ownerships_attributes].push({user_id:@current_user.id})


    @trial =Trial.new(@rest_params)
    @trial.current_user = @current_user
    if @trial.save!
      render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
    else
      render nothing: true, status: :bad_request
      return
    end
  end

  def update
    @rest_params = @paramsLoader.get_rest_params
    @rest_params[:current_user] = @current_user
    @rest_params[:updated_by]   = @current_user.username unless @current_user.nil?
    @trial.current_user = @current_user
    if @trial.update(@rest_params)
      render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
    else
      render nothing: true, status: :bad_request
    end
  end


  def amend
    @rest_params = @paramsLoader.get_rest_params
    @rest_params[:current_user] = @current_user
    @rest_params[:updated_by]   = @current_user.username unless @current_user.nil?
    @trial.current_user = @current_user
    if @trial.update(@rest_params)
      render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
    else
      render nothing: true, status: :bad_request
    end
  end

  def import_trial
    @import_trial_service = ImportTrialService.new()
    @import_trial_service.validate_clinical_trials_gov(params[:id])
    p @import_trial_service

    if !@import_trial_service.errors.empty?
      render xml: @import_trial_service.errors, status: '404'
    else
      url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
      url = url.sub('NCT********', params[:id])
      xml = Nokogiri::XML(open(url))

      trial_service = TrialService.new({trial: nil})
      @trial = Trial.new(trial_service.import_params(xml, @current_user))
      @trial.current_user = @current_user


      if @trial.save
          render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
        else
          render xml: @trial.errors, status: :bad_request
        end
    end
  end


  private

  def validate_rest_request


    ##Get action from request header
    action = request.path_parameters[:action]

    ##feed rootElement based on request method and URL
    if action == REGISTER_ACTION && request.request_method.casecmp(POST)
      $rootElement =REGISTER_ROOT_NODE
    elsif action== UPDATE_ACTION  && request.request_method.casecmp(POST)
      $rootElement = UPDATE_ROOT_NODE
    elsif action == AMEND_ACTION && request.request_method.casecmp(PUT)
      $rootElement = AMEND_ROOT_NODE
    end

    $requestString = request.body.read
    xsd = Nokogiri::XML::Schema(File.open(XSD_PATH))
    doc = Nokogiri::XML($requestString)
    xsd_errors =Array.new()

    ## validate wheather root node is correct or not
    if  doc.root.name == $rootElement
      xsd.validate(doc).each do |error|
        #p error.code()
        #p error.column()
        #p error.domain()
        #p error.inspect()
        #p error.level()
        #p error.line()
        p "hello this is inside error"
        xsd_errors.push(error.message.gsub('{gov.nih.nci.pa.webservices.types}',''))
      end
      xsd_errors.push("Refer 5.x WS XSD on wiki for above erros") if xsd_errors.any?
    else
      xsd_errors.push("Refer 5.x WS XSD on wiki for correct request body ")
    end

    ##
    ####This is compatibility maintainence with 4.x, if they submitted we will accept it but throw an error
    if !xsd_errors.any?
      a = doc.xpath("//tns:leadOrganization/tns:newOrganization")
      b = doc.xpath("//tns:sponsor/tns:newOrganization")
      c = doc.xpath("//tns:pi/tns:newPerson")
      d = doc.xpath("//tns:summary4FundingSponsor/tns:newOrganization")

        xsd_errors.push("leadOrganization: Creating new Organization feature has been deprecated in 5.x Restservices, refer 5.x wiki for more details") if a.length >= 1
        xsd_errors.push("sponsor: Creating new Organization feature has been deprecated in 5.x Restservices, refer 5.x wiki for more details") if b.length >= 1
        xsd_errors.push("pi: Creating new Person feature has been deprecated in 5.x Restservices, refer 5.x wiki for more details")     if c.length >= 1
        xsd_errors.push("summary4FundingSponsor: Creating new Organization feature has been deprecated in 5.x Restservices, refer 5.x wiki for more details")     if d.length >= 1

      #e = doc.xpath("//")

    end


    render xml:xsd_errors.to_xml, status: '404'  if xsd_errors.any?

  end


  def find_trial

    if params.has_key?("idType")
      if params[:idType] == "nci"
        @trial = Trial.find_by_nci_id(params[:id])
      else
        render xml: "Expected idtypes are nci,pa,dcp,ctep but currently nci is accepting", status: :bad_request
      end
    else
      @trial = Trial.find_by_id(params[:id])
    end
    render nothing: true, status: :not_found unless @trial.present?

  end

  ## Responsible Party should not be specified if clinicalTrialsDotGovXmlRequired is false.
  ## Regulatory Information is required if clinicalTrialsDotGovXmlRequired is true and should not be specified otherwise.
  ## Sponsor should not be specified if clinicalTrialsDotGovXmlRequired is false.

  def validate_clinicalTrialsDotGovXmlRequired_dependencies(xmlMapperObject)

    val_errors =Array.new()

    if xmlMapperObject.clinical_trial_dot_xml_required == "Yes"

       if xmlMapperObject.regulatoryInformation.nil?
         val_errors.push("Regulatory Information is required if clinicalTrialsDotGovXmlRequired is true")
       end

   end

    if xmlMapperObject.clinical_trial_dot_xml_required == "No"
       if !xmlMapperObject.responsible_party.nil?
         val_errors.push("Responsible Party should not be specified if clinicalTrialsDotGovXmlRequired is false")
       end
       if !xmlMapperObject.sponsor.nil?
         val_errors.push("Sponsor should not be specified if clinicalTrialsDotGovXmlRequired is false")
       end

       if !xmlMapperObject.regulatoryInformation.nil?
         val_errors.push("Regulatory Information should not be specified if clinicalTrialsDotGovXmlRequired is false")
       end
    end

    return val_errors


  end

end #main end