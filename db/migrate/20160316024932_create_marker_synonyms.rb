class CreateMarkerSynonyms < ActiveRecord::Migration
  def change
    create_table :marker_synonyms do |t|
      t.string :alternate_name
      t.references :marker_cadsr, index: true
      t.references :source_status, index: true

      t.timestamps null: false
    end
    add_foreign_key :marker_synonyms, :marker_cadsrs
    add_foreign_key :marker_cadsrs, :source_statuses

  end
end
