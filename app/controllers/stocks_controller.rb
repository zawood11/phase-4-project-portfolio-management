class StocksController < ApplicationController
    before_action :find_stock, only: [:show, :update, :destroy]

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

    #PATCH "/stocks/:id"
    def update
        symbol = @stock.symbol
        response = RestClient.get "https://www.alphavantage.co/query?function=OVERVIEW&symbol=#{symbol}&apikey=LOOC2YV5NOI7NALE"
        
        stock_hash = JSON.parse(response)
        name = stock_hash["Name"] ? stock_hash["Name"] : "No information available"
        description = stock_hash["Description"] ? stock_hash["Description"] : "No information available"

        @stock.update!(stock_params)
        render json: @stock, status: :accepted
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
