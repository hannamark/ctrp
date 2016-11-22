class RemoveDescriptionFromFamilies < ActiveRecord::Migration
  def change
    remove_column :families, :description, :string
  end
end
