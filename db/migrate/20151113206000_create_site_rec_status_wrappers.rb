class CreateSiteRecStatusWrappers < ActiveRecord::Migration
  def change
    create_table :site_rec_status_wrappers do |t|
      t.date :status_date
      t.references :site_recruitment_status, index: true
      t.references :participating_site, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :site_rec_status_wrappers, :site_recruitment_statuses
    add_foreign_key :site_rec_status_wrappers, :participating_sites
  end
end
