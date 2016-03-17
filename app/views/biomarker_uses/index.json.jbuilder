json.array!(@biomarker_uses) do |biomarker_use|
  json.extract! biomarker_use, :id,:code,:name
  json.url bio_marker_use_url(biomarker_use, format: :json)
end
