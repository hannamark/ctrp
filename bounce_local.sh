#local bounce script by shivece 2015-10-23

ps -ef | grep [r]ails | grep -v grep | awk '{print $2}' | xargs kill -15
rake db:drop
rake db:create
rake db:migrate

osascript -e 'tell app "Terminal"
   do script "cd /local/content/ctrp/apps/ctrp/ && rails s" 
end tell'

sleep 5
ruby db/add_users.rb
rake db:seed

#other commands used in trying to develop this script
#ps ax | grep [r]ails | awk '{ print "local server pid = " $1; }'
#kill $(ps aux | grep '[r]ails' | awk '{print $2}')
