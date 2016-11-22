json.array!(@milestones) do |milestone|
  json.extract! milestone, :id, :code, :name
  json.url milestone_url(milestone, format: :json)
end
