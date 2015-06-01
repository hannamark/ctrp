require 'test_helper'

class FamilyRelationshipsControllerTest < ActionController::TestCase
  setup do
    @family_relationship = family_relationships(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:family_relationships)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create family_relationship" do
    assert_difference('FamilyRelationship.count') do
      post :create, family_relationship: { code: @family_relationship.code, name: @family_relationship.name }
    end

    assert_redirected_to family_relationship_path(assigns(:family_relationship))
  end

  test "should show family_relationship" do
    get :show, id: @family_relationship
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @family_relationship
    assert_response :success
  end

  test "should update family_relationship" do
    patch :update, id: @family_relationship, family_relationship: { code: @family_relationship.code, name: @family_relationship.name }
    assert_redirected_to family_relationship_path(assigns(:family_relationship))
  end

  test "should destroy family_relationship" do
    assert_difference('FamilyRelationship.count', -1) do
      delete :destroy, id: @family_relationship
    end

    assert_redirected_to family_relationships_path
  end
end
