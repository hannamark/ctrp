# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ctep = SourceContext.create(code: 'CTEP', name: 'CTEP')
nlm = SourceContext.create(code: 'NLM', name: 'NLM')
source_act = SourceStatus.create(code: 'ACT', name: 'Active')
source_pend = SourceStatus.create(code: 'PEND', name: 'Pending')
org = FamilyRelationship.create(code: 'ORG', name: 'Organizational')
aff = FamilyRelationship.create(code: 'AFF', name: 'Affiliation')
usa = "United States"

if Organization.count  == 0
org1 = Organization.create(id: 139020, source_id: 'MN021', name: 'University of Minnesota/Masonic Children\'s Hospital', source_status: source_act, source_context: ctep, address: '2450 Riverside Ave', city: 'Minneapolis', state_province: 'MN', country:usa)
if !org1.new_record?
  org1.name_aliases.create(name: 'University of Minnesota Children\'s Hospital Fairview')
  org1.name_aliases.create(name: 'University of Minnesota Medical Center-Fairview-Riverside')
end
org2 = Organization.create(id: 139049, source_id: 'MN022', name: 'University of Minnesota Medical Center-Fairview', source_status: source_act, source_context: ctep, address: '516 Delaware St SE', city: 'Minneapolis', state_province:'MN', country:usa)
if !org2.new_record?
  org2.name_aliases.create(name: 'Masonic Cancer Center, University of Minnesota')
end
org3 = Organization.create(id: 153109, source_id: 'NC164', name: 'Coastal Carolina Radiation Oncology', source_status: source_act, source_context: ctep, address: '1988 S 16th St', city: 'Wilmington', state_province:'NC', country:usa)
org4 = Organization.create(id: 12733422, name: 'Comprehensive Cancer Center of Wake Forest University', source_status: source_act, address: '1 Medical Center Blvd', city: '', state_province:'NC', country: usa) #labeled unknown in directory
org5 = Organization.create(id: 117163, source_id: 'LA032', name: 'Ochsner Baptist Medical Center', source_status: source_act, source_context: ctep, address: '2700 Napoleon Ave', city: 'New Orleans', state_province:'LA', country:usa)
if !org5.new_record?
  org5.name_aliases.create(name: 'Ochsner Baptist Medical Center')
end
org6 = Organization.create(id: 173475, source_id: 'NY139', name: 'Syracuse Veterans Administration Medical Center', source_status: source_act, source_context: ctep, address: ' 800 Irving Ave', city: 'Syracuse', state_province:'NY', country:usa)
org7 = Organization.create(id: 150970, source_id: 'NC088', name: 'Veterans Administration Medical Center.', source_status: source_act, source_context: ctep, address: '50 Irving St NW', city: '', state_province:'Washington D.C.', country:usa)
org8 = Organization.create(id: 213850, source_id: 'WAKE', name: 'Wake Forest NCORP Research Base', source_status: source_act, source_context: ctep, address: 'Medical Center Blvd', city: 'Winston-Salem', state_province:'NC', country:usa)
if !org8.new_record?
  org8.name_aliases.create(name: 'Wake Forest Cancer Center Research Base')
end
org9 = Organization.create(id: 36296220, source_id: 'NC275', name: 'Wake Forest University at Clemmons', source_status: source_act, source_context: ctep, address: '3540 Clemmons Rd', city: 'Clemmons', state_province:'NC', country:usa)
org10 = Organization.create(id: 36296062, source_id: 'NC273', name: 'Wake Forest University at Elkin', source_status: source_act, source_context: ctep, address: '200 Johnson Ridge Medical Park', city: 'Elkin', state_province:'NC', country:usa)
org11 = Organization.create(id: 36296115, source_id: 'NC274', name: 'Wake Forest University at Lexington', source_status: source_act, source_context: ctep, address: '250 Hospital Drive', city: 'Lexington', state_province:'NC', country:usa)
org12 = Organization.create(id: 36296009, source_id: 'NC272', name: 'Wake Forest University at Mount Airy', source_status: source_act, source_context: ctep, address: '910 Worth St.', city: 'Mt. Airy', state_province:'NC', country:usa)
org13 = Organization.create(id: 149074, source_id: 'NC002', name: 'Wake Forest University Health Sciences', source_status: source_act, source_context: ctep, address: '1 Medical Center Blvd', city: 'Winston-Salem', state_province:'NC', country:usa) #no source id
org14 = Organization.create(id: 149221, source_id: 'NC008', name: 'Wake Medical Center-Breast Screening and Diagnostic', source_status: source_act, source_context: ctep, address: '3000 New Bern Avenue ', city: 'Raleigh', state_province:'NC', country:usa)
org15 = Organization.create(id: 23875109, name: 'ACORN Research, LLC', source_status: source_pend,address: '6555 Quince Rd', city: 'Memphis', state_province:'TN', country: usa) #no source id
org16 = Organization.create(id: 24068, source_id: 'ACT', name: 'Actelion Pharmaceuticals Switzerland', source_status: source_act, source_context: ctep, address: 'Gewerbestrasse 16', city: 'Allschwil', state_province:'Basel-Landschaft', country: 'Switzerland')
if !org16.new_record?
  org16.name_aliases.create(name: 'Actelion')
end
org17 = Organization.create(id: 8352734, name: 'Boston University School Of Public Health', source_status: source_act, address: '715 Albany St', city: 'Boston', state_province:'MA', country: usa) #no source id
org18 = Organization.create(id: 34563051, name: 'UCB, Inc.', source_status: source_act, address: '1950 Lake Park Drive', city: 'Smyrna', state_province:'GA', country: usa) #no source id
if !org18.new_record?
  org18.name_aliases.create(name: 'UCB Pharma')
end

family1 = Family.create(name: 'Masonic Cancer Center')
if !family1.new_record?
  family1.family_memberships.create(organization: org1, family_relationship: aff)
  family1.family_memberships.create(organization: org2, family_relationship: org)
end
family2 = Family.create(name: 'Wake Forest Comprehensive Cancer Center')
if !family2.new_record?
  family2.family_memberships.create(organization: org3, family_relationship: aff)
  family2.family_memberships.create(organization: org4, family_relationship: org)
  family2.family_memberships.create(organization: org5, family_relationship: aff)
  family2.family_memberships.create(organization: org6, family_relationship: aff)
  family2.family_memberships.create(organization: org7, family_relationship: aff)
  family2.family_memberships.create(organization: org8, family_relationship: org)
  family2.family_memberships.create(organization: org9, family_relationship: org)
  family2.family_memberships.create(organization: org10, family_relationship: org)
  family2.family_memberships.create(organization: org11, family_relationship: org)
  family2.family_memberships.create(organization: org12, family_relationship: org)
  family2.family_memberships.create(organization: org13, family_relationship: org)
  family2.family_memberships.create(organization: org14, family_relationship: org)
end
end
