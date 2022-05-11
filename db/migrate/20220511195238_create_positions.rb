class CreatePositions < ActiveRecord::Migration[6.1]
  def change
    create_table :positions do |t|
      t.belongs_to :portfolio, null: false, foreign_key: true
      t.belongs_to :stock, null: false, foreign_key: true
      t.integer :quantity
      
      t.timestamps
    end
  end
end