require "time"

class Task < ApplicationRecord
  # Enums allow us to query prefined values easier later on. Also means the user has limited input choices.
  # Enums also allow us to access value of the string or integer, useful for front end incrimenting and displaying values.

  enum priority: { background: 0, normal: 1, urgent: 2 }
  enum status: { to_be_done: 0, in_progress: 1, to_be_reviewed: 2 }

  belongs_to :user
  belongs_to :category, optional: true
  validates :name, presence: true
  validates :completed, inclusion: { in: [true, false] }
  validates :date_created, presence: true
  validate :date_completed_by_cannot_be_before_date_created

  before_validation :set_default_values

  def set_default_values
    self.priority = self.priority || :normal
    self.status = self.status || :to_be_done
    self.date_created ||= Time.now.strftime("%Y-%m-%dT%H:%M:%S.%LZ") # Use ISO 8601 format
    self.date_completed_by ||= Time.now.strftime("%Y-%m-%dT%H:%M:%S.%LZ")
    # The if statement is if our form does not have a checkbox or the attribute is forgotten. It means the value can be nil.
    self.completed = false if self.completed.nil?
  end
  
  private

  def date_completed_by_cannot_be_before_date_created
    if date_completed_by.present? && date_completed_by < date_created
      errors.add(:date_completed_by, "cannot be before the date the task was created")
    end
  end

end

