class Price < ApplicationRecord
    belongs_to :stock

    validates :stock_id, uniqueness: { scope: :date }
end
