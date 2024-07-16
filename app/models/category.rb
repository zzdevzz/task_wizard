class Category < ApplicationRecord
    belongs_to :user
    has_many :tasks
  
    SELECTION = ["Fitness", "Finance", "Education", "Personal", "Shopping", "Working", "Other"]
  
    validates :name, presence: true
  end
  