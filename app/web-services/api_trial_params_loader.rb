class ApiTrialParamsLoader

  @@rest_params = {}
  @@errors       = Hash.new()
  @@xmlMapperObject


  def load_params(xmlMapperObject,type,trial_id)
    @@rest_params = {}
    @@xmlMapperObject =xmlMapperObject

    #@@rest_params.push
    case type
      when "register"
        @@rest_params[:edit_type] ="create"
      when "update"
        @@rest_params[:edit_type] ="update"
      when "amend"
        @@rest_params[:edit_type] ="amend"
    end

    ##In model to add some custome code use following identifier ; so that active model know from which this request is coming;
    @@rest_params[:coming_from] = "rest"

    ###Trial Identifiers
    @@rest_params[:study_source_id] = self.study_source_id if @@xmlMapperObject.study_source
    @@rest_params[:lead_protocol_id] = @@xmlMapperObject.lead_protocol_id if @@xmlMapperObject.lead_protocol_id

    @@rest_params[:other_ids_attributes]=[]
    otherProtocolId    = ProtocolIdOrigin.find_by_name("Other Identifier").id
    clinicalProtocolId = ProtocolIdOrigin.find_by_name("ClinicalTrials.gov Identifier").id

    @@xmlMapperObject.otherIDs.each do |oid|
      @@rest_params[:other_ids_attributes].push({protocol_id:oid,protocol_id_origin_id:otherProtocolId})
    end

    @@xmlMapperObject.clinicalIDs.each do |cid|
      @@rest_params[:other_ids_attributes].push({protocol_id:cid,protocol_id_origin_id:clinicalProtocolId})
    end


    ###Trial Details
    @@rest_params[:official_title]   =   @@xmlMapperObject.official_title if @@xmlMapperObject.official_title
    @@rest_params[:phase_id] = self.phase_id if @@xmlMapperObject.phase
    ##TODO If they donot provide pilot set to NO and give a thought about update and amend case::
    @@rest_params[:pilot] = @@xmlMapperObject.pilot

    if type=="create" && @@xmlMapperObject.interventionalTrial
      @@rest_params[:research_category_id]=@@xmlMapperObject.interventionalTrial.research_category_id
      @@rest_params[:secondary_purpose_id] = @@xmlMapperObject.interventionalTrial.secondary_purpose_id
      if SecondaryPurpose.find_by_id(@@xmlMapperObject.interventionalTrial.secondary_purpose_id).name == "Other" && @@xmlMapperObject.interventionalTrial.secondary_purpose_other.nil?
        @@errors.store("SecondaryPurpose","When Secondary Purpose is Other,Other Description expected")
      else
        @@rest_params[:secondary_purpose_other]      =   @@xmlMapperObject.interventionalTrial.secondary_purpose_other
      end
    elsif type=="create" && @@xmlMapperObject.nonInterventionalTrial
      @@rest_params[:research_category_id]=@@xmlMapperObject.nonInterventionalTrial.research_category_id
    end

    @@rest_params[:primary_purpose_id]      =      @@xmlMapperObject.primary_purpose_id

    if !@@xmlMapperObject.primary_purpose_id.nil? && PrimaryPurpose.find_by_id(@@xmlMapperObject.primary_purpose_id).name == "Other" && @@xmlMapperObject.primary_purpose_other.nil?
      @@errors.store("PrimaryPurpose","When Primary Purpose is Other,Other Description expected")
    else
      @@rest_params[:primary_purpose_other]      =      @@xmlMapperObject.primary_purpose_other
    end

    @@rest_params[:accrual_disease_term_id] =      @@xmlMapperObject.accrual_disease_term_id

    ###Lead Org, PI, Sponsor
    ###
    lead_org_id=@@xmlMapperObject.leadOrganization.existingOrganization.id if @@xmlMapperObject.leadOrganization
    sponsor_id=@@xmlMapperObject.sponsor.existingOrganization.id           if @@xmlMapperObject.sponsor
    pi_id = @@xmlMapperObject.pi.existingPerson.id                         if @@xmlMapperObject.pi
    @@rest_params[:lead_org_id] = lead_org_id   if lead_org_id && valid_org("leadOrganization",lead_org_id)
    @@rest_params[:sponsor_id]  = sponsor_id    if sponsor_id && valid_org("Sponsor",sponsor_id)
    @@rest_params[:pi_id]       = pi_id         if pi_id && valid_person("pi",pi_id)

    ###Funding Sources
    @@rest_params[:trial_funding_sources_attributes] = []
    @@xmlMapperObject.fundingSources.each do |fs|
      organization_id=fs.existingOrganization.id
      @@rest_params[:trial_funding_sources_attributes].push({organization_id:organization_id}) if organization_id && valid_org("summary4FundingSponsor",organization_id)
    end
    @@rest_params[:program_code]       = @@xmlMapperObject.program_code  if @@xmlMapperObject.program_code


    ###Grants
    ###
    @@rest_params[:grant_question]    = @@xmlMapperObject.grant_question
    @@rest_params[:grants_attributes] = []
    @@xmlMapperObject.grants.each do |grant|
      if validate_grants(grant.funding_mechanism,grant.institute_code,grant.serial_number,grant.nci)
        @@rest_params[:grants_attributes].push({funding_mechanism: grant.funding_mechanism, institute_code: grant.institute_code, serial_number: grant.serial_number, nci: grant.nci})
      else
        @@errors.store("grant" ,"Given grant info is not valid")
      end
    end

    ###Trial Status
    @@rest_params[:trial_status_wrappers_attributes] = []
    trial_status_wrappers_hash= {}
    trial_status_wrappers_hash[:status_date] = @@xmlMapperObject.status_date if @@xmlMapperObject.status_date
    trial_status_wrappers_hash[:why_stopped] = @@xmlMapperObject.why_stopped if @@xmlMapperObject.why_stopped
    trial_status_wrappers_hash[:trial_status_id] = self.trial_status_id if @@xmlMapperObject.trial_status
    @@rest_params[:trial_status_wrappers_attributes].push(trial_status_wrappers_hash)


    ### Trial Dates
    @@rest_params[:start_date]             =  @@xmlMapperObject.start_date                     if @@xmlMapperObject.start_date
    @@rest_params[:start_date_qual]        =  @@xmlMapperObject.start_date_qual                if @@xmlMapperObject.start_date_qual
    @@rest_params[:primary_comp_date]      =  @@xmlMapperObject.primary_comp_date              if @@xmlMapperObject.primary_comp_date
    @@rest_params[:primary_comp_date_qual] =  @@xmlMapperObject.primary_comp_date_qual         if @@xmlMapperObject.primary_comp_date_qual
    @@rest_params[:comp_date]              =  @@xmlMapperObject.comp_date                      if @@xmlMapperObject.comp_date
    @@rest_params[:comp_date_qual]         =  @@xmlMapperObject.comp_date_qual                 if @@xmlMapperObject.comp_date_qual

    ###IND,IDE
    @@rest_params[:ind_ides_attributes] = []

    @@xmlMapperObject.inds.each do |ind|
      add_ind_ide("ind",ind)
    end
    @@xmlMapperObject.ides.each do |ide|
      add_ind_ide("ide",ide)
    end

    ###Regulatory Information

    save_responsible_party()

    if !@@xmlMapperObject.regulatoryInformation.nil?
      @@rest_params[:sec801_indicator]= @@xmlMapperObject.regulatoryInformation.sec801_indicator
      @@rest_params[:intervention_indicator]= @@xmlMapperObject.regulatoryInformation.intervention_indicator
      @@rest_params[:data_monitor_indicator]= @@xmlMapperObject.regulatoryInformation.data_monitor_indicator
    end


    ###Trial Docs

    @@rest_params[:trial_documents_attributes] = []

    add_file(@@xmlMapperObject.protocol_document_name,@@xmlMapperObject.protocol_document_content,"Protocol Document")
    add_file(@@xmlMapperObject.irb_approval_document_name,@@xmlMapperObject.irb_approval_document_content,"IRB Approval")
    add_file(@@xmlMapperObject.participating_sites_document_name,@@xmlMapperObject.participating_sites_document_content,"List of Participating Sites")
    add_file(@@xmlMapperObject.informed_consent_document_name,@@xmlMapperObject.informed_consent_document_content,"Informed Consent")
    add_file(@@xmlMapperObject.change_memo_document_name,@@xmlMapperObject.change_memo_document_content,"Change Memo Document")
    add_file(@@xmlMapperObject.protocol_highlight_document_name,@@xmlMapperObject.protocol_highlight_document_content,"Protocol Highlighted Document")

    @@xmlMapperObject.otherDocs.each do |other_file_name, other_file_content|
      add_file(other_file_name,other_file_content,"Other Document")
    end




  end

  def get_rest_params()
    return @@rest_params
  end

  def errors
    return @@errors
  end

  def valid_org(type,id)
    trialService=TrialService.new
    count = 0
    begin
      count=trialService.active_ctrp_org_count(id)
    rescue Exception=>e
      p e
    end

    if  count > 0
      return true
    else
      @@errors.store(type,"Given Organization does not exist in CTRP "+id)
      return false
    end

  end

  def valid_person(type,id)
    count=0
    trialService=TrialService.new
    begin
      count=trialService.active_ctrp_person_count(id)
    rescue Exception=>e
      p e
    end
    if count > 0
        return true
    else
      @@errors.store(type,"Given Person does not exist in CTRP")
      return false
    end
  end

  def phase_id
    Phase.find_by_name(@@xmlMapperObject.phase) ? phase_id=Phase.find_by_name(@@xmlMapperObject.phase).id : self.pluck_and_save_error(Phase,"phase")
  end
   def trial_status_id
     TrialStatus.find_by_name(@@xmlMapperObject.trial_status) ? trial_status_id=TrialStatus.find_by_name(@@xmlMapperObject.trial_status).id : self.pluck_and_save_error(TrialStatus,"trialStatus")
     p trial_status_id
   end

  def study_source_id
    StudySource.find_by_name(@@xmlMapperObject.study_source) ? study_source_id=StudySource.find_by_name(@@xmlMapperObject.study_source).id : self.pluck_and_save_error(StudySource,"category")
  end

  def pluck_and_save_error(x,xattr)
    @@errors.store(xattr,"Invalid value:following are valid values;")
    @@errors.store("validvalues",x.pluck(:name));
    #p @@errors
  end

  def validate_grants(fundingMechanism,nihInstitutionCode,serialNumber,nciDivisionProgramCode)
    isNciPCValid  =  AppSetting.find_by_code("NCI").big_value.split(',').include?(nciDivisionProgramCode)
    isSerialNumValid = Tempgrants.find_by_funding_mechanism_and_institute_code_and_serial_number(fundingMechanism,nihInstitutionCode,serialNumber) ? true : false

    return isSerialNumValid && isNciPCValid ? true:false
  end

  def add_ind_ide(type,ind_ide)
    ind_ide_hash ={}
    ind_ide_hash[:ind_ide_type]=type
    ind_ide_hash[:ind_ide_number]=ind_ide.ind_ide_number
    ind_ide_hash[:grantor]=ind_ide.grantor
    holder_type_id = HolderType.find_by_code(ind_ide.holderType).id
    ind_ide_hash[:holder_type_id]= holder_type_id


    ##If the holder type is NIH, select the NIH Institution.
    if holder_type_id == HolderType.find_by_code("NIH").id
      nihInstitution=ind_ide.nihInstitution
      nihInstMap=get_nih_inst_map
      p nihInstMap

      nihInstMap.has_key?(nihInstitution) ? ind_ide_hash[:nih_nci]=nihInstMap[:nihInstitution] : @@errors.store(type,"If holder type is NIH,valid nihInstitution expected ")
    end
    ##If the holder type is NCI, select the NCI Division Program Code.
    if holder_type_id == HolderType.find_by_code("NCI").id
      isNciPCValid  =  AppSetting.find_by_code("NCI").big_value.split(',').include?(ind_ide.nciDivisionProgramCode)
      isNciPCValid ? ind_ide_hash[:nih_nci]=ind_ide.nciDivisionProgramCode : @@errors.store(type,"If holder type is NCI,valid nciDivisionProgramCode expected ")
    end
    @@rest_params[:ind_ides_attributes].push(ind_ide_hash)
  end

 def get_nih_inst_map
   arr=[]
   hash = {}
   arr=AppSetting.find_by_code("NIH").big_value.split(';')
   arr.each  do |o|
     key=o.split(/-/).first
     val=o.split(/-/).second
     hash[key]=val
   end
   return hash
 end

  def isValidFileFormat(file_name)
    file_extension=File.extname(file_name).delete('.')
    return AppSetting.find_by_code("ACCEPTED_FILE_TYPES_REG").value.split(',').include?(file_extension)
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



