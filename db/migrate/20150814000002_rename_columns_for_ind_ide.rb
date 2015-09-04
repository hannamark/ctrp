class RenameColumnsForIndIde < ActiveRecord::Migration
  def change
    change_table :ind_ides do |t|
      t.rename :type, :ind_ide_type
      t.rename :number, :ind_ide_number
    end
  end
end
