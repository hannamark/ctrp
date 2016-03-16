class UtilController < ApplicationController
  before_filter :wrapper_authenticate_user unless Rails.env.test?

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

  def get_sampling_methods
    @methods = AppSetting.find_by_code('SAMPLING_METHOD_PA').value.split(',')
    respond_to do |format|
      format.json { render :json => @methods }
    end
  end

  def get_nih_nci_div_pa
    @nih_nci_div_pa = AppSetting.find_by_code('NIH_NCI_DIV_PA').big_value.split(',')
  end

  def get_nih_nci_prog_pa
    @nih_nci_prog_pa = AppSetting.find_by_code('NIH_NCI_PROG_PA').big_value.split(';')
  end

  def get_accepted_file_types_for_registry
    @file_extensions = AppSetting.find_by_code('ACCEPTED_FILE_TYPES_REG').value
    @file_types = AppSetting.find_by_code('ACCEPTED_FILE_TYPES_REG').big_value
  end

  def get_accepted_file_types
    @file_extensions = AppSetting.find_by_code('ACCEPTED_FILE_TYPES').value
    @file_types = AppSetting.find_by_code('ACCEPTED_FILE_TYPES').big_value
  end

  def get_trial_document_types
    @doc_types = AppSetting.find_by_code('TRIAL_DOCUMENT_TYPES').value
    respond_to do |format|
      format.json { render :json => {:types => @doc_types} }
    end
  end

end
