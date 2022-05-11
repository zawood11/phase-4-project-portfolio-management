class CreatePrices < ActiveRecord::Migration[6.1]
  def change
    create_table :prices do |t|
      t.belongs_to :stock, null: false, foreign_key: true
      t.string :symbol
      t.date :date
      t.float :open
      t.float :high
      t.float :low
      t.float :close
      t.integer :volume

      t.timestamps
    end
  end
end
