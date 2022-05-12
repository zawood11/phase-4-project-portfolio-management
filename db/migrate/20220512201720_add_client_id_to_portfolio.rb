class AddClientIdToPortfolio < ActiveRecord::Migration[6.1]
  def change
    add_reference :portfolios, :client, foreign_key: {to_table: :users}
  end
end
