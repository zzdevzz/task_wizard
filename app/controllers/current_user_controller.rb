# We use a different controller for current user for seperation of concerns since its about fetching information. Devise usually handles authentication tasks.

class CurrentUserController < ApplicationController
  before_action :authenticate_user!
  def show
    render json: UserSerializer.new(current_user).serializable_hash[:data][:attributes], status: :ok
  end
end

# Autheticate user! in JWT. 
# 1. It Extracts the JWT form Authorization header.
# 2. After it determines code is valid is extracts user ID from payload/data and finds the user from database.
# 3. It automatically sets the current_user variable which we can use in our controllers/serializers/views
