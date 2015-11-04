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

  # Trial search tests
  test "should search trial by Protocol ID" do
    ['54321', '5*', '*1', '*3*'].each do |x|
      test_response = post :search, protocol_id: x, format: 'json'
      search_result = JSON.parse(test_response.body)
      assert_equal '54321', search_result['trials'][0]['lead_protocol_id']
    end
  end

  test "should search trial by Official Title" do
    ['Test Trial 3', 'Test*', '*3', '*Trial*'].each do |x|
      test_response = post :search, official_title: x, format: 'json'
      search_result = JSON.parse(test_response.body)
      assert_equal 'Test Trial 3', search_result['trials'][0]['official_title']
    end
  end

  test "should search trial by Phase" do
    phase = phases(:one)
    test_response = post :search, phase: phase.code, format: 'json'
    search_result = JSON.parse(test_response.body)
    assert_equal phase.name, search_result['trials'][0]['phase']
  end

  test "should search trial by Purpose" do
    purpose = primary_purposes(:one)
    test_response = post :search, purpose: purpose.code, format: 'json'
    search_result = JSON.parse(test_response.body)
    assert_equal purpose.name, search_result['trials'][0]['purpose']
  end

  test "should search trial by Pilot" do
    test_response = post :search, pilot: 'No', format: 'json'
    search_result = JSON.parse(test_response.body)
    assert_equal 'No', search_result['trials'][0]['pilot']
  end

  test "should search trial by Principal Investigator" do
    ['Doe', ' doe ', 'D*', '*e', '*o*', 'Doe,John', 'Doe, john ', 'Doe, J*', 'Doe, *n', 'Doe, *h*'].each do |x|
      test_response = post :search, pi: x, format: 'json'
      search_result = JSON.parse(test_response.body)
      assert_equal 'Doe, John', search_result['trials'][0]['pi']
    end
  end

  test "should search trial by Lead Organization" do
    ['Test Org 3', 'Test*', '*3', '*Org*'].each do |x|
      test_response = post :search, org_type: 'Lead Organization', org: x, format: 'json'
      search_result = JSON.parse(test_response.body)
      assert_equal 'Test Org 3', search_result['trials'][0]['lead_org']
    end
  end

  test "should search trial by Sponsor" do
    ['Test Org 4', 'Test*', '*4', '*Org*'].each do |x|
      test_response = post :search, org_type: 'Sponsor', org: x, format: 'json'
      search_result = JSON.parse(test_response.body)
      assert_equal 'Test Org 4', search_result['trials'][0]['sponsor']
    end
  end

  test "should search trial by any Organization" do
    ['Test Org 3', 'Test Org 4', 'Test*', '*3', '*Org*'].each do |x|
      test_response = post :search, org: x, format: 'json'
      search_result = JSON.parse(test_response.body)
      assert_equal 'Test Trial 3', search_result['trials'][0]['official_title']
    end
  end

  test "should search trial by Study Source" do
    study_source = study_sources(:one)
    test_response = post :search, study_source: study_source.code, format: 'json'
    search_result = JSON.parse(test_response.body)
    assert_equal study_source.name, search_result['trials'][0]['study_source']
  end

  test "should search trial by multiple criteria" do
    phase = phases(:one)
    purpose = primary_purposes(:one)
    study_source = study_sources(:one)
    test_response = post :search, protocol_id: '54321', official_title: 'Test Trial 3', phase: phase.code,
                         purpose: purpose.code, pilot: 'No', pi: 'Doe,John', org_type: 'Lead Organization',
                         org: 'Test Org 3', study_source: study_source.code, format: 'json'
    search_result = JSON.parse(test_response.body)
    assert_equal '54321', search_result['trials'][0]['lead_protocol_id']
  end
end
