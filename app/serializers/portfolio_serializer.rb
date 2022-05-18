class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :client_id
  has_one :user
end
