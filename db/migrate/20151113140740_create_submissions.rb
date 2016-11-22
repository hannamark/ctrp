class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.integer :submission_num
      t.date :submission_date
      t.integer :amendment_num
      t.date :amendment_date
      t.references :amendment_reason, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :submissions, :amendment_reasons
    add_foreign_key :submissions, :trials
  end
end
