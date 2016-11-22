class CreateOnholds < ActiveRecord::Migration
  def change
    create_table :onholds do |t|
      t.text :onhold_desc
      t.date :onhold_date
      t.references :onhold_reason, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :onholds, :onhold_reasons
    add_foreign_key :onholds, :trials
  end
end
