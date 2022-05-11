class Portfolio < ApplicationRecord
    belongs_to :user
    has_many :positions
    has_many :stocks, through: :positions
end
