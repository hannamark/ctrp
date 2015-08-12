class CreateTrials < ActiveRecord::Migration
  def change
    create_table :trials do |t|
      t.string :nci_id, :limit => 255
      t.string :lead_protocol_id, :limit => 255
      t.text :official_title
      t.string :pilot, :limit => 255
      t.string :research_category, :limit => 255
      t.string :primary_purpose_other, :limit => 255
      t.string :secondary_purpose_other, :limit => 255
      t.string :program_code, :limit => 255
      t.string :grant_question, :limit => 255
      t.date :start_date
      t.string :start_date_qual, :limit => 255
      t.date :primary_comp_date
      t.string :primary_comp_date_qual, :limit => 255
      t.date :comp_date
      t.string :comp_date_qual, :limit => 255
      t.string :ind_ide_question, :limit => 255
      t.string :authority_country, :limit => 255
      t.string :authority_org, :limit => 255
      t.string :intervention_indicator, :limit => 255
      t.string :sec801_indicator, :limit => 255
      t.string :data_monitor_indicator, :limit => 255
      t.json :history
      t.references :study_source, index: true
      t.references :phase, index: true
      t.references :primary_purpose, index: true
      t.references :secondary_purpose, index: true
      t.references :responsible_party, index: true
      t.references :lead_org, references: :organizations, index: true
      t.references :pi, references: :people, index: true
      t.references :sponsor, references: :organizations, index: true
      t.references :investigator, references: :people, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trials, :study_sources
    add_foreign_key :trials, :phases
    add_foreign_key :trials, :primary_purposes
    add_foreign_key :trials, :secondary_purposes
    add_foreign_key :trials, :responsible_parties
    add_foreign_key :trials, :organizations, column: :lead_org_id
    add_foreign_key :trials, :people, column: :pi_id
    add_foreign_key :trials, :organizations, column: :sponsor_id
    add_foreign_key :trials, :people, column: :investigator_id
  end
end
