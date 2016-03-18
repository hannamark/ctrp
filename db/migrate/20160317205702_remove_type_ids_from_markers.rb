class RemoveTypeIdsFromMarkers < ActiveRecord::Migration
  def change
    remove_reference :markers, :evaluation_type, index: true
    remove_reference :markers, :assay_type, index: true
    remove_reference :markers, :specimen_type, index: true
  end
end
