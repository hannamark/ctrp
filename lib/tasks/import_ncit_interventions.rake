namespace :import_ncit do
  task :interventions => :environment do
    NcitIntervention.import_ncit_interventions
  end
end