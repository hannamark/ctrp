class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.bigint :po_id
      t.string :source_id, :limit => 255
      t.string :name, :limit => 255
      t.string :address, :limit => 255
      t.string :address2, :limit => 255
      t.string :city, :limit => 255
      t.string :state_province, :limit => 255
      t.string :postal_code, :limit => 255
      t.string :country, :limit => 255
      t.string :email, :limit => 255
      t.string :phone, :limit => 255
      t.string :fax, :limit => 255
      t.references :source_status, index: true
      t.references :source_context, index: true
      t.references :source_cluster, index: true

      t.timestamps null: false
      t.ctrp_base_columns
    end
    add_foreign_key :organizations, :source_statuses
    add_foreign_key :organizations, :source_contexts
    add_foreign_key :organizations, :source_clusters
  end
end
