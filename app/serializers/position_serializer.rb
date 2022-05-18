class PositionSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  has_one :portfolio
  has_one :stock
end
