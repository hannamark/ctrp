require 'test_helper'

class FamiliesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index, format: "json"
    assert_response :success
    assert_not_nil assigns(:families)
  end

  # Family search tests
  test "should search family by name" do
    ['Albert Einstein Cancer Center', 'Albert*'].each do |x|
      #puts "name: #{t.inspect}"
      test_response = post :search, name: x, format: 'json'
      search_result = JSON.parse(test_response.body)
      #Rails::logger.debug "Search Result: #{search_result.inspect}"
      puts 'Albert Einstein Cancer Center', search_result['families'][0]['name']
      assert_equal 'Albert Einstein Cancer Center', search_result['families'][0]['name']
    end
  end

  test "should search family by type" do
    [ family_types(:one), family_types(:two), family_types(:three), family_types(:four)].each do |x|
      #puts "family_type: #{x.inspect}"
      test_response = get :search, family_type: x.name, format: 'json'
      search_result = JSON.parse(test_response.body)
      #puts "Search Result: #{search_result.inspect}"
      #puts "family_type=#{x.inspect} + search_result_family_type = #{search_result['families'][0]["family_type_id"]}"
      assert_equal x.id, search_result['families'][0]["family_type_id"]
    end
  end

  test "should search family by status" do
    [ family_statuses(:one), family_statuses(:two)].each do |x|
      #puts "family_status: #{x.inspect}"
      test_response = get :search, family_status: x.name, format: 'json'
      search_result = JSON.parse(test_response.body)
      #puts "Search Result: #{search_result.inspect}"
      #puts "family_status=#{x.inspect} + search_result_family_status = #{search_result['families'][0]["family_status_id"]}"
      assert_equal x.id, search_result['families'][0]["family_status_id"]
    end
  end

end
