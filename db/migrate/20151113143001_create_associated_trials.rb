class CreateAssociatedTrials < ActiveRecord::Migration
  def change
    create_table :associated_trials do |t|
      t.string :trial_identifier, :limit => 255
      t.references :identifier_type, index: true
      t.references :trial, index: true


      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :associated_trials, :identifier_types
    add_foreign_key :associated_trials, :trials
  end
end
