json.trials do
  json.array!(@trials) do |trial|
    json.extract! trial, :id, :lead_protocol_id, :nci_id, :official_title, :pilot
    json.phase trial.phase.present? ? trial.phase.name : nil
    json.purpose trial.primary_purpose.present? ? trial.primary_purpose.name : nil
    json.pi trial.pi.present? ? trial.pi.lname + ', ' + trial.pi.fname : nil
    json.lead_org trial.lead_org.present? ? trial.lead_org.name : nil
    json.sponsor trial.sponsor.present? ? trial.sponsor.name : nil
    json.study_source trial.study_source.present? ? trial.study_source.name : nil
    json.current_trial_status trial.trial_status_wrappers.present? ? trial.trial_status_wrappers.last.trial_status.name : nil
    json.selected_trial_status = ""
    if params[:trial_status].present? && params[:trial_status_latest].present? && params[:trial_status_latest] == "NO"
      if trial.trial_status_wrappers.present?
        json.selected_trial_status = trial.trial_status_wrappers.by_value(params[:trial_status]).latest.trial_status.name
      end
    end
    json.current_milestone trial.milestone_wrappers.present? ? trial.milestone_wrappers.last.milestone.name : nil
    json.selected_milestone  ""
    if params[:milestone].present?# && params[:milestone_latest].present? && params[:milestone_latest] == "NO"
      if trial.milestone_wrappers.present?
        selected_milestones = trial.milestone_wrappers.by_value(params[:milestone])
        unless selected_milestones.blank?
          json.selected_milestone selected_milestones.latest.milestone.name
        end
      end
    end
    json.scientific_milestone  ""
    if  trial.milestone_wrappers.present?
      science_milestones = trial.milestone_wrappers.select{|x| x.milestone.name.include?("Scientific")}
      unless science_milestones.empty?
        json.scientific_milestone science_milestones.last.milestone.name
      end
    end

    json.admin_milestone  ""
    if  trial.milestone_wrappers.present?
      admin_milestones = trial.milestone_wrappers.select{|x| x.milestone.name.include?("Admin")}
      unless admin_milestones.empty?
        json.admin_milestone admin_milestones.last.milestone.name
      end
    end

    json.other_ids  ""
    if trial.other_ids.present?
      other_ids = trial.other_ids
      other_ids_string = ""
      delimiter = ""
      other_ids.each do |o|
        other_ids_string = other_ids_string + delimiter + o.protocol_id_origin.code + "_ID:" + o.protocol_id
        delimiter = "; "
      end
      json.other_ids  other_ids_string
    end
    json.current_processing_status trial.processing_status_wrappers.present? ? trial.processing_status_wrappers.last.processing_status.name : nil
    json.research_category trial.research_category.present? ? trial.research_category.name : nil
    json.url trial_url(trial, format: :json)
    json.actions trial.actions
  end
end
json.start params[:start]
json.rows params[:rows]
json.total @trials.respond_to?(:total_count) ? @trials.total_count : @trials.size
json.sort params[:sort]
json.order params[:order]
