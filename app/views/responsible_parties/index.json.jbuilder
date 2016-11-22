json.array!(@responsible_parties) do |responsible_party|
  json.extract! responsible_party, :id, :code, :name
  json.url responsible_party_url(responsible_party, format: :json)
end
