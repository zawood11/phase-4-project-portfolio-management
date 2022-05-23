class Stock < ApplicationRecord
    has_many :prices, dependent: :destroy
    has_many :positions, dependent: :destroy
    has_many :portfolios, through: :positions

    validates :symbol, uniqueness: true
end
