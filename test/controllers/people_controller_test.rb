require 'test_helper'

class PeopleControllerTest < ActionController::TestCase
  setup do
    @person = people(:one)
  end

  test "should get index" do
    get :index, format: "json"
    assert_response :success
    assert_not_nil assigns(:people)
  end

  test "should create person" do
    assert_difference('Person.count') do
      post :create, person: { name: @person.name, prefix: @person.prefix, suffix: @person.suffix,source_id: @person.source_id, phone: @person.phone, email: @person.email }, format: "json"
    end

    #assert_redirected_to person_path(assigns(:person))
    assert_template :show
    assert_response :created
  end

  test "should show person" do
    get :show, id: @person, :format => "json"
    assert_response :success
  end

  test "should update person" do
    patch :update, id: @person, person: { name: @person.name, prefix: @person.prefix, suffix: @person.suffix,source_id: @person.source_id, phone: @person.phone, email: @person.email }, format: "json"
    #assert_redirected_to person_path(assigns(:person))
    assert_template :show
    assert_response :ok
  end

  test "should destroy person" do
    assert_difference('Person.count', -1) do
      delete :destroy, id: @person, format: "json"
    end

    assert_response :no_content
  end
end
