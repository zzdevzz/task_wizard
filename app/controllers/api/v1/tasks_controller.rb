class Api::V1::TasksController < ApplicationController
    def index
        @tasks = Task.all
        render json: @tasks
    end

    def show
        @task = Task.find(params[:id])
        render json: @task
    end

    def post
    end

    def patch
    end

    def destroy
    end

    def put
    end

    def get
    end
end
