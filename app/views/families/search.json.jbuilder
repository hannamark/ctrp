json.people do
  json.array!(@families) do |family|
    json.extract! family, :id, :name
    json.url family_url(family, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @families.total_count
json.sort params[:sort]
json.order params[:order]
