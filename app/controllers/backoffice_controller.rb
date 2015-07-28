class BackofficeController < ApplicationController


  def index
  end

  def static_members
  end

  def download_log
    send_file(
        "#{Rails.root}/../../logs/#{Rails.env}.log",
        filename: "#{Rails.env}.log",
        type: "text/plain"
    )
  end
end
