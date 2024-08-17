class Api::V1::TasksController < ApplicationController
    before_action :authenticate_user!

    def index
        @tasks = current_user.tasks
        logger.info "Tasks succesfully displayed"
        render json: @tasks
    end

    def show
        @task = Task.find(params[:id])
        logger.info "#{@task.name} displayed succesfully"
        render json: @task
    end

    def create
        @user = current_user
        @task = Task.new(task_params)
        @task.user = @user

        if @task.save
            render json: @task, status: :created
        else
            render json: @task.errors, status: :unprocessable_entity
        end


    end

    def update
        @task = Task.find(params[:id])
        if @task.update(task_params)
            render json: @task
        else
            render json: @task.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @task = Task.find(params[:id])
        @task.destroy
    end

    def put
    end

    def get
    end
    
    private

    def task_params
        params.require(:task).permit(:name, :description, :completed, :priority, :status, :category, :date_completed_by, :date_created)
    end
    
end


