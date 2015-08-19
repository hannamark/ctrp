class AddPaColumnsToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :admin_checkout, :text
    add_column :trials, :scientific_checkout, :text
    add_column :trials, :check_in_comment, :text
    add_column :trials, :assigned_to, :string, :limit => 255
    add_column :trials, :process_priority, :string, :limit => 255
    add_column :trials, :process_comment, :text
    add_column :trials, :receive_email, :boolean
    add_column :trials, :xml_required, :string, :limit => 255
    add_column :trials, :acronym, :string, :limit => 255
    add_column :trials, :keywords, :text
    add_column :trials, :email, :string, :limit => 255
    add_column :trials, :phone, :string, :limit => 255
    add_column :trials, :send_trial, :string, :limit => 255
    add_column :trials, :board_approval_num, :string, :limit => 255
    add_column :trials, :board_affiliation, :string, :limit => 255
    add_column :trials, :brief_title, :text
    add_column :trials, :brief_summary, :text
    add_column :trials, :detailed_description, :text
    add_column :trials, :objective, :text
    add_column :trials, :non_intervention_type, :string, :limit => 255
    add_column :trials, :target_enrollment, :integer
    add_column :trials, :final_enrollment, :integer
    add_column :trials, :accruals, :integer
    add_column :trials, :accept_vol, :string, :limit => 255
    add_column :trials, :min_age, :integer
    add_column :trials, :max_age, :integer

    add_reference :trials, :owner, references: :users, index: true
    add_foreign_key :trials, :users, column: :owner_id
    add_reference :trials, :personal_contact, references: :people, index: true
    add_foreign_key :trials, :people, column: :personal_contact_id
    add_reference :trials, :generic_contact, references: :people, index: true
    add_foreign_key :trials, :people, column: :generic_contact_id
    add_reference :trials, :rep_data_set_method, index: true
    add_foreign_key :trials, :rep_data_set_methods
    add_reference :trials, :industrial, index: true
    add_foreign_key :trials, :industrials
    add_reference :trials, :board_approval_status, index: true
    add_foreign_key :trials, :board_approval_statuses
    add_reference :trials, :board, references: :organizations, index: true
    add_foreign_key :trials, :organizations, column: :board_id
    add_reference :trials, :intervention_model, index: true
    add_foreign_key :trials, :intervention_models
    add_reference :trials, :masking, index: true
    add_foreign_key :trials, :maskings
    add_reference :trials, :allocation, index: true
    add_foreign_key :trials, :allocations
    add_reference :trials, :study_classification, index: true
    add_foreign_key :trials, :study_classifications
    add_reference :trials, :gender, index: true
    add_foreign_key :trials, :genders
    add_reference :trials, :min_age_unit, references: :age_units, index: true
    add_foreign_key :trials, :age_units, column: :min_age_unit_id
    add_reference :trials, :max_age_unit, references: :age_units, index: true
    add_foreign_key :trials, :age_units, column: :max_age_unit_id
    add_reference :trials, :anatomic_site, index: true
    add_foreign_key :trials, :anatomic_sites
  end
end
