class Portfolio < ApplicationRecord
    belongs_to :user
    belongs_to :client, class_name: 'User', foreign_key: :client_id
    has_many :positions
    has_many :stocks, through: :positions
end
