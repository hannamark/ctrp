json.people do
  json.array!(@people) do |person|
    json.extract! person, :id, :source_id, :fname, :mname, :lname, :prefix, :suffix, :email, :phone
    json.source_context person.source_context.present? ? person.source_context.name : nil
    json.source_status person.source_status.present? ? person.source_status.name : nil
    json.url person_url(person, format: :json)
    #eager loading po_affiliations
    json.affiliated_orgs_count person.po_affiliations.length
    json.affiliated_orgs_first5 person.po_affiliations.first(5) do |po_affiliation|
      json.po_affiliation_id po_affiliation.id
      json.name po_affiliation.organization.name
      json.id po_affiliation.organization.id
    end
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @people.respond_to?(:total_count) ? @people.total_count : @people.size
json.sort params[:sort]
json.order params[:order]
