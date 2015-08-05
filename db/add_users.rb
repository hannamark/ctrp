require "rest-client"

## Sign_up ctrpadmin as LocalUser
ctrpadmin_json_body = {
    "local_user" => {"username" => "ctrpadmin", "password" => "Welcome01", "email" => "cadmin@x.com"},
    "type" => "LocalUser"
}


RestClient.post('http://localhost/ctrp/local_users', ctrpadmin_json_body.to_json, :content_type => :json) do |response, request, result, &block|
    if [301, 302, 307].include? response.code
        redirected_url = response.headers[:location]
    else
        response.return!(request, result, &block)
    end
end


## Sign_up ctrpcurator as LocalUser
ctrpcurator_json_body = {
    "local_user" => {"username" => "ctrpcurator", "password" => "Welcome01", "email" => "ccurator@x.com"},
    "type" => "LocalUser"
}


RestClient.post('http://localhost/ctrp/local_users', ctrpcurator_json_body.to_json, :content_type => :json) do |response, request, result, &block|
    if [301, 302, 307].include? response.code
        redirected_url = response.headers[:location]
    else
        response.return!(request, result, &block)
    end
end


