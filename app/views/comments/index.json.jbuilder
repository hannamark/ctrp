json.array!(@comments) do |comment|
  json.extract! comment, :id, :content, :instance_uuid, :username,
    :fullname, :created_at, :updated_at, :model, :field, :parent_id
  json.url comment_url(comment, format: :json)
end
