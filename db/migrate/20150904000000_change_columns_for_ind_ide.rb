class ChangeColumnsForIndIde < ActiveRecord::Migration
  def change
    change_table :ind_ides do |t|
      t.rename :type, :ind_ide_type
      t.rename :number, :ind_ide_number
    end
    remove_column :ind_ides, :expanded_access, :string
    add_column :ind_ides, :expanded_access, :boolean
    remove_column :ind_ides, :exempt, :string
    add_column :ind_ides, :exempt, :boolean
  end
end
