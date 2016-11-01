json.families do
  json.array!(@families) do |family|
    json.extract! family, :id, :name,:family_status_id,:family_type_id
    json.family_status family.family_status_name
    json.family_type family.family_type_name
    json.aff_orgs family.organizations.first(5) do |org|
      json.name org.name
    end
    json.aff_org_count family.organizations.count()
    json.url family_url(family, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @families.respond_to?(:total_count) ? @families.total_count : @families.size
json.sort params[:sort]
json.order params[:order]
