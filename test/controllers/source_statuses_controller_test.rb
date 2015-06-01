require 'test_helper'

class SourceStatusesControllerTest < ActionController::TestCase
  setup do
    @source_status = source_statuses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:source_statuses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create source_status" do
    assert_difference('SourceStatus.count') do
      post :create, source_status: { code: @source_status.code, name: @source_status.name }
    end

    assert_redirected_to source_status_path(assigns(:source_status))
  end

  test "should show source_status" do
    get :show, id: @source_status
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @source_status
    assert_response :success
  end

  test "should update source_status" do
    patch :update, id: @source_status, source_status: { code: @source_status.code, name: @source_status.name }
    assert_redirected_to source_status_path(assigns(:source_status))
  end

  test "should destroy source_status" do
    assert_difference('SourceStatus.count', -1) do
      delete :destroy, id: @source_status
    end

    assert_redirected_to source_statuses_path
  end
end
