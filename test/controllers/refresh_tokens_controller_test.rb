require "test_helper"

class RefreshTokensControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get refresh_tokens_create_url
    assert_response :success
  end
end
