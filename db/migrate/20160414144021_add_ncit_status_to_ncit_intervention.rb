class AddNcitStatusToNcitIntervention < ActiveRecord::Migration
  def change
    add_column :ncit_interventions, :ncit_status_id, :integer
  end
end
