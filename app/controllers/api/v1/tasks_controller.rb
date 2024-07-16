class Api::V1::TasksController < ApplicationController


    def index
        @tasks = Task.all
        byebug
        logger.info "Tasks succesfully displayed"
        render json: @tasks
    end

    def show
        @task = Task.find(params[:id])
        logger.info "#{@task.name} displayed succesfully"
        byebug
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
    
    private

    def task_params
        params.require(:task).permit(:name, :completed, :priority, :status, :category, :date_completed_by)
    end
    
end
