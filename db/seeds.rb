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

org1 = Organization.create(id: 139020, source_id: 'MN021', name: 'University of Minnesota/Masonic Children\'s Hospital', source_status: source_act, source_context: ctep)
if !org1.new_record?
  org1.name_aliases.create(name: 'University of Minnesota Children\'s Hospital Fairview')
  org1.name_aliases.create(name: 'University of Minnesota Medical Center-Fairview-Riverside')
end
org2 = Organization.create(id: 139049, source_id: 'MN022', name: 'University of Minnesota Medical Center-Fairview', source_status: source_act, source_context: ctep)
if !org2.new_record?
  org2.name_aliases.create(name: 'Masonic Cancer Center, University of Minnesota')
end
org3 = Organization.create(id: 153109, source_id: 'NC164', name: 'Coastal Carolina Radiation Oncology', source_status: source_act, source_context: ctep)
org4 = Organization.create(id: 12733422, name: 'Comprehensive Cancer Center of Wake Forest University', source_status: source_act)
org5 = Organization.create(id: 117163, source_id: 'LA032', name: 'Ochsner Baptist Medical Center', source_status: source_act, source_context: ctep)
if !org5.new_record?
  org5.name_aliases.create(name: 'Ochsner Baptist Medical Center')
end
org6 = Organization.create(id: 173475, source_id: 'NY139', name: 'Syracuse Veterans Administration Medical Center', source_status: source_act, source_context: ctep)
org7 = Organization.create(id: 150970, source_id: 'NC088', name: 'Veterans Administration Medical Center.', source_status: source_act, source_context: ctep)
org8 = Organization.create(id: 213850, source_id: 'WAKE', name: 'Wake Forest NCORP Research Base', source_status: source_act, source_context: ctep)
if !org8.new_record?
  org8.name_aliases.create(name: 'Wake Forest Cancer Center Research Base')
end
org9 = Organization.create(id: 36296220, source_id: 'NC275', name: 'Wake Forest University at Clemmons', source_status: source_act, source_context: ctep)
org10 = Organization.create(id: 36296062, source_id: 'NC273', name: 'Wake Forest University at Elkin', source_status: source_act, source_context: ctep)
org11 = Organization.create(id: 36296115, source_id: 'NC274', name: 'Wake Forest University at Lexington', source_status: source_act, source_context: ctep)
org12 = Organization.create(id: 36296009, source_id: 'NC272', name: 'Wake Forest University at Mount Airy', source_status: source_act, source_context: ctep)
org13 = Organization.create(id: 149074, source_id: 'NC002', name: 'Wake Forest University Health Sciences', source_status: source_act, source_context: ctep)
org14 = Organization.create(id: 149221, source_id: 'NC008', name: 'Wake Medical Center-Breast Screening and Diagnostic', source_status: source_act, source_context: ctep)
org15 = Organization.create(id: 23875109, name: 'ACORN Research, LLC', source_status: source_pend)
org16 = Organization.create(id: 24068, source_id: 'ACT', name: 'Actelion Pharmaceuticals Switzerland', source_status: source_act, source_context: ctep)
if !org16.new_record?
  org16.name_aliases.create(name: 'Actelion')
end
org17 = Organization.create(id: 8352734, name: 'Boston University School Of Public Health', source_status: source_act)
org18 = Organization.create(id: 34563051, name: 'UCB, Inc.', source_status: source_act)
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
