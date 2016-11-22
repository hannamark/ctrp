require 'test_helper'

class OrganizationsControllerTest < ActionController::TestCase
  setup do
    @organization = organizations(:one)
  end

  test "should get index" do
    get :index, format: "json"
    assert_response :success
    assert_not_nil assigns(:organizations)
  end

  test "should create organization" do
    assert_difference('Organization.count') do
      post :create, organization: { address2: @organization.address2, address: @organization.address, city: @organization.city, country: @organization.country, email: @organization.email, fax: @organization.fax, name: @organization.name, source_id: @organization.source_id, phone: @organization.phone, postal_code: @organization.postal_code, state_province: @organization.state_province }, format: "json"
    end

    #assert_redirected_to organization_path(assigns(:organization))
    assert_template :show
    assert_response :created
  end

  test "should show organization" do
    get :show, id: @organization, format: "json"
    assert_response :success
  end

  test "should update organization" do
    patch :update, id: @organization, organization: { address2: @organization.address2, address: @organization.address, city: @organization.city, country: @organization.country, email: @organization.email, fax: @organization.fax, name: @organization.name, source_id: @organization.source_id, phone: @organization.phone, postal_code: @organization.postal_code, state_province: @organization.state_province }, format: "json"
    #assert_redirected_to organization_path(assigns(:organization))
    assert_template :show
    assert_response :ok
  end

  test "should destroy organization" do
    assert_difference('Organization.count', -1) do
      delete :destroy, id: @organization, format: "json"
    end

    assert_response :no_content
  end
end
