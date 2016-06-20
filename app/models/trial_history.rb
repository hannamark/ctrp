class TrialHistory < ActiveRecord::Base
  include BasicConcerns

  belongs_to :submission
end
