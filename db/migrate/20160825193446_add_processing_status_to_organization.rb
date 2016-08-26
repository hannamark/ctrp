class AddProcessingStatusToOrganization < ActiveRecord::Migration
  def change
    add_column :organizations, :processing_status, :string
  end
end
