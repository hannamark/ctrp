class CreateTrialCoLeadOrgs < ActiveRecord::Migration
  def change
    create_table :trial_co_lead_orgs do |t|
      t.references :trial, index: true
      t.references :organization, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trial_co_lead_orgs, :trials
    add_foreign_key :trial_co_lead_orgs, :organizations
  end
end
