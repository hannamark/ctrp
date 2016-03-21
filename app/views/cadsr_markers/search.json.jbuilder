json.cadsr_markers do
  json.array!(@cadsr_markers) do |cadsr_marker|
    json.extract! cadsr_marker, :id, :name,:description,:pv_name,:meaning
  end
end
