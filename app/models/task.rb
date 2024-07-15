require "time"

class Task < ApplicationRecord
  # Enums allow us to query prefined values easier later on. Also means the user has limited input choices.
  # Enums also allow us to access value of the string or integer, useful for front end incrimenting and displaying values.

  enum priority: { low: 0, medium: 1, high: 2 }
  enum status: { to_be_done: 0, in_progress: 1, to_be_reviewed: 2 }

  belongs_to :category
  validates :name, presence: true
  validates :completed, inclusion: { in: [true, false] }
  validates :category_id, presence: true
  validates :date_created, presence: true

  before_validation :set_default_values

  def set_default_values
    self.priority = self.priority || :low
    self.status = self.status || :to_be_done
    self.date_created = Time.now.strftime("%d/%m/%Y %H:%M")
    # The if statement is if our form does not have a checkbox or the attribute is forgotten. It means the value can be nil.
    self.completed = false if self.completed.nil?
  end
end
