class CreateTrialDocuments < ActiveRecord::Migration
  def change
    create_table :trial_documents do |t|
      t.string :file
      t.string :file_name, :limit => 255
      t.string :document_type, :limit => 255
      t.string :document_subtype, :limit => 255
      t.references :added_by, references: :users, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trial_documents, :users, column: :added_by_id
    add_foreign_key :trial_documents, :trials
  end
end
