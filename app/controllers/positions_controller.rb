class PositionsController < ApplicationController
    before_action :find_position, only: [:show, :update, :destroy]

    #POST "/positions"
    def create
        @position = Position.create!(position_params)
        render json: @position, status: :created
    end

    #GET "/positions/:id"
    def show
        render json: @position
    end

    #PATCH "/positions/:id"
    def update
        @position&.update!(position_params)
        render json: @position, status: :accepted
    end

    #DELETE "/positions/:id"
    def destroy
        @position&.destroy
        render json: { message: "Position id: #{@position.id} has been deleted successfully." }
    end

    private

    def find_position
        @position = Position.find(params[:id])
    end

    def position_params
        params.permit(:portfolio_id, :stock_id, :quantity)
    end
end
