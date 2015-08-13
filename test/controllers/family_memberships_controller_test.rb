require 'test_helper'

class FamilyMembershipsControllerTest < ActionController::TestCase
  setup do
    @family_membership = family_memberships(:one)
  end

  test "should get index" do
    get :index, format: "json"
    assert_response :success
    assert_not_nil assigns(:family_memberships)
  end

  test "should create family_membership" do
    assert_difference('FamilyMembership.count') do
      post :create, family_membership: { effective_date: @family_membership.effective_date, expiration_date: @family_membership.expiration_date }, format: "json"
    end

    #assert_redirected_to family_membership_path(assigns(:family_membership))
    assert_template :show
    assert_response :created
  end

  test "should show family_membership" do
    get :show, id: @family_membership, format: "json"
    assert_response :success
  end

  test "should update family_membership" do
    patch :update, id: @family_membership, family_membership: { effective_date: @family_membership.effective_date, expiration_date: @family_membership.expiration_date }, format: "json"
    #assert_redirected_to family_membership_path(assigns(:family_membership))
    assert_template :show
    assert_response :ok
  end

  test "should destroy family_membership" do
    assert_difference('FamilyMembership.count', -1) do
      delete :destroy, id: @family_membership, format: "json"
    end

    assert_response :no_content
  end
end
