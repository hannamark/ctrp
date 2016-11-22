class CreatePoAffiliations < ActiveRecord::Migration
  def change
    create_table :po_affiliations do |t|
      t.references :person, index: true
      t.references :organization, index: true
      t.references :po_affiliation_status, index: true
      t.date :status_date

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :po_affiliations, :people
    add_foreign_key :po_affiliations, :organizations
    add_foreign_key :po_affiliations, :po_affiliation_statuses
  end
end
