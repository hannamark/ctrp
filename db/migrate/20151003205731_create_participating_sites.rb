class CreateParticipatingSites < ActiveRecord::Migration
  def change
    create_table :participating_sites do |t|
      t.string :protocol_id, :limit => 255
      t.date :status_date
      t.string :program_code, :limit => 255
      t.references :trial, index: true
      t.references :organization, index: true
      t.references :person, index: true
      t.references :site_recruitment_status, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :participating_sites, :trials
    add_foreign_key :participating_sites, :organizations
    add_foreign_key :participating_sites, :people
    add_foreign_key :participating_sites, :site_recruitment_statuses
  end
end
