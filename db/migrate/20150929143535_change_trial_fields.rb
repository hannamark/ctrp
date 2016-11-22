class ChangeTrialFields < ActiveRecord::Migration
  def change
    add_reference :trials, :accrual_disease_term, index: true
    add_foreign_key :trials, :accrual_disease_terms

    add_column :trials, :investigator_title, :string, :limit => 255
    add_reference :trials, :investigator_aff, references: :organizations, index: true
    add_foreign_key :trials, :organizations, column: :investigator_aff_id

    remove_column :grants, :serial_number, :integer
    add_column :grants, :serial_number, :string, :limit => 255
    remove_column :ind_ides, :ind_ide_number, :integer
    add_column :ind_ides, :ind_ide_number, :string, :limit => 255

    remove_column :trials, :authority_country, :string
    remove_column :trials, :authority_org, :string

    add_column :trials, :created_by, :string, :limit => 255
    add_column :trials, :updated_by, :string, :limit => 255
    add_column :trials, :is_draft, :boolean
  end
end
