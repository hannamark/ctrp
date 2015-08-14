json.array!(@primary_purposes) do |primary_purpose|
  json.extract! primary_purpose, :id, :code, :name
  json.url primary_purpose_url(primary_purpose, format: :json)
end
