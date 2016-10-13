json.extract! @person, :id, :source_id, :fname, :mname, :lname, :prefix, :suffix, :email, :phone, :source_status_id,
              :source_context_id, :po_affiliations, :created_at, :updated_at, :created_by, :updated_by, :cluster,
              :lock_version, :uuid, :person_created_date, :person_updated_date, :processing_status, :ctrp_id, :association_start_date,
              :service_request, :registration_type


ctrp_context_id = SourceContext.find_by_code('CTRP').id
ctep_context_id = SourceContext.find_by_code('CTEP').id
json.set! :is_ctrp_context, ctrp_context_id == @person.source_context_id # flag if this person is ctrp context

@associated_persons = Person.where("ctrp_id = ? AND source_context_id = ?", @person.ctrp_id, ctep_context_id) if @person.ctrp_id.present? && @person.source_context_id == ctrp_context_id

json.associated_persons do
  json.array!(@associated_persons) do |p|
    json.merge! p.attributes # get all the attributes in person
    json.set! :source_context, SourceContext.find(p.source_context_id).name if p.source_context_id.present?
    json.set! :source_status, SourceStatus.find(p.source_status_id).name if p.source_status_id.present?
  end
end
