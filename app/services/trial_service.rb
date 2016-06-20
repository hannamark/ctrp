class TrialService

  def initialize(params)
    @trial = params[:trial]
  end

  def get_json
    return @trial.to_json(include: [:other_ids, :trial_status_wrappers])
  end

  def save_history(trial_json)
    TrialHistory.create(snapshot: trial_json, submission: @trial.current_submission)
  end

end
