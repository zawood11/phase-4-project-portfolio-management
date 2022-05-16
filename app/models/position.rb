class Position < ApplicationRecord
    belongs_to :portfolio
    belongs_to :stock

    validates :portfolio_id, uniqueness: { scope: :stock_id }
end
