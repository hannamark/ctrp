class AddDeletedToTrialDocument < ActiveRecord::Migration
  def change
    add_column :trial_documents, :deleted, :boolean, :default => false
  end
end
