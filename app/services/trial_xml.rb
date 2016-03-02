class LeadObj
  include XML::Mapping
  text_node :id , "poID"
end

class ExistingOrganization
  include XML::Mapping
  object_node :existingOrganization, "existingOrganization", :class => LeadObj
end
class ExistingPerson
  include XML::Mapping
  object_node :existingPerson, "existingPerson", :class => LeadObj
end

class TrialDate
include XML::Mapping
  text_node :type, "@type",:default_value=>""
end

class TrialXml
  @@errors= Hash.new
  include XML::Mapping

  text_node :phase, "phase", :default_valuse=>nil
  text_node :trial_status, "trialStatus", :default_value => nil
  text_node :lead_protocol_id, "leadOrgTrialID",:default_value=>nil
  text_node :official_title, "title",:default_value=>nil
  boolean_node :pilot, "pilot",:default_value=>""
  array_node  :grants, "grant", :class => GrantXml,:default_value=>[]
  object_node :leadOrganization, "leadOrganization", :class => ExistingOrganization
  object_node :pi, "pi", :class =>ExistingPerson
  object_node :sponsor, "sponsor", :class =>ExistingOrganization
  array_node  :fundingSources, "summary4FundingSponsor", :class =>ExistingOrganization
  hash_node :startDate, "trialStartDate", "@type", :class=>TrialDate
  text_node :startDateContent, "trialStartDate",:default_value=>""
  text_node :trialStatus, "trialStatus",:default_value=>""
  text_node :whyStopped, "whyStopped",:default_value=>""


  def trial
    rest_params = {}



    ##single attributes
    rest_params[:coming_from] = "rest"
    rest_params[:phase_id] = self.phase_id if self.phase_id
    rest_params[:official_title]   =   self.official_title if self.official_title
    rest_params[:lead_protocol_id] = self.lead_protocol_id if self.lead_protocol_id

    p self.startDateContent
    p self.startDate.keys[0]


#    rest_params.push

    a_trial = Trial.new(rest_params)

    for i in 0..1
      a_trial.grants << Grant.new(:funding_mechanism => self.grants[i].funding_mechanism,
                                  :institute_code => self.grants[i].institute_code,
                                  :serial_number => self.grants[i].serial_number,
                                  :nci => self.grants[i].nci)
    end

    return a_trial

  end


  def lead_org_id

    trialService=TrialService.new
    if trialService.active_ctrp_org_count(lead_org) > 0
      lead_org_id=lead_org
    else
      @@errors.store("tns:sponsor","Given sponsor does not exist in CTRP")

    end
    return lead_org_id
  end


  def pi_id

  end

  def sponsor_id

  end

  def phase_id

    if Phase.find_by_name(phase)
        phase_id=Phase.find_by_name(self.phase).id
    else
      phase_id=""
      self.pluck_and_save_error(Phase,"phase")
    end

    return phase_id

  end

  def errors
    return @@errors
  end

  def pluck_and_save_error(x,xattr)
    @@errors.store(xattr,"Invalid value:following are valid values;")
    @@errors.store("validvalues",x.pluck(:name));
    p @@errors
  end

end