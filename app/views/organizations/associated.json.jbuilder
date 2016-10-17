
#json.associated_orgs @associated_orgs
json.associated_orgs do
  json.array!(@associated_orgs) do |organization|
    json.extract! organization,
                  :id,
                  :source_id,
                  :name,
                  :address,
                  :address2,
                  :address3,
                  :processing_status,
                  :city,
                  :state_province,
                  :postal_code,
                  :country,
                  :email,
                  :phone_with_ext,
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
                  :org_updated_date,
                  :aff_families_names,
                  :org_assoc_date,
                  :service_request_name
    json.ctep_id organization.multiview_ctep_id
  end
end
json.active_context @active_context