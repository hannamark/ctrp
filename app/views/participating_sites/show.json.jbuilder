json.extract! @participating_site, :id, :protocol_id, :program_code, :contact_name, :contact_phone, :contact_email,
              :trial_id, :trial, :organization_id, :organization, :person_id, :person, :extension,
              :created_at, :updated_at

json.participating_site_investigators do
  json.array!(@participating_site.participating_site_investigators) do |investigator|
    json.extract! investigator, :id, :person_id, :person, :set_as_contact, :investigator_type
  end
end

json.site_rec_status_wrappers do
  json.array!(@participating_site.site_rec_status_wrappers) do |status|
    json.extract! status, :id, :status_date, :site_recruitment_status_id, :site_recruitment_status, :comments
  end
end