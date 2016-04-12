json.diseases do
  json.array!(@diseases) do |disease|
    json.extract! disease, :id, :disease_code, :nt_term_id, :preferred_name, :menu_display_name, :ncit_status_id
    json.ncit_status do
      json.extract! disease.ncit_status, :id, :name, :code
    end
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @diseases.respond_to?(:total_count) ? @diseases.total_count : @diseases.size
json.sort params[:sort]
json.order params[:order]
