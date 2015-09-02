class UtilController < ActionController::Base
  def get_countries
    @countries = Country.all.sort
    us_idx = @countries.index(["United States", "US"])
    @countries.insert(0, @countries.delete_at(us_idx))
    canada_idx = @countries.index(["Canada", "CA"])
    @countries.insert(1, @countries.delete_at(canada_idx))
  end

  def get_states
    country = Country.find_country_by_name(params[:country])
    @states = country.states.sort_by { |k, v| v["name"] } if country.present?
  end

  def get_funding_mechanisms
    @funding_mechanisms = AppSetting.find_by_code('FM').big_value.split(',')
  end
end
