module CTRP

  X = `git rev-parse --short HEAD`

  #had to strip \n from git output
  GIT_REVISION = X.delete("\n")

end