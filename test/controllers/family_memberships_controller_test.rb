require 'test_helper'

class FamilyMembershipsControllerTest < ActionController::TestCase
  setup do
    @family_membership = family_memberships(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:family_memberships)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create family_membership" do
    assert_difference('FamilyMembership.count') do
      post :create, family_membership: { effective_date: @family_membership.effective_date, expiration_date: @family_membership.expiration_date }
    end

    assert_redirected_to family_membership_path(assigns(:family_membership))
  end

  test "should show family_membership" do
    get :show, id: @family_membership
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @family_membership
    assert_response :success
  end

  test "should update family_membership" do
    patch :update, id: @family_membership, family_membership: { effective_date: @family_membership.effective_date, expiration_date: @family_membership.expiration_date }
    assert_redirected_to family_membership_path(assigns(:family_membership))
  end

  test "should destroy family_membership" do
    assert_difference('FamilyMembership.count', -1) do
      delete :destroy, id: @family_membership
    end

    assert_redirected_to family_memberships_path
  end
end
