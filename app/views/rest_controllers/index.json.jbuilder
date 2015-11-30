json.array!(@rest_controllers) do |rest_controller|
  json.extract! rest_controller, :id
  json.url rest_controller_url(rest_controller, format: :json)
end
