class UtilController < ActionController::Base
  def get_countries
  end

  def get_states
    country = Country.find_country_by_name(params[:country])
    @states = country.states if country.present?
  end
end
