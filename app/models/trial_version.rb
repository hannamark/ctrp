# == Schema Information
#
# Table name: trial_versions
#
#  id             :integer          not null, primary key
#  item_type      :string           not null
#  item_id        :integer          not null
#  event          :string           not null
#  whodunnit      :string
#  object         :jsonb
#  created_at     :datetime
#  object_changes :jsonb
#  transaction_id :integer
#

class TrialVersion <  PaperTrail::Version
  self.table_name = :trial_versions
end
