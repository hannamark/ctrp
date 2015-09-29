class ChangeTrialFields < ActiveRecord::Migration
  def change
    add_column :trials, :investigator_title, :string, :limit => 255
    add_reference :trials, :investigator_aff, references: :organizations, index: true
    add_foreign_key :trials, :organizations, column: :investigator_aff_id

    remove_column :grants, :serial_number, :integer
    add_column :grants, :serial_number, :string, :limit => 255
    remove_column :ind_ides, :ind_ide_number, :integer
    add_column :ind_ides, :ind_ide_number, :string, :limit => 255

    remove_column :trials, :authority_country, :string
    remove_column :trials, :authority_org, :string
  end
end
