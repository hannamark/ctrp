json.deleted_documents do

  json.array!(@deleted_documents) do |deleted_doc|

    json.id deleted_doc.id
    json.file_name deleted_doc.file_name
    json.why_deleted deleted_doc.why_deleted


  end

  end