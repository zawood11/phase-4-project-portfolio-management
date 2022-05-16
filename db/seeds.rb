puts "🌱 Seeding data..."

Position.destroy_all
Price.destroy_all
Stock.destroy_all
Portfolio.destroy_all
User.destroy_all

# Seed your database here

#Starter Users
zach = User.create(username: "Zach", password: "Zach123")
dane = User.create(username: "Dane", password: "Dane123")
brandon = User.create(username: "Brandon", password: "Brandon123")
steven = User.create(username: "Steven", password: "Steven123")
bailey = User.create(username: "Bailey", password: "Bailey123")
kelsi = User.create(username: "Kelsi", password: "Kelsi123")

#Starter Portfolios
portfolio1 = Portfolio.create(user_id: zach[:id], client_id: brandon[:id], name: "Well Rounded Portfolio")
portfolio2 = Portfolio.create(user_id: zach[:id], client_id: steven[:id], name: "Super Selective Portfolio")
portfolio3 = Portfolio.create(user_id: dane[:id], client_id: bailey[:id], name: "Well Rounded Portfolio")
portfolio4 = Portfolio.create(user_id: dane[:id], client_id: kelsi[:id], name: "Super Selective Portfolio")

#Starter Stocks
stock_aapl = Stock.create(symbol: "AAPL", name: "Apple Inc", description: "Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services. Apple is the world's largest technology company by revenue (totalling $274.5 billion in 2020) and, since January 2021, the world's most valuable company. As of 2021, Apple is the world's fourth-largest PC vendor by unit sales, and fourth-largest smartphone manufacturer. It is one of the Big Five American information technology companies, along with Amazon, Google, Microsoft, and Facebook.")
stock_amzn = Stock.create(symbol: "AMZN", name: "Amazon.com Inc", description: "Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is one of the Big Five companies in the U.S. information technology industry, along with Google, Apple, Microsoft, and Facebook. The company has been referred to as one of the most influential economic and cultural forces in the world, as well as the world's most valuable brand.")
stock_tsla = Stock.create(symbol: "TSLA", name: "Tesla Inc", description: "Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California. Tesla's current products include electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, as well as other related products and services. In 2020, Tesla had the highest sales in the plug-in and battery electric passenger car segments, capturing 16% of the plug-in market (which includes plug-in hybrids) and 23% of the battery-electric (purely electric) market. Through its subsidiary Tesla Energy, the company develops and is a major installer of solar photovoltaic energy generation systems in the United States. Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 3 GWh of battery storage supplied in 2020.")

#Starter Positions
Position.create(portfolio_id: portfolio1[:id], stock_id: stock_aapl[:id], quantity: 100)
Position.create(portfolio_id: portfolio1[:id], stock_id: stock_amzn[:id], quantity: 100)
Position.create(portfolio_id: portfolio1[:id], stock_id: stock_tsla[:id], quantity: 100)
Position.create(portfolio_id: portfolio2[:id], stock_id: stock_aapl[:id], quantity: 100)
Position.create(portfolio_id: portfolio2[:id], stock_id: stock_tsla[:id], quantity: 100)
Position.create(portfolio_id: portfolio3[:id], stock_id: stock_aapl[:id], quantity: 100)
Position.create(portfolio_id: portfolio3[:id], stock_id: stock_amzn[:id], quantity: 100)
Position.create(portfolio_id: portfolio3[:id], stock_id: stock_tsla[:id], quantity: 100)
Position.create(portfolio_id: portfolio4[:id], stock_id: stock_aapl[:id], quantity: 100)
Position.create(portfolio_id: portfolio4[:id], stock_id: stock_tsla[:id], quantity: 100)

#Sample Tickers to start with...(facilitating price data API call through AlphaVantage)
stocks = [stock_aapl, stock_amzn, stock_tsla]
#symbols = [stock_aapl[:symbol], stock_amzn[:symbol], stock_tsla[:symbol]]

#Call to Alpha Advantage for each ticker (Last 100 days of price history)
stocks.each do |stock|
    symbol = stock[:symbol]
    stock_id = stock[:id]

    response = RestClient.get "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{symbol}&apikey=LOOC2YV5NOI7NALE"

    stock_hash = JSON.parse(response)

    stock_hash["Time Series (Daily)"].each do |date, info|

        Price.create(
            stock_id: stock_id,
            symbol: symbol,
            date: date,
            open: info["1. open"],
            high: info["2. high"],
            low: info["3. low"],
            close: info["4. close"],
            volume: info["5. volume"]
        )
    end
end

private 

def get_prices_from_api

end

puts "✅ Done seeding!"