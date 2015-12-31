json.tempgrants do
  json.array!(@tempgrants) do |tempgrant|
    json.extract! tempgrant, :id, :serial_number
  end
end