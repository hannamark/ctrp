class AddIndexToNcitInterventions < ActiveRecord::Migration
  def change
    add_index :ncit_interventions, :preferred_name
    add_index :ncit_interventions, :c_code
  end
end
