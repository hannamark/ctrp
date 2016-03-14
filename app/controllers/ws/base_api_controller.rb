class Ws::BaseApiController < ApplicationController
  #force_ssl

  CONTENT_TYPE        =   "application/xml"

  before_filter :check_auth, :is_valid_mime

  def indicate_source
    @api = true
  end

  private
  def authenticate_user_from_token!

    if !@json['api_token']
      render nothing: true, status: :unauthorized
    else
      @user = nil
      User.find_each do |u|
        if Devise.secure_compare(u.api_token, @json['api_token'])
          @user = u
        end
      end
    end
  end

  def parse_request
    @json = JSON.parse(request.body.read)
  end


  def check_auth
    begin
    authenticate_or_request_with_http_basic do |username,password|
      resource = User.find_by_username_and_role(username,"ROLE_SERVICE-REST")

      if resource && resource.valid_password?(password)
        sign_in :user, resource
      end

    end
    rescue Errors::UnauthorizedAccessError => error
      render(xml: error, status: error.status)
    end

  end

  def is_valid_mime
    ##check content_type
    if  request.content_type != CONTENT_TYPE
      render nothing:true, status: '415'
    end

  end


end