json.people do
  json.array!(@people) do |person|
    json.extract! person, :id, :source_id, :name, :prefix, :suffix, :email, :phone
    json.source_status person.source_status.present? ? person.source_status.name : nil
    json.url person_url(person, format: :json)
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @people.respond_to?(:total_count) ? @people.total_count : @people.size
json.sort params[:sort]
json.order params[:order]
