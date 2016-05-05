class TrialCheckoutLog < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial

end
