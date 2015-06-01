require 'test_helper'

class SourceContextsControllerTest < ActionController::TestCase
  setup do
    @source_context = source_contexts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:source_contexts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create source_context" do
    assert_difference('SourceContext.count') do
      post :create, source_context: { code: @source_context.code, name: @source_context.name }
    end

    assert_redirected_to source_context_path(assigns(:source_context))
  end

  test "should show source_context" do
    get :show, id: @source_context
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @source_context
    assert_response :success
  end

  test "should update source_context" do
    patch :update, id: @source_context, source_context: { code: @source_context.code, name: @source_context.name }
    assert_redirected_to source_context_path(assigns(:source_context))
  end

  test "should destroy source_context" do
    assert_difference('SourceContext.count', -1) do
      delete :destroy, id: @source_context
    end

    assert_redirected_to source_contexts_path
  end
end
