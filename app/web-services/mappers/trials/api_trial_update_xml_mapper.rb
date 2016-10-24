require 'api_trial_child_xml_mappers.rb'

class ApiTrialUpdateXmlMapper

  include XML::Mapping

  ###Trial Identifiers
  text_node :study_source, "category",:optional=>true,:default_value=>nil
  text_node :lead_protocol_id, "leadOrgTrialID",:optional=>true,:default_value=>nil
  array_node  :otherIDs, "otherTrialID",:optional=>true, :class => String,:default_value=>[]
  array_node  :clinicalIDs, "clinicalTrialsDotGovTrialID",:optional=>true, :class => String,:default_value=>[]


  ### Trial Details
  text_node :official_title, "title",:optional=>true,:default_value=>nil
  text_node :phase, "phase",:optional=>true, :default_valuse=>nil


  text_node :pilot, "pilot", :default_value=>nil, :optional=>true,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              obj.pilot=BooleanMapper.map(obj.pilot)
            }




  text_node :primary_purpose_id,"primaryPurpose",:optional=>true,:default_value=>nil,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
             # obj.primary_purpose_id= PrimaryPurpose.find_by_name(obj.primary_purpose_id).id
            }
  text_node :primary_purpose_other, "primaryPurposeOtherDescription", :optional=>true, :default_value=>nil

  text_node :accrual_disease_term_id,"accrualDiseaseTerminology",:optional=>true,:default_value=>nil,
            :reader=>proc{|obj,xml,default_reader|
              default_reader.call(obj,xml)
              obj.accrual_disease_term_id= AccrualDiseaseTerm.find_by_name(obj.accrual_disease_term_id).id
            }


  ### Lead Org, PI, Sponsor
  object_node :leadOrganization, "leadOrganization", :class => ExistingOrganization,:optional=>true
  object_node :pi, "pi", :class =>ExistingPerson,:optional=>true
  object_node :sponsor, "sponsor", :class =>ExistingOrganization,:optional=>true

  ##Funding Source
  array_node  :fundingSources, "summary4FundingSponsor", :class =>ExistingOrganization,:optional=>true
  text_node :program_code, "programCode",:optional=>true, :default_valuse=>nil


  ###Grants

  boolean_node :grant_question, "fundedByNciGrant",:optional=>true,:default_value=>nil
  array_node  :grants, "grant",:optional=>true, :class => GrantXml,:default_value=>[]

  ###Trial Status
  text_node :trial_status, "trialStatus",:default_value=>nil,:optional=>true
  text_node :why_stopped, "whyStopped",:default_value=>nil,:optional=>true
  text_node :status_date, "trialStatusDate",:default_value=>nil,:optional=>true

  ###Trial Dates
  text_node :start_date_qual, "trialStartDate/@type" ,:default_value=>nil,:optional=>true
  text_node :start_date, "trialStartDate",:default_value=>nil,:optional=>true

  text_node :primary_comp_date_qual, "primaryCompletionDate/@type" ,:default_value=>nil,:optional=>true
  text_node :primary_comp_date, "primaryCompletionDate",:default_value=>nil,:optional=>true

  text_node :comp_date_qual, "completionDate/@type" ,:default_value=>nil,:optional=>true
  text_node :comp_date, "completionDate",:default_value=>nil,:optional=>true






  ###IND,IDE
  array_node  :inds, "ind",:optional=>true, :class => IndIdeXml,:default_value=>[]
  array_node  :ides, "ide",:optional=>true, :class => IndIdeXml,:default_value=>[]

  ###Regulatory Information
  object_node :regulatoryInformation, "regulatoryInformation", :class =>RegulatoryInformationXml,:optional=>true,:default_value=>nil



  ###Trial Docs
  #    hash_node :protocol_file_name, "protocolDocument", "@filename", :class=>TrialDate,:optional=>true
  #   text_node :protocol_content, "protocolDocument",:default_value=>nil,:optional=>true


end