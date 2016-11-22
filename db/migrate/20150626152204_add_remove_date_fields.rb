class AddRemoveDateFields < ActiveRecord::Migration
  def change
    remove_column :people, :status_date, :date
    remove_column :po_affiliations, :status_date, :date
    add_column :po_affiliations, :effective_date, :datetime
    add_column :po_affiliations, :expiration_date, :datetime
  end
end
