namespace :import do
  desc "Import NCI Thesaurus"
  task ncit: :environment do
    p 'Import starts ...'
    NcitDiseaseCode.import_ncit
    p 'Import ends ...'
  end
end
