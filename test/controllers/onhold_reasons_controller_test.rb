require 'test_helper'

class OnholdReasonsControllerTest < ActionController::TestCase
  setup do
    @onhold_reason = onhold_reasons(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:onhold_reasons)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create onhold_reason" do
    assert_difference('OnholdReason.count') do
      post :create, onhold_reason: { code: @onhold_reason.code, name: @onhold_reason.name }
    end

    assert_redirected_to onhold_reason_path(assigns(:onhold_reason))
  end

  test "should show onhold_reason" do
    get :show, id: @onhold_reason
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @onhold_reason
    assert_response :success
  end

  test "should update onhold_reason" do
    patch :update, id: @onhold_reason, onhold_reason: { code: @onhold_reason.code, name: @onhold_reason.name }
    assert_redirected_to onhold_reason_path(assigns(:onhold_reason))
  end

  test "should destroy onhold_reason" do
    assert_difference('OnholdReason.count', -1) do
      delete :destroy, id: @onhold_reason
    end

    assert_redirected_to onhold_reasons_path
  end
end
