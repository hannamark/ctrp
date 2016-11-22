json.array!(@holder_types) do |holder_type|
  json.extract! holder_type, :id, :code, :name
  json.url holder_type_url(holder_type, format: :json)
end
