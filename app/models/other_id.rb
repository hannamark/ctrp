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
#  lock_version          :integer          default(0)
#
# Indexes
#
#  index_other_ids_on_protocol_id_origin_id  (protocol_id_origin_id)
#  index_other_ids_on_trial_id               (trial_id)
#

class OtherId < TrialBase

  belongs_to :protocol_id_origin
  belongs_to :trial

  validates :protocol_id, presence: true
  validates :protocol_id_origin, presence: true

  scope :by_value, ->  (value) {
    joins(:protocol_id_origin).where("other_ids.protocol_id_origin_id = protocol_id_origins.id and protocol_id_origins.code = ?","#{value.to_s}")
  }

  scope :latest, -> {
    order("updated_at DESC").first
  }


end
