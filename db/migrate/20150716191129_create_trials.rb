class CreateTrials < ActiveRecord::Migration
  def change
    create_table :trials do |t|
      t.string :nci_id, :limit => 255
      t.string :lead_protocol_id, :limit => 255
      t.text :official_title
      t.string :pilot, :limit => 255
      t.string :research_category, :limit => 255
      t.json :lead_org
      t.json :co_lead_org
      t.json :principal_investigator
      t.json :co_principal_investigator
      t.json :sponsor
      t.json :investigator
      t.json :funding_source
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
      t.references :study_source, index: true
      t.references :phase, index: true
      t.references :primary_purpose, index: true
      t.references :secondary_purpose, index: true
      t.references :study_model, index: true
      t.references :time_perspective, index: true
      t.references :responsible_party, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trials, :study_sources
    add_foreign_key :trials, :phases
    add_foreign_key :trials, :primary_purposes
    add_foreign_key :trials, :secondary_purposes
    add_foreign_key :trials, :study_models
    add_foreign_key :trials, :time_perspectives
    add_foreign_key :trials, :responsible_parties
  end
end
