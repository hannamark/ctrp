module CTRP

  #shivece 2015-09-17
  #This initializer attempts to get the current branch git revision and make it available within the application context.

  begin
    #For CI, read git_rev.xt which is generated within Jenkins workspace that
    #has .git folders. This file is subsequently and copied with deployment.

    x = File.read("/local/content/ctrp/apps/ctrp/git_rev.txt")
    y = File.read("/local/content/ctrp/apps/ctrp/git_full_rev.txt")
    z = File.read("/local/content/ctrp/apps/ctrp/git_branch.txt")

    #hStrip \n from git output
    GIT_SHORT_REVISION ||= x.delete("\n")
    GIT_FULL_REVISION ||= y.delete("\n")
    GIT_BRANCH ||= z.delete("\n")

  rescue
    #File not present; likely executed in local dev. Get git revision by running command locally in ensure block.
    #puts "git_rev.txt not found #{$!}"

  ensure
    #Get git revision by running command locally from workspace
    x = `git rev-parse --short HEAD`
    y = `git rev-parse HEAD`
    z = `git rev-parse --abbrev-ref HEAD`

    #strip \n from git output
    GIT_SHORT_REVISION ||= x.delete("\n")
    GIT_FULL_REVISION ||= y.delete("\n")
    GIT_BRANCH ||= z.delete("\n")

    #GIT_REVISION ||= '9999999'
  end

end