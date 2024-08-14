class StaticController < ApplicationController
  def index
    html_content = File.read(Rails.root.join('public', 'index.html'))
    render html: html_content.html_safe
  end

end
