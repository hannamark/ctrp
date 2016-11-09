class PersonRestService

  def active_ctep_org_count(org_id)

    return Organization.where("ctrp_id=?", org_id).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTEP").id,SourceStatus.find_by_name("Active").id).count;

  end

  def active_ctrp_org_count(org_id)

    return Organization.where("ctrp_id=?", org_id).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("CTRP").id,SourceStatus.find_by_name("Active").id).count;

  end

  def active_nlm_org_count(org_id)

    return Organization.where("ctrp_id=?", org_id).where("source_context_id=? and source_status_id=?", SourceContext.find_by_name("NLM").id,SourceStatus.find_by_name("Active").id).count;

  end

end