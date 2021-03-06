require 'test_helper'

class OrganizationsControllerTest < ActionController::TestCase
  setup do
    @organization = organizations(:one)
    @organization.po_id = '123'
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:organizations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create organization" do
    assert_difference('Organization.count') do
      post :create, organization: { address2: @organization.address2, address: @organization.address, city: @organization.city, country: @organization.country, email: @organization.email, fax: @organization.fax, name: @organization.name, source_id: @organization.source_id, phone: @organization.phone, po_id: @organization.po_id, postal_code: @organization.postal_code, state_province: @organization.state_province }
    end

    assert_redirected_to organization_path(assigns(:organization))
  end

  test "should show organization" do
    get :show, id: @organization
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @organization
    assert_response :success
  end

  test "should update organization" do
    patch :update, id: @organization, organization: { address2: @organization.address2, address: @organization.address, city: @organization.city, country: @organization.country, email: @organization.email, fax: @organization.fax, name: @organization.name, source_id: @organization.source_id, phone: @organization.phone, po_id: @organization.po_id, postal_code: @organization.postal_code, state_province: @organization.state_province }
    assert_redirected_to organization_path(assigns(:organization))
  end

  test "should destroy organization" do
    assert_difference('Organization.count', -1) do
      delete :destroy, id: @organization
    end

    assert_redirected_to organizations_path
  end
end
