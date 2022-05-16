class Portfolio < ApplicationRecord
    belongs_to :user
    belongs_to :client, class_name: 'User', foreign_key: :client_id
    has_many :positions, dependent: :destroy
    has_many :stocks, through: :positions

    validates :name, uniqueness: { scope: :client_id }
end
