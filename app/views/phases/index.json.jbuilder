json.array!(@phases) do |phase|
  json.extract! phase, :id, :code, :name
  json.url phase_url(phase, format: :json)
end
