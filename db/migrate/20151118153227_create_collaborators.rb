class CreateCollaborators < ActiveRecord::Migration
  def change
    create_table :collaborators do |t|
      t.string :org_name
      t.references :organization, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :collaborators, :organizations
    add_foreign_key :collaborators, :trials
  end
end
