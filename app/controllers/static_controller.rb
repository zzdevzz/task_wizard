class StaticController < ApplicationController
  def index
    render file: Rails.root.join('public', 'index.html')
    puts "BASE_URL is: #{ENV['BASE_URL']}"
    puts "VITE_API_URL is: #{ENV['VITE_API_URL']}"
    puts "NODE ENV is: #{ENV['NODE_ENV']}"
  end

  def serve_about
    render file: Rails.root.join('public', 'index2.html'), layout: false
  end
end
