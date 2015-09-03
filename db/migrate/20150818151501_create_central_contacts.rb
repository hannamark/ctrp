class CreateCentralContacts < ActiveRecord::Migration
  def change
    create_table :central_contacts do |t|
      t.string :country, :limit => 255
      t.string :phone, :limit => 255
      t.string :email, :limit => 255
      t.references :central_contact_type, index: true
      t.references :person, index: true
      t.references :trial, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :central_contacts, :central_contact_types
    add_foreign_key :central_contacts, :people
    add_foreign_key :central_contacts, :trials
  end
end
