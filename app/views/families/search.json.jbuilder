json.families do
  json.array!(@families) do |family|
    json.extract! family, :id, :name, :description,:family_status_id,:family_type_id
    json.family_status family.family_status.present? ? family.family_status.name : nil
    json.family_type family.family_type.present? ? family.family_type.name : nil
    json.aff_orgs family.organizations do |org|
      json.name org.name
    end
    json.url family_url(family, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @families.total_count
json.sort params[:sort]
json.order params[:order]
