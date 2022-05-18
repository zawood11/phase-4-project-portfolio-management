class PortfoliosController < ApplicationController
    #GET /portfolios
    def index
        portfolios = Portfolio.all
        render json: portfolios
    end
end
