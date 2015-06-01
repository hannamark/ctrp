require 'test_helper'

class FamilyTypesControllerTest < ActionController::TestCase
  setup do
    @family_type = family_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:family_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create family_type" do
    assert_difference('FamilyType.count') do
      post :create, family_type: { code: @family_type.code, name: @family_type.name }
    end

    assert_redirected_to family_type_path(assigns(:family_type))
  end

  test "should show family_type" do
    get :show, id: @family_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @family_type
    assert_response :success
  end

  test "should update family_type" do
    patch :update, id: @family_type, family_type: { code: @family_type.code, name: @family_type.name }
    assert_redirected_to family_type_path(assigns(:family_type))
  end

  test "should destroy family_type" do
    assert_difference('FamilyType.count', -1) do
      delete :destroy, id: @family_type
    end

    assert_redirected_to family_types_path
  end
end
