json.array!(@trial_documents) do |trial_document|
  json.extract! trial_document, :id, :file, :file_name, :document_type, :document_subtype
  json.url trial_document_url(trial_document, format: :json)
end
