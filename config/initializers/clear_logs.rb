#Clean out logs in development mode.

if Rails.env.development?
  MAX_LOG_SIZE = 5.megabytes

  #logs = [ File.join(Rails.root, 'log', 'development.log'), File.join(Rails.root, 'log', 'test.log') ]

  logs = [ File.join("/local/content/ctrp/logs/development.log"), File.join("/local/content/ctrp/logs/test.log") ]

  logs.each do |log|
    log_size = File.size?(log).to_i
    if log_size > MAX_LOG_SIZE
      $stdout.puts "Removing logs: #{log}"
      `rm #{log}`
    end
  end
end