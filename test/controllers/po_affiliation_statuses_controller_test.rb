require 'test_helper'

class PoAffiliationStatusesControllerTest < ActionController::TestCase
  setup do
    @po_affiliation_status = po_affiliation_statuses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:po_affiliation_statuses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create po_affiliation_status" do
    assert_difference('PoAffiliationStatus.count') do
      post :create, po_affiliation_status: {  }
    end

    assert_redirected_to po_affiliation_status_path(assigns(:po_affiliation_status))
  end

  test "should show po_affiliation_status" do
    get :show, id: @po_affiliation_status
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @po_affiliation_status
    assert_response :success
  end

  test "should update po_affiliation_status" do
    patch :update, id: @po_affiliation_status, po_affiliation_status: {  }
    assert_redirected_to po_affiliation_status_path(assigns(:po_affiliation_status))
  end

  test "should destroy po_affiliation_status" do
    assert_difference('PoAffiliationStatus.count', -1) do
      delete :destroy, id: @po_affiliation_status
    end

    assert_redirected_to po_affiliation_statuses_path
  end
end