def save_responsible_party

  if @@xmlMapperObject.responsible_party.nil?
    return
  end

  responsible_party  =  @@xmlMapperObject.responsible_party.type
  investigator_title = @@xmlMapperObject.responsible_party.investigator_title

  @@rest_params[:responsible_party_id] = ResponsibleParty.find_by_name(responsible_party).id

  if responsible_party != "Sponsor"
   investigator_title.nil? ? @@rest_params[:investigator_title] ="Principal Investigator" : @@rest_params[:investigator_title] =investigator_title
  end

  case responsible_party
    when "Principal Investigator"
        investigator_aff_id = @@xmlMapperObject.responsible_party.investigatorAffiliation.existingOrganization.id
        @@rest_params[:investigator_aff_id] = investigator_aff_id  if investigator_aff_id && valid_org("investigatorAffiliation",investigator_aff_id)
    when "Sponsor-Investigator"
          investigator_id = @@xmlMapperObject.responsible_party.investigator.existingPerson.id
          @@rest_params[:investigator_id] = investigator_id  if investigator_id && valid_person("investigator",investigator_id)
  end

end




  def add_file(file_name, file_content,document_type)

     if file_content.nil?
       return
     end

     decode_base64_content = Base64.decode64(file_content)
    file_extension = File.extname(file_name).delete('.') ##sample.pdf will give pdf
    file_format    = File.extname(file_name)             ##sample.pdf will give .pdf

    if !isValidFileFormat(file_name)
       @@errors.store(file_name,"Given file format is not valid, refer XSD for acceptable file formats");
       return
     end

    if file_extension == "pdf"
      pdf = Prawn::Document.new
      pdf.text(decode_base64_content)
      pdf.render_file(Rails.root.to_s + "/../../storage/tmp/" + file_name)
      pdf_file = File.open(Rails.root.to_s + "/../../storage/tmp/"+ file_name)
      file_params = {:filename => file_name, :type => "application/pdf", :tempfile => pdf_file}
    else
      temp_file = Tempfile.new(['Sample2',file_format])
      temp_file.binmode
      temp_file <<  decode_base64_content
      #temp_file.rewind
      file_params = {:filename => file_name, :tempfile => temp_file}
    end
    uploaded_file = ActionDispatch::Http::UploadedFile.new(file_params)
    trial_document_params = {:file => uploaded_file, :document_type =>document_type, :file_name => file_name}
    @@rest_params[:trial_documents_attributes].push(trial_document_params)

  end


end
