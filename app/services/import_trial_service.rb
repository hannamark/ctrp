class ImportTrialService

  def initialize
    $errors = {}
    $search_result = {}
    #$rest_params = {}
  end
  def errors
    return $search_result
  end

  def validate_clinical_trials_gov(nct_id)

    existing_nct_ids = OtherId.joins(:trial).where('protocol_id = ? AND protocol_id_origin_id = ? AND (trials.is_rejected = ? OR trials.is_rejected IS NULL)', nct_id.upcase, ProtocolIdOrigin.find_by_code('NCT').id, FALSE)
    if existing_nct_ids.length > 0
      $search_result[:error_msg] = 'A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page.'
      return
    end

    url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
    url = url.sub('NCT********', nct_id)
    begin
      xml = Nokogiri::XML(open(url))
    rescue OpenURI::HTTPError
      $search_result[:error_msg] = 'A study with the given identifier is not found in ClinicalTrials.gov.'
    else
      lead_protocol_id = xml.xpath('//org_study_id').text
      org_name = xml.xpath('//sponsors/lead_sponsor/agency').text

      dup_trial = Trial.joins(:lead_org).where('organizations.name ilike ? AND lead_protocol_id = ?', org_name, lead_protocol_id)
      dup_trial = dup_trial.filter_rejected
      if dup_trial.length > 0
        $search_result[:error_msg] = 'Combination of Lead Organization Trial ID and Lead Organization must be unique.'
        return
      end

    end
  end

  def import_clinical_trials_gov_rest(nct_id)
    url = AppSetting.find_by_code('CLINICAL_TRIALS_IMPORT_URL').value
    url = url.sub('NCT********', nct_id)
    xml = Nokogiri::XML(open(url))

    trial_service = TrialService.new({trial: nil})
    @trial = Trial.new(trial_service.import_params(xml, @current_user))
    @trial.current_user = @current_user

    respond_to do |format|
      if @trial.save
        format.html { redirect_to @trial, notice: 'Trial was successfully imported.' }
        format.json { render :show, status: :created, location: @trial }

        #TrialDocument.create(document_type: 'Other Document', document_subtype: 'Import XML', trial_id: @trial.id, file: open(url), file_name: 'import.xml')
      else
        format.html { render :new }
        format.json { render json: @trial.errors, status: :unprocessable_entity }
      end
    end
  end

end