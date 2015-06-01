require 'test_helper'

class FamilyStatusesControllerTest < ActionController::TestCase
  setup do
    @family_status = family_statuses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:family_statuses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create family_status" do
    assert_difference('FamilyStatus.count') do
      post :create, family_status: { code: @family_status.code, name: @family_status.name }
    end

    assert_redirected_to family_status_path(assigns(:family_status))
  end

  test "should show family_status" do
    get :show, id: @family_status
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @family_status
    assert_response :success
  end

  test "should update family_status" do
    patch :update, id: @family_status, family_status: { code: @family_status.code, name: @family_status.name }
    assert_redirected_to family_status_path(assigns(:family_status))
  end

  test "should destroy family_status" do
    assert_difference('FamilyStatus.count', -1) do
      delete :destroy, id: @family_status
    end

    assert_redirected_to family_statuses_path
  end
end
