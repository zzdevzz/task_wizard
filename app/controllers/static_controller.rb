class StaticController < ApplicationController
  def index


    # render plain: "Static controller is working"
    # index_file_path = Rails.root.join('public', 'index.html')

    # # Log the contents of index.html
    # Rails.logger.info "Contents of index.html:"
    # Rails.logger.info File.read(index_file_path)

    # Render the index.html file
    # render json: index_file_path

    # send_file Rails.root.join('public', 'index.html')
    # render plain: "hello there"views
    html_content = File.read(Rails.root.join('public', 'index.html'))
    render html: html_content.html_safe
    # render file: Rails.root.join('app', 'controllers', 'basic.html')
    puts "BASE_URL is: #{ENV['BASE_URL']}"
    puts "VITE_API_URL is: #{ENV['VITE_API_URL']}"
    puts "NODE ENV is: #{ENV['NODE_ENV']}"
    puts "STATIC CONTROLLER HERE!"
  end

end
