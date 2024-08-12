class StaticController < ApplicationController
  def index
    html_content = File.read(Rails.root.join('public', 'index.html'))
    render html: html_content.html_safe
    puts "BASE_URL is: #{ENV['BASE_URL']}"
    puts "VITE_API_URL is: #{ENV['VITE_API_URL']}"
    puts "NODE ENV is: #{ENV['NODE_ENV']}"
    puts "STATIC CONTROLLER HERE!"
  end

end
