require "rest-client"

url = "http://localhost:3000/ctrp/local_users"


["ctrpsuper", "ctrpadmin", "ctrpsiteadmin", "ctrpcurator", "testercurator", "ctrpreadonly"].each do |username|

  body =    { "local_user" => {"username" => username, "password" => "Welcome01", "email" => "#{username}@x.com"},
      "type" => "LocalUser"
  }

  RestClient.post(url, body.to_json, :content_type => :json) do |response, request, result, &block|
        if [301, 302, 307].include? response.code
            redirected_url = response.headers[:location]
        else
            response.return!(request, result, &block)
        end
    end
end


["po_curator1", "po_curator2", "po_curator3"].each do |username|

  body =    { "local_user" => {"username" => username, "password" => "Welcome01", "email" => "#{username}@x.com"},
              "type" => "LocalUser"
  }

  RestClient.post(url, body.to_json, :content_type => :json) do |response, request, result, &block|
    if [301, 302, 307].include? response.code
      redirected_url = response.headers[:location]
    else
      response.return!(request, result, &block)
    end
  end
end
