class AddUsernameToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :username, :string

    User.find_each do |user|
      user.update!(username: user.email.split('@').first)
    end

    add_index :users, :username, unique: true

    # Change the column to not allow null values. We have to do this here and not on add column otherwise we get errors on existing seeds.
    change_column_null :users, :username, false

    # Add a unique index on the username column to enforce uniqueness and improve query performance
    add_index :users, :username, unique: true
  end
end
