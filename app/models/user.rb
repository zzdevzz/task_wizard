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
    self.tasks.create(
      name: "Basic tasks look like this.",
      description: "No background, empty stone.",
      priority: :background
    )
    self.tasks.create(
      name: "Urgent tasks are highlighted in red.",
      description: "This is based on the priority option.",
      priority: :urgent
    )
    self.tasks.create(
      name: "<<< Tap the gem.",
      description: "Done to quickly update progress.",
      priority: :background
    )
    self.tasks.create(
      name: "Finished task",
      description: "When progress is 'to be reviewed' after you're done you can remove the task",
      priority:  :normal,
      status: :to_be_reviewed
    )

    self.tasks.create(
      name: "Share this site with your friends",
      description: "Wow this site is super useful for me, I bet it will be handy for my friends and family.",
      priority: :normal
    )
    self.tasks.create(
      name: "Check out Dev's YouTube channel.",
      description: "There was some cool things I wanted to check out. https://www.youtube.com/@bydevcreates",
      priority: :normal
    )
  end
end
