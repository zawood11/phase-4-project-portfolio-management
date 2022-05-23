class Api::UsersController < ApplicationController
    before_action :find_user, only: [:show, :update, :destroy]
    skip_before_action :authorize, only: :create

    #GET "/users"
    def index
        users = User.all
        render json: users
    end

    #POST "/users"
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: @user, status: :created
    end

    #GET "/users/:id"
    def show
        render json: @user
    end

    #PATCH "/users/:id"
    def update
        @user&update!(user_params)
        render json: @user, status: :accepted
    end

    #DELETE "/users/:id"
    def destroy
        @user&.destroy
        render json: { message: "User id: #{@user.id}, name: #{@user.username} has been deleted successfully." }
    end

    private

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:username, :password)
    end
end
