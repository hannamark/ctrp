json.extract! @participating_site, :id, :created_at, :updated_at

json.site_rec_status_wrappers do
  json.array!(@participating_site.site_rec_status_wrappers) do |site_rec_status_wrapper|
    json.id site_rec_status_wrapper.id
    json.status_date  site_rec_status_wrapper.status_date
    json.site_recruitment_status  site_rec_status_wrapper.site_recruitment_status.name
    json.comments  site_rec_status_wrapper.comments
  end
end

