json.extract! @participating_site, :id,:site_rec_status_wrappers, :participating_site_investigators, :created_at, :updated_at

json.site_rec_status_wrappers do
  json.array!(@participating_site.site_rec_status_wrappers) do |site_rec_status_wrapper|
    json.id site_rec_status_wrapper.id
    json.status_date  site_rec_status_wrapper.status_date
    json.site_recruitment_status  site_rec_status_wrapper.site_recruitment_status.nil? ? "" : site_rec_status_wrapper.site_recruitment_status.name
    json.comments  site_rec_status_wrapper.comments
  end
=begin
  json.participating_site_investigators do
    json.array!(@participating_site.participating_site_investigators) do |inv|
      json.person_id inv.person.present? ? inv.person.id : nil
      json.investigator_type inv.investigator_type
      json.set_as_contact inv.set_as_contact

    end
  end
=end
end

