class PortfoliosController < ApplicationController
    before_action :find_portfolio, only: [:show, :update, :destroy]

    #GET "/portfolios"
    def index
        portfolios = Portfolio.all
        render json: portfolios
    end

    #POST "/portfolios"
    def create
        #byebug
        @portfolio = Portfolio.create(portfolio_params)
        render json: @portfolio, status: :created
    end

    #GET "/portfolios/:id"
    def show
        render json: @portfolio
    end

    #PATCH "/portfolios"
    def update
        @portfolio &.update!(portfolio_params)
        render json: @portfolio, status: :accepted
    end

    #DELETE "/portfolios/:id"
    def destroy
        @portfolio&.destroy
        render json: { message: "Portfolio id: #{@portfolio.id},  name: #{@portfolio.name} has been deleted successfully."}
    end

    private

    def find_portfolio
        @portfolio = Portfolio.find(params[:id])
    end

    def portfolio_params
        params.permit(:user_id, :name, :client_id)
    end
end
