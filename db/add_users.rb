require "rest-client"

url = "http://localhost/ctrp/local_users"

## Sign_up ctrpadmin as LocalUser
ctrpsuper_json_body = {
    "local_user" => {"username" => "ctrpsuper", "password" => "Welcome01", "email" => "csuper@x.com"},
    "type" => "LocalUser"
}

## Sign_up ctrpadmin as LocalUser
ctrpadmin_json_body = {
    "local_user" => {"username" => "ctrpadmin", "password" => "Welcome01", "email" => "cadmin@x.com"},
    "type" => "LocalUser"
}


## Sign_up ctrpadmin as LocalUser
ctrpsiteadmin_json_body = {
    "local_user" => {"username" => "ctrpsiteadmin", "password" => "Welcome01", "email" => "csiteadmin@x.com"},
    "type" => "LocalUser"
}


## Sign_up ctrpcurator as LocalUser
ctrpcurator_json_body = {
    "local_user" => {"username" => "ctrpcurator", "password" => "Welcome01", "email" => "ccurator@x.com"},
    "type" => "LocalUser"
}

## Sign_up testerctrpcurator as LocalUser
testercurator_json_body = {
    "local_user" => {"username" => "testercurator", "password" => "Welcome01", "email" => "testercurator@x.com"},
    "type" => "LocalUser"
}

## Sign_up role_readonly as LocalUser
ctrpreadonly_json_body = {
    "local_user" => {"username" => "ctrpreadonly", "password" => "Welcome01", "email" => "ctrpreadonly@x.com"},
    "type" => "LocalUser"
}

[ctrpsuper_json_body, ctrpadmin_json_body, ctrpsiteadmin_json_body, ctrpcurator_json_body, testercurator_json_body, ctrpreadonly_json_body].each do |user|
    RestClient.post(url, user.to_json, :content_type => :json) do |response, request, result, &block|
        if [301, 302, 307].include? response.code
            redirected_url = response.headers[:location]
        else
            response.return!(request, result, &block)
        end
    end
end