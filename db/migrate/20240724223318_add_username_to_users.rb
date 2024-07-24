class AddUsernameToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :username, :string

     # Populate existing users with a default username
     User.reset_column_information
     User.find_each do |user|
       user.update!(username: user.email.split('@').first)
     end

    change_column_null :users, :username, false
  end
end
