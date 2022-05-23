class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :name, :description
  has_many :prices
end
