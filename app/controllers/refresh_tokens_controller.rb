class RefreshTokensController < ApplicationController
  before_action: authenticate_refresh_token!

  def create
    refresh_token = request.headers['Authorization'].split(' ').last
    user = User.find_by(refresh_token: request.headers['Authorization'].split(' ').last)

    if user && user.refresh_token_valid?
      user.regenerate_refresh_token
      access_token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
      render json: {
        status: { code: 200, message: 'Token refreshed successfully.' },
        data: {
          user: UserSerializer.new(user).serializable_hash[:data][:attributes],
          access_token: access_token,
          refresh_token: user.refresh_token
        }
      }, status: :ok
    else
      render json: { status: 401, message: 'Invalid refresh token' }, status: :unauthorized
    end
  end

  private

  def authenticate_refresh_token!
    token = request.headers['Authorization'].split(' ').last
    head :unauthorized unless User.exists?(refresh_token: token)
  end
end
