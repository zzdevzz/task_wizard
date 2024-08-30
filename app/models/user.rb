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
      name: "Fresh Task",
      description: "Clear stones and background are tasks to start. Not Urgent.",
      priority: :background
    )
    self.tasks.create(
      name: "Task In Progress",
      description: "Stone is coloured and background is purple.",
      priority: :urgent
    )
    self.tasks.create(
      name: "Urgent Task!",
      description: "Blood magic! Get rid of this evil ASAP!",
      priority: :background
    )
    self.tasks.create(
      name: "Finished Task",
      description: "When the status is 'To be Removed' one final check to remove!",
      priority:  :normal,
      status: :to_be_reviewed
    )
    self.tasks.create(
      name: "Check about page",
      description: "More useful information there!",
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
