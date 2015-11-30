require 'test_helper'

class RestControllersControllerTest < ActionController::TestCase
  setup do
    @rest_controller = rest_controllers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:rest_controllers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create rest_controller" do
    assert_difference('RestController.count') do
      post :create, rest_controller: {  }
    end

    assert_redirected_to rest_controller_path(assigns(:rest_controller))
  end

  test "should show rest_controller" do
    get :show, id: @rest_controller
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @rest_controller
    assert_response :success
  end

  test "should update rest_controller" do
    patch :update, id: @rest_controller, rest_controller: {  }
    assert_redirected_to rest_controller_path(assigns(:rest_controller))
  end

  test "should destroy rest_controller" do
    assert_difference('RestController.count', -1) do
      delete :destroy, id: @rest_controller
    end

    assert_redirected_to rest_controllers_path
  end
end
