class Category < ApplicationRecord
    belongs_to :user
    has_many :tasks, dependent: :destroy
  
    SELECTION = ["Fitness", "Finance", "Education", "Personal", "Shopping", "Working", "Other"]
  
    validates :name, presence: true
  end
  