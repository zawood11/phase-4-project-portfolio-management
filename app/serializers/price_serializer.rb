class PriceSerializer < ActiveModel::Serializer
  attributes :id, :date, :open, :high, :low, :close, :volume
  has_one :stock
end
