class AddSomeColumns < ActiveRecord::Migration
  def change
    add_column :participating_sites, :extension, :string, :limit => 255
    add_column :central_contacts, :extension, :string, :limit => 255
    add_column :trials, :verification_date, :date
  end
end
