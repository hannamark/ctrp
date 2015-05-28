class CreateFamilyMemberships < ActiveRecord::Migration
  def change
    create_table :family_memberships do |t|
      t.references :family, index: true
      t.references :organization, index: true
      t.references :family_relationship, index: true
      t.datetime :effective_date
      t.datetime :expiration_date

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :family_memberships, :families
    add_foreign_key :family_memberships, :organizations
    add_foreign_key :family_memberships, :family_relationships
  end
end
