class CreateParticipatingSites < ActiveRecord::Migration
  def change
    create_table :participating_sites do |t|
      t.string :protocol_id, :limit => 255
      t.string :program_code, :limit => 255
      t.string :contact_name, :limit => 255
      t.string :contact_phone, :limit => 255
      t.string :contact_email, :limit => 255
      t.references :trial, index: true
      t.references :organization, index: true
      t.references :person, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :participating_sites, :trials
    add_foreign_key :participating_sites, :organizations
    add_foreign_key :participating_sites, :people
  end
end
