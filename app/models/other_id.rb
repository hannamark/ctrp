# == Schema Information
#
# Table name: other_ids
#
#  id                :integer          not null, primary key
#  protocol_id       :string(255)
#  source_context_id :integer
#  trial_id          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  uuid              :string(255)
#
# Indexes
#
#  index_other_ids_on_source_context_id  (source_context_id)
#  index_other_ids_on_trial_id           (trial_id)
#

class OtherId < ActiveRecord::Base
end
