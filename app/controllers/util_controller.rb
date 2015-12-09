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

  def get_institute_codes
    @institute_codes = AppSetting.find_by_code('IC').big_value.split(',')
  end

  def get_nci
    @nci = AppSetting.find_by_code('NCI').big_value.split(',')
  end

  def get_nih
    @nih = AppSetting.find_by_code('NIH').big_value.split(';')
  end

  def get_accepted_file_types
    @file_extensions = AppSetting.find_by_code('ACCEPTED_FILE_TYPES').value
    @file_types = AppSetting.find_by_code('ACCEPTED_FILE_TYPES').big_value
  end
end
