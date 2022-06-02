class StocksController < ApplicationController
    before_action :find_stock, only: [:show, :update, :destroy, :create_prices, :stock_price_api]

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

        @stock.update!(
            symbol: symbol,
            name: name,
            description: description
        )
        render json: @stock, status: :accepted
    end

    #DELETE "/stocks/:id"
    def destroy
        @stock&.destroy
        render json: { message: "Stock id: #{@stock.id}, symbol:#{@stock.symbol} has successfully been deleted." }
    end

    #POST "/stocks/:id/prices"
    def create_prices

        stock_price_api

        @stock_hash["Time Series (Daily)"].each do |date, info|

        @price = Price.create(
                stock_id: @stock_id,
                symbol: @symbol,
                date: date,
                open: info["1. open"],
                high: info["2. high"],
                low: info["3. low"],
                close: info["4. close"],
                volume: info["5. volume"]
            )
        end
        
        render json: @price, status: :created
    end

    private

    def find_stock
        @stock = Stock.find(params[:id])
    end

    def stock_params
        params.permit(:symbol, :name, :description)
    end

    def stock_price_api
        @symbol = @stock.symbol
        @stock_id = @stock.id

        response = RestClient.get "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{@symbol}&apikey=LOOC2YV5NOI7NALE"

        @stock_hash = JSON.parse(response)
    end
end
