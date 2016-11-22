class AddNumberOfArmsToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :num_of_arms, :integer
  end
end
