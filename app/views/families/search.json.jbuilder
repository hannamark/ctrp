json.families do
  json.array!(@families) do |family|
    json.extract! family, :id, :name, :description,:family_status_id,:family_type_id
    json.url family_url(family, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @families.total_count
json.sort params[:sort]
json.order params[:order]
