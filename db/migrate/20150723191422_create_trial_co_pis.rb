class CreateTrialCoPis < ActiveRecord::Migration
  def change
    create_table :trial_co_pis do |t|
      t.references :trial, index: true
      t.references :co_pi, references: :people, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :trial_co_pis, :trials
    add_foreign_key :trial_co_pis, :people, column: :co_pi_id
  end
end
