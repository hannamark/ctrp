# == Schema Information
#
# Table name: other_ids
#
#  id                    :integer          not null, primary key
#  protocol_id           :string(255)
#  protocol_id_origin_id :integer
#  trial_id              :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  uuid                  :string(255)
#
# Indexes
#
#  index_other_ids_on_protocol_id_origin_id  (protocol_id_origin_id)
#  index_other_ids_on_trial_id               (trial_id)
#

class OtherId < ActiveRecord::Base
  include BasicConcerns

  belongs_to :pritocol_id_origin
  belongs_to :trial
end
