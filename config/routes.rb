Rails.application.routes.draw do
  resources :tests
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api do
    namespace :v1 do
      resources :users
        resources :category
          get "tasks", to: "tasks#index"
          get "task/:id", to: "tasks#show"
          get "task/new" to: "tasks#new"
          post "tasks" to: "tasks#create"
          get "task/:id/edit" to: "tasks#edit"
          patch "task/:id" to: "tasks#update"
          delete "task/:id" to: "tasks#destroy"
      end
    end
  end
end
