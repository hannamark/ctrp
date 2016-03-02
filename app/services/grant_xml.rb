class GrantXml
  include XML::Mapping
  @@errors=Hash.new

  text_node :funding_mechanism, "fundingMechanism"
  text_node :institute_code, "nihInstitutionCode"
  text_node :serial_number, "serialNumber"
  text_node :nci, "nciDivisionProgramCode"

  def initialize
    #validate_grant
  end

  def   validate_grant
=begin    isNciPCValid  =  AppSetting.find_by_code("NCI").big_value.split(',').include?(nciDivisionProgramCode)
    isSerialNumValid = Tempgrants.find_by_funding_mechanism_and_institute_code_and_serial_number(fundingMechanism,nihInstitutionCode,serialNumber) ? true : false
    p isNciPCValid
    p isSerialNumValid
    isSerialNumValid && isNciPCValid ? true:false
=end
    @@errors.store("yes","yes it is true")
  end

  def errors
    return @@errors
  end


end