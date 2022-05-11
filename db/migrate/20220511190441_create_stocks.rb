class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
