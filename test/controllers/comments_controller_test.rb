require 'test_helper'

class CommentsControllerTest < ActionController::TestCase
  setup do
    @comment = comments(:one)
  end

  test "should get index" do
    get :index, format: "json"
    assert_response :success
    assert_not_nil assigns(:comments)
  end

  test "should create comment" do
    assert_difference('Comment.count') do
      post :create, comment: { instance_uuid: @comment.instance_uuid, content: @comment.content, username: @comment.username, fullname: @comment.fullname, org: @comment.org }, format: "json"
    end

    #assert_redirected_to comment_path(assigns(:comment))
    assert_template :show
    assert_response :created
  end

  test "should show comment" do
    get :show, id: @comment, format: "json"
    assert_response :success
  end

  test "should update comment" do
    patch :update, id: @comment, comment: { instance_uuid: @comment.instance_uuid, content: @comment.content, username: @comment.username, fullname: @comment.fullname, org: @comment.org }, format: "json"
    #assert_redirected_to comment_path(assigns(:comment))
    assert_template :show
    assert_response :ok
  end

  test "should destroy comment" do
    assert_difference('Comment.count', -1) do
      delete :destroy, id: @comment, format: "json"
    end

    assert_response :no_content
  end
end
