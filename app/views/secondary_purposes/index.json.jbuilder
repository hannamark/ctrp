json.array!(@secondary_purposes) do |secondary_purpose|
  json.extract! secondary_purpose, :id, :code, :name
  json.url secondary_purpose_url(secondary_purpose, format: :json)
end
