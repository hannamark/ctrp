class SearchJsonController < ApplicationController

  def index
  end

  def static_members
  end

  def download_log

  end

  def search
    puts 'beofore'
    puts params
    puts 'after'


    require 'json'
    file = File.read('newdatadictioanry.json')
    data_hash = JSON.parse(file)
    puts data_hash['title']
    puts data_hash.keys
    puts data_hash['posts']


    #search in json
    #send to gui if you find some thing
    #send null if you dont find any thing

  end

end