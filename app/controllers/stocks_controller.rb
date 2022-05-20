class StocksController < ApplicationController
    before_action :find_stock, only: [:show, :destroy]

    #GET "/stocks"
    def index
        stocks = Stock.all
        render json: stocks
    end

    #POST "/stocks"
    def create
        #byebug
        @stock = Stock.create!(stock_params)
        render json: @stock, status: :created
    end

    #GET "/stocks/:id"
    def show   
        render json: @stock
    end

    #DELETE "/stocks/:id"
    def destroy
        @stock&.destroy
        render json: { message: "Stock id: #{@stock.id}, symbol:#{@stock.symbol} has successfully been deleted." }
    end

    private

    def find_stock
        @stock = Stock.find(params[:id])
    end

    def stock_params
        params.permit(:symbol, :name, :description)
    end
end
