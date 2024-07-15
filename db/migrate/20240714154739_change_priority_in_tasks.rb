class ChangePriorityInTasks < ActiveRecord::Migration[7.1]
  def change
    change_column :tasks, :priority, :integer, using: 'priority::integer'
  end
end
