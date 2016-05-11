class MailLog < ActiveRecord::Base
  include BasicConcerns

  belongs_to :mail_template
  belongs_to :trial
end
