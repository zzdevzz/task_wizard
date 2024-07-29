class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :tasks, dependent: :destroy
  has_many :categories, dependent: :destroy

  has_secure_token :refresh_token

  def regenerate_refresh_token
    self.refresh_token = SecureRandom.hex(32)
    self.refresh_token_expires_at = 1.weeks.from_now # Expiration time for refresh token.
    save!
  end

  # Here we see if our token is valid based in our expiration limit defined above.
  def refresh_token_valid?
    refresh_token_expires_at > Time.current
  end

  validates :username, presence: true
end
