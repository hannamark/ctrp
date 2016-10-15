
#json.associated_orgs @associated_orgs
json.associated_orgs do
  json.array!(@associated_orgs) do |organization|
    json.extract! organization,
                  :id,
                  :source_id,
                  :name,
                  :address,
                  :address2,
                  :processing_status,
                  :city,
                  :state_province,
                  :postal_code,
                  :country,
                  :email,
                  :phone,
                  :extension,
                  :ctrp_id,
                  :source_context_id,
                  :source_status_id,
                  :source_context_name,
                  :source_status_name,
                  :families,
                  :name_aliases,
                  :created_by,
                  :updated_by,
                  :ctep_id,
                  :uuid,
                  :org_created_date,
                  :org_updated_date
  end
end