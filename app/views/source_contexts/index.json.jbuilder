json.array!(@source_contexts) do |source_context|
  json.extract! source_context, :id, :code, :name
  json.url source_context_url(source_context, format: :json)
end
