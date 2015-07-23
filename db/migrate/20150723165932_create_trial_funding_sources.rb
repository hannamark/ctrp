class CreateTrialFundingSources < ActiveRecord::Migration
  def change
    create_table :trial_funding_sources do |t|
      t.references :trial, index: true
      t.references :funding_source, references: :organizations, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trial_funding_sources, :trials
    add_foreign_key :trial_funding_sources, :organizations, column: :funding_source_id
  end
end
