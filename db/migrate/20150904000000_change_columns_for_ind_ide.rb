class ChangeColumnsForIndIde < ActiveRecord::Migration
  def change
    change_table :ind_ides do |t|
      t.rename :type, :ind_ide_type
      t.rename :number, :ind_ide_number
      t.remove :expanded_access
      t.column :expanded_access, :boolean
      t.remove :exempt
      t.column :exempt, :boolean
    end
  end
end
