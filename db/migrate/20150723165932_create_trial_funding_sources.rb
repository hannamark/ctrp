class CreateTrialFundingSources < ActiveRecord::Migration
  def change
    create_table :trial_funding_sources do |t|
      t.references :trial, index: true
      t.references :organization, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trial_funding_sources, :trials
    add_foreign_key :trial_funding_sources, :organizations
  end
end
