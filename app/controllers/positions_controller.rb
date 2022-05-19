class PositionsController < ApplicationController
    before_action :find_position, only: [:show, :update, :destroy]

    #POST "/positions"
    def create

    end

    #GET "/positions/:id"
    def show
        render json: @position
    end

    #PATCH "/positions/:id"
    def update

    end

    #DELETE "/positions/:id"
    def destroy

    end

    private

    def find_position
        @position = Position.find(params[:id])
    end
end
