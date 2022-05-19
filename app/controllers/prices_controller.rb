class PricesController < ApplicationController
    before_action :find_price, only: [:show]
    #GET "/prices" -- might not need due to only need to pull prices by stock id
    def index
        prices = Price.all
        render json: prices
    end

    #POST "/prices" -- might not need due to pulling prices from API
    def create
        @price = Price.create!(price_params)
        render json: @price, status: :created
    end

    #GET "/prices/:id" -- TBD
    def show
        render json: @price
    end

    private

    def find_price
        @price = Price.find(params[:id])
    end

    def price_params
        params.permit(:stock_id, :symbol, :date, :open, :high, :low, :close, :volume)
    end
end
