class CtrpMailer < ApplicationMailer
  default from: "noreply@ctrp.nci.nih.gov"

  def general_email(from, to, cc, bcc, subject, body)
    @body = body
    mail(from: from, to: to, cc: cc, bcc: bcc, subject: subject)
  end
end
