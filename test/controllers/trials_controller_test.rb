require 'test_helper'

class TrialsControllerTest < ActionController::TestCase
  setup do
    @trial = trials(:one)
  end

  test "should get index" do
    get :index, format: "json"
    assert_response :success
    assert_not_nil assigns(:trials)
  end

  test "should create trial" do
    assert_difference('Trial.count') do
      post :create, trial: { comp_date: @trial.comp_date, comp_date_qual: @trial.comp_date_qual, data_monitor_indicator: @trial.data_monitor_indicator, grant_question: @trial.grant_question, history: @trial.history, ind_ide_question: @trial.ind_ide_question, intervention_indicator: @trial.intervention_indicator, investigator_id: @trial.investigator_id, lead_org_id: @trial.lead_org_id, lead_protocol_id: @trial.lead_protocol_id, nci_id: @trial.nci_id, official_title: @trial.official_title, phase_id: @trial.phase_id, pi_id: @trial.pi_id, pilot: @trial.pilot, primary_comp_date: @trial.primary_comp_date, primary_comp_date_qual: @trial.primary_comp_date_qual, primary_purpose_id: @trial.primary_purpose_id, primary_purpose_other: @trial.primary_purpose_other, program_code: @trial.program_code, research_category_id: @trial.research_category_id, responsible_party_id: @trial.responsible_party_id, sec801_indicator: @trial.sec801_indicator, secondary_purpose_id: @trial.secondary_purpose_id, secondary_purpose_other: @trial.secondary_purpose_other, sponsor_id: @trial.sponsor_id, start_date: @trial.start_date, start_date_qual: @trial.start_date_qual, study_source_id: @trial.study_source_id }, format: "json"
    end

    assert_template :show
    assert_response :created
  end

  test "should show trial" do
    get :show, id: @trial, format: "json"
    assert_response :success
  end

  test "should update trial" do
    patch :update, id: @trial, trial: { comp_date: @trial.comp_date, comp_date_qual: @trial.comp_date_qual, data_monitor_indicator: @trial.data_monitor_indicator, grant_question: @trial.grant_question, history: @trial.history, ind_ide_question: @trial.ind_ide_question, intervention_indicator: @trial.intervention_indicator, investigator_id: @trial.investigator_id, lead_org_id: @trial.lead_org_id, lead_protocol_id: @trial.lead_protocol_id, nci_id: @trial.nci_id, official_title: @trial.official_title, phase_id: @trial.phase_id, pi_id: @trial.pi_id, pilot: @trial.pilot, primary_comp_date: @trial.primary_comp_date, primary_comp_date_qual: @trial.primary_comp_date_qual, primary_purpose_id: @trial.primary_purpose_id, primary_purpose_other: @trial.primary_purpose_other, program_code: @trial.program_code, research_category_id: @trial.research_category_id, responsible_party_id: @trial.responsible_party_id, sec801_indicator: @trial.sec801_indicator, secondary_purpose_id: @trial.secondary_purpose_id, secondary_purpose_other: @trial.secondary_purpose_other, sponsor_id: @trial.sponsor_id, start_date: @trial.start_date, start_date_qual: @trial.start_date_qual, study_source_id: @trial.study_source_id }, format: "json"
    assert_template :show
    assert_response :ok
  end

  test "should destroy trial" do
    assert_difference('Trial.count', -1) do
      delete :destroy, id: @trial, format: "json"
    end

    assert_response :no_content
  end

  test "should search trial by Protocol ID" do
    test_response = post :search, protocol_id: "54321", format: "json"
    search_result = JSON.parse(test_response.body)
    assert_equal "54321", search_result["trials"][0]["lead_protocol_id"]
  end
end
