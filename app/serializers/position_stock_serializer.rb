class PositionStockSerializer < ActiveModel::Serializer
  attributes :symbol, :name

  has_many :prices do
    @object.prices.order("date DESC").limit(1)
  end
end
