class CreateMilestoneWrappers < ActiveRecord::Migration
  def change
    create_table :milestone_wrappers do |t|
      t.date :milestone_date
      t.references :milestone, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :milestone_wrappers, :milestones
    add_foreign_key :milestone_wrappers, :trials
  end
end
