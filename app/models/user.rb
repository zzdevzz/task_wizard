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
    save!
  end

  validates :username, presence: true
end
