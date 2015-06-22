class CreatePoAffiliationStatuses < ActiveRecord::Migration
  def change
    create_table :po_affiliation_statuses do |t|

      t.static_member_base_columns
      t.timestamps null: false
      t.ctrp_base_columns
    end
  end
end
