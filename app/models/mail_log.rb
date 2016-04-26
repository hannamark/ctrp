class MailLog < ActiveRecord::Base
  include BasicConcerns

  belongs_to :email_template, :class_name => 'MailTemplate'
end
