class Api::V1::TasksController < ApplicationController
    def index
        @tasks = Task.all
        logger.info "Tasks succesfully displayed"
        render json: @tasks
    end

    def show
        @task = Task.find(params[:id])
        logger.info "#{@task.name} displayed succesfully"
        render json: @task
    end

    def create
        @user = User.find(params[:user_id].to_i)
        @task = Task.new(task_params)
        @task.user = @user
        byebug

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
        byebug
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
        params.require(:task).permit(:name, :description, :completed, :priority, :status, :category, :date_completed_by)
    end
    
end


