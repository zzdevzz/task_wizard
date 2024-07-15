# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#
require "date"

user1 = User.create(email:"d3@test.com", password: "123456")
category_finance = Category.create(name: "finance", user: user1)
category_housework = Category.create(name: "housework", user: user1)

task1 = Task.create(name: "Finish the application",
                    description: "Do it asap to be a millionaire",
                    category: category_finance,
                    priority: :high)

task2 = Task.create(name: "Mop the house", category: category_housework)
