class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :user
  belongs_to :client
  has_many :positions
end
