class ProcessingStatusesController < ApplicationController

  # GET /processing_statuses
  # GET /processing_statuses.json
  def index
    @processing_statuses = ProcessingStatus.all
  end
end