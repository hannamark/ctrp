class TrialService

  def initialize(params)
    @trial = params[:trial]
  end

  def get_json
    return @trial.to_json(include: [:other_ids, :ind_ides, :grants, :trial_status_wrappers, :trial_funding_sources,
                                    :trial_co_lead_orgs, :trial_co_pis, :oversight_authorities, :mail_logs, :onholds,
                                    :associated_trials, :alternate_titles, :central_contacts, :outcome_measures,
                                    :other_criteria, :markers, :interventions, :arms_groups, :sub_groups,
                                    :participating_sites, :citations, :links, :diseases, :collaborators,
                                    :trial_ownerships, :anatomic_site_wrappers, :trial_checkout_logs])
  end

  def save_history(trial_json)
    TrialHistory.create(snapshot: trial_json, submission: @trial.current_submission)
  end

end
