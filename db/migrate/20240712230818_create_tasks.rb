class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.string :priority
      t.integer :status
      t.boolean :completed
      t.datetime :date_created
      t.datetime :date_completed_by
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
