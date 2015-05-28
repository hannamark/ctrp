module BasicConcerns
  extend ActiveSupport::Concern

  included do
    has_paper_trail
    before_create :set_uuid
  end

  def set_uuid
    self.uuid = SecureRandom.uuid if self.has_attribute?(:uuid)
  end
end
