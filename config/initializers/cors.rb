# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

# EVERYTHING IN THIS FILE NEEDS TO BE FRONTEND PORT OF VITE OR PRODUCTION URL
# DYMAMIC STATIC IP IS GATHERED AND SET FROM dynamic_ip.rb file.
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://127.0.0.1:5173",
            "http://localhost:5173",
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://172.17.186.63:3000",
            "https://task-wizard-566e44.herokuapp.com",
            "https://taskwizard.devcreates.com",
            "172.17.254.36:5173"
            "http://#{local_ip}:5173" if $local_ip.present?



    resource "*",
      headers: :any,
      expose: ["Authorization"], #Needed for devise
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
