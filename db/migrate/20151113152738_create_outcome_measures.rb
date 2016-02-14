class CreateOutcomeMeasures < ActiveRecord::Migration
  def change
    create_table :outcome_measures do |t|
      t.text :title
      t.string :time_frame, :limit => 255
      t.text :description
      t.string :safety_issue, :limit => 255
      t.references :outcome_measure_type, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :outcome_measures, :outcome_measure_types
    add_foreign_key :outcome_measures, :trials
  end
end
