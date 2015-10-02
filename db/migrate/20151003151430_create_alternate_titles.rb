class CreateAlternateTitles < ActiveRecord::Migration
  def change
    create_table :alternate_titles do |t|
      t.string :category, :limit => 255
      t.text :title
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :alternate_titles, :trials
  end
end
