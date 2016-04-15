namespace :import_ncit do
  task :interventions => :environment do
    NcitIntervention.import_ncit_interventions
  end
end

# to run this file, in rails console, execute:
#       rake import_ncit:interventions