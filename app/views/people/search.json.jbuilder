json.orgs do
  json.array!(@people) do |person|
    json.extract! person, :id, :source_id, :name, :suffix, :email, :phone
  end
end
json.start params[:start]
json.rows params[:rows]
json.sort params[:sort]
json.order params[:order]
json.alias params[:alias]