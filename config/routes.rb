Rails.application.routes.draw do

  # Here we are setting up our own custom controllers for devise for custom JSON response when something is sent.
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api do
    namespace :v1 do
      resources :users do
        resources :tasks
        resources :categories 
      end
    end
  end
end

# For own learning purpose and constant reference.

# get "tasks", to: "tasks#index"
# get "task/:id", to: "tasks#show"
# get "task/new", to: "tasks#new"
# post "tasks", to: "tasks#create"
# get "task/:id/edit", to: "tasks#edit"
# patch "task/:id", to: "tasks#update"
# delete "task/:id", to: "tasks#destroy"
