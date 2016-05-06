class TrialCheckoutLog < ActiveRecord::Base
  include BasicConcerns

  belongs_to :trial
  belongs_to :user

end
