class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :tasks, dependent: :destroy
  has_many :categories, dependent: :destroy

  validates :username, presence: true

  after_create :initialize_defaults


  private


  def initialize_defaults
    current_time = Time.current
    Rails.logger.info "Creating default tasks for user #{self.id}"
    task1 = self.tasks.create(
      name: "Follow Dev on LinkedIn",
      description: "Do it asap to see all the cool things he'll continue to make! https://www.linkedin.com/in/devhalai/",
      priority: :high
    )
    task2 = self.tasks.create(
      name: "Share this site with your friends",
      description: "Wow this site is super useful for me, I bet it will be handy for my friends and family.",
      priority: :high
    )
    task3 = self.tasks.create(
      name: "Do work and stop procrastinating.",
      priority: :low
    )
    task4 = self.tasks.create(
      name: "Check out Dev's YouTube channel.",
      description: "There was some cool things I wanted to check out. https://www.youtube.com/@bydevcreates",
      priority: :high
    )
  end
end
