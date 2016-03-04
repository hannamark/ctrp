
 class LeadObj
    include XML::Mapping
    text_node :id , "poID",:optional=>true
  end

  class ExistingOrganization
    include XML::Mapping
    object_node :existingOrganization, "existingOrganization", :class => LeadObj,:optional=>true
  end
  class ExistingPerson
    include XML::Mapping
    object_node :existingPerson, "existingPerson", :class => LeadObj,:optional=>true
  end

  class TrialDate
    include XML::Mapping
    text_node :type, "@type",:default_value=>"",:optional=>true
  end

 class GrantXml
   include XML::Mapping
   text_node :funding_mechanism, "fundingMechanism", :optional=>true
   text_node :institute_code, "nihInstitutionCode",:optional=>true
   text_node :serial_number, "serialNumber",:optional=>true
   text_node :nci, "nciDivisionProgramCode",:optional=>true
 end

 class IndIdeXml
   include XML::Mapping
   numeric_node :ind_ide_number, "number", :optional=>true
   text_node :grantor, "grantor", :optional=>true
   text_node :holderType, "holderType", :optional=>true
   text_node :nihInstitution, "nihInstitution", :optional=>true
   text_node :nciDivisionProgramCode, "nciDivisionProgramCode", :optional=>true
   boolean_node :expanded_access, "expandedAccess",:optional=>true
   text_node :expandedAccessType, "expandedAccessType", :optional=>true
   boolean_node :exempt, "exempt",:optional=>true
 end

  class ApiTrialXmlMapper
    include XML::Mapping

    ###Trial Identifiers
    text_node :category, "category",:optional=>true,:default_value=>nil

    ### Trial Details
    text_node :official_title, "title",:optional=>true,:default_value=>nil
    text_node :phase, "phase",:optional=>true, :default_valuse=>nil
    boolean_node :pilot, "pilot",:optional=>true,:default_value=>nil
    text_node :lead_protocol_id, "leadOrgTrialID",:optional=>true,:default_value=>nil

    ### Lead Org, PI, Sponsor
    object_node :leadOrganization, "leadOrganization", :class => ExistingOrganization,:optional=>true
    object_node :pi, "pi", :class =>ExistingPerson,:optional=>true
    object_node :sponsor, "sponsor", :class =>ExistingOrganization,:optional=>true

    ##Funding Source
    array_node  :fundingSources, "summary4FundingSponsor", :class =>ExistingOrganization,:optional=>true

    ###Grants

    boolean_node :grant_question, "fundedByNciGrant",:optional=>true,:default_value=>nil
    array_node  :grants, "grant",:optional=>true, :class => GrantXml,:default_value=>[]

    ###Trial Status
    text_node :trial_status, "trialStatus",:default_value=>nil,:optional=>true
    text_node :why_stopped, "whyStopped",:default_value=>nil,:optional=>true
    text_node :status_date, "trialStatusDate",:default_value=>nil,:optional=>true

    ###Trial Dates
    hash_node :start_date_qual, "trialStartDate", "@type", :class=>TrialDate,:optional=>true
    text_node :start_date, "trialStartDate",:default_value=>nil,:optional=>true
    hash_node :primary_comp_date_qual, "primaryCompletionDate", "@type", :class=>TrialDate,:optional=>true
    text_node :primary_comp_date, "primaryCompletionDate",:default_value=>nil,:optional=>true
    hash_node :comp_date_qual, "completionDate", "@type", :class=>TrialDate,:optional=>true
    text_node :comp_date, "completionDate",:default_value=>nil,:optional=>true

    ###IND,IDE
    array_node  :inds, "ind",:optional=>true, :class => IndIdeXml,:default_value=>[]
    array_node  :ides, "ide",:optional=>true, :class => IndIdeXml,:default_value=>[]




    ###Regulatory Information


    ###Trial Docs


  end
