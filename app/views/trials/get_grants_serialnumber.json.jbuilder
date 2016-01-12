json.tempgrants do
  json.array!(@tempgrants) do |tempgrant|
    json.extract! tempgrant, :id, :serial_number, :institution_name, :project_title, :created_at, :updated_at
  end
end