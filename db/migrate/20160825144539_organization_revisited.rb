class OrganizationRevisited < ActiveRecord::Migration
  def change
    def change
      add_column :organizations, :processing_status, :string
      add_column :organizations, :address3, :string
    end
  end
end
