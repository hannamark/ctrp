class CtrpMailer < ApplicationMailer
  default from: "noreply@ctrp.nci.nih.gov"

  def general_email(to, subject, body)
    @body = body
    mail(to: to, subject: subject)
  end
end
