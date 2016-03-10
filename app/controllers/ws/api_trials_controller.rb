class Ws::ApiTrialsController < Ws::BaseApiController

  ##CONSTANTS FOR REQUEST VALIDATIONS
  ##
  CONTENT_TYPE        =  "application/xml"
  XSD_PATH            =   Rails.root.to_s + "/ws5x.xsd"
  REGISTER_URL        =   "/ctrp/ws/api/v1/trials/complete"
  POST                =   "POST"
  PUT                 =   "PUT"
  REGISTER_ROOT_NODE  =   "CompleteTrialRegistration"
  UPDATE_ROOT_NODE    =   "CompleteTrialUpdate"
  AMEND_ROOT_NODE     =   "CompleteTrialAmendment"

  ## Class Variables
  ##
  @@requestString
  @@rootElement

  before_action :validate_rest_request

  before_filter only: [:create] do

    @xmlMapperObject = ApiTrialXmlMapper.load_from_xml(REXML::Document.new(@@requestString).root)
    @paramsLoader = ApiTrialParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"create","")

    if !@paramsLoader.errors.empty?
      render xml: @paramsLoader.errors, status: :bad_request
    end
  end # end of before_create


  before_filter only: [:update,:amend] do

    if params.has_key?("idType")
      if params[:idType] == "nci"
        @trial = Trial.find_by_nci_id(params[:id])
      else
        render xml: "Expected id types are nci,pa,dcp,ctep but currently accepting nci only", status: :bad_request
      end
    else
      @trial = Trial.find_by_id(params[:id])
    end

    render nothing: true, status: :not_found unless @trial.present?

    @xmlMapperObject = ApiTrialXmlMapper.load_from_xml(REXML::Document.new(@@requestString).root)
    @paramsLoader = ApiTrialParamsLoader.new()
    @paramsLoader.load_params(@xmlMapperObject,"update","")

    if !@paramsLoader.errors.empty?
      render xml: @paramsLoader.errors, status: :bad_request
    end

  end #end of before_update

  def create
    @rest_params = @paramsLoader.get_rest_params
    p @rest_params
    @trial =Trial.new(@rest_params)
    if @trial.save!
      render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
    else
      render nothing: true, status: :bad_request
      return
    end
  end

  def update
    @rest_params = @paramsLoader.get_rest_params
    p @rest_params
    if @trial.update(@rest_params)
      render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
    else
      render nothing: true, status: :bad_request
    end
  end


  def amend
    @rest_params = @paramsLoader.get_rest_params

    if @trial.update(@rest_params)
      render xml: @trial.to_xml(only: [:id , :nci_id], root:'TrialRegistrationConfirmation', :skip_types => true)
    else
      render nothing: true, status: :bad_request
    end
  end



  private

  def validate_rest_request

    ##check content_type
    if  request.content_type != CONTENT_TYPE
      render nothing:true, status: :bad_request
    end

    ##feed rootElement based on request method and URL
    if request.fullpath.casecmp(REGISTER_URL)==0 && request.request_method.casecmp(POST)
      @@rootElement =REGISTER_ROOT_NODE
    elsif request.fullpath.casecmp(REGISTER_URL)==1  && request.request_method.casecmp(POST)
      @@rootElement = UPDATE_ROOT_NODE
    elsif request.fullpath.casecmp(REGISTER_URL)==1 && request.request_method.casecmp(PUT)
      @@roorElement = AMEND_ROOT_NODE
    end

    @@requestString = request.body.read
    xsd = Nokogiri::XML::Schema(File.open(XSD_PATH))
    doc = Nokogiri::XML(@@requestString)

    ## validate wheather root node is correct or not
    if  doc.root.name == @@rootElement
      xsd_errors =Array.new()
      xsd.validate(doc).each do |error|
        #p error.code()
        #p error.column()
        #p error.domain()
        #p error.inspect()
        #p error.level()
        #p error.line()
        xsd_errors.push(error.message.gsub('{gov.nih.nci.pa.webservices.types}',''))
      end
      xsd_errors.push("Refer 5.x WS XSD on wiki for above erros") if xsd_errors.any?
      render xml:xsd_errors.to_xml, status: '404'  if xsd_errors.any?
    else
      render nothing:true, status: :bad_request
    end


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

end #main end