class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :name, :description
end
