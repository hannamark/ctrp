class AddAmendReasonToTrials < ActiveRecord::Migration
  def change
    add_reference :trials, :amendment_reason, index: true
    add_foreign_key :trials, :amendment_reasons
  end
end
