require 'happymapper'

class TrialXmlMapper
  include HappyMapper

tag 'tns:CompleteTrialRegistration'
element :clId, String, :tag => 'tns:clinicalTrialsDotGovTrialID'
#element :postcode, String, :tag => 'postcode'
#element :housenumber, Integer, :tag => 'housenumber'
#element :city, String, :tag => 'city'
#element :country, String, :tag => 'country'

end
#class TrialXmlMapper
#end