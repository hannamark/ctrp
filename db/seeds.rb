# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ctep = SourceContext.create(code: 'CTEP', name: 'CTEP')
ctrp = SourceContext.create(code: 'CTRP', name: 'CTRP')
nlm = SourceContext.create(code: 'NLM', name: 'NLM')
source_act = SourceStatus.create(code: 'ACT', name: 'Active')
source_pend = SourceStatus.create(code: 'PEND', name: 'Pending')
source_inact = SourceStatus.create(code: 'INACT', name: 'InActive')
source_nullified = SourceStatus.create(code: 'NULLIFIED', name: 'Nullified')
org = FamilyRelationship.create(code: 'ORG', name: 'Organizational')
aff = FamilyRelationship.create(code: 'AFF', name: 'Affiliation')
usa = "United States"


############## SEEDING STATIC DATA BEGINS ##################
# NOTE:: In this section insert seeds for static data ,for example source_statuses, family_statuses.It will load minimum required data to create entities for fresh installation of app.So seed file purpose will be served.
#This might be useful in production app also.

#source_statuses

#family_statuses
FamilyStatus.find_or_create_by(code:'ACTIVE',name:'Active')
FamilyStatus.find_or_create_by(code:'INACTIVE',name:'Inactive')

#family_types
FamilyType.find_or_create_by(code:'CANCERCENTER',name:'Cancer Center')
FamilyType.find_or_create_by(code:'NCTN',name:'NCTN')
FamilyType.find_or_create_by(code:'NIH',name:'NIH')
FamilyType.find_or_create_by(code:'RESEARCHCENTER',name:'Research Cancer Center')

StudySource.find_or_create_by(code: 'NAT', name: 'National')
StudySource.find_or_create_by(code: 'EPR', name: 'Externally Peer-Reviewed')
StudySource.find_or_create_by(code: 'INS', name: 'Institutional')
StudySource.find_or_create_by(code: 'EXP', name: 'Expanded Access')
StudySource.find_or_create_by(code: 'IND', name: 'Industrial')
StudySource.find_or_create_by(code: 'OTH', name: 'Other')

Phase.find_or_create_by(code: '0', name: '0')
Phase.find_or_create_by(code: 'I', name: 'I')
Phase.find_or_create_by(code: 'I/II', name: 'I/II')
Phase.find_or_create_by(code: 'II', name: 'II')
Phase.find_or_create_by(code: 'II/III', name: 'II/III')
Phase.find_or_create_by(code: 'III', name: 'III')
Phase.find_or_create_by(code: 'IV', name: 'IV')
Phase.find_or_create_by(code: 'NA', name: 'NA')

PrimaryPurpose.find_or_create_by(code: 'TRM', name: 'Treatment')
PrimaryPurpose.find_or_create_by(code: 'PRV', name: 'Prevention')
PrimaryPurpose.find_or_create_by(code: 'SUP', name: 'Supportive Care')
PrimaryPurpose.find_or_create_by(code: 'SCR', name: 'Screening')
PrimaryPurpose.find_or_create_by(code: 'DIA', name: 'Diagnostic')
PrimaryPurpose.find_or_create_by(code: 'HSR', name: 'Health Services Research')
PrimaryPurpose.find_or_create_by(code: 'BSC', name: 'Basic Science')
PrimaryPurpose.find_or_create_by(code: 'OTH', name: 'Other')

SecondaryPurpose.find_or_create_by(code: 'ANC', name: 'Ancillary-Correlative')
SecondaryPurpose.find_or_create_by(code: 'OTH', name: 'Other')

AccrualDiseaseTerm.find_or_create_by(code: 'SDC', name: 'SDC')
AccrualDiseaseTerm.find_or_create_by(code: 'ICD9', name: 'ICD9')
AccrualDiseaseTerm.find_or_create_by(code: 'ICD10', name: 'ICD10')
AccrualDiseaseTerm.find_or_create_by(code: 'ICD-O-3', name: 'ICD-O-3')

ResponsibleParty.find_or_create_by(code: 'SP', name: 'Sponsor')
ResponsibleParty.find_or_create_by(code: 'PI', name: 'Principal Investigator')
ResponsibleParty.find_or_create_by(code: 'SI', name: 'Sponsor Investigator')

ProtocolIdOrigin.find_or_create_by(code: 'CTEP', name: 'CTEP')
ProtocolIdOrigin.find_or_create_by(code: 'DCP', name: 'DCP')
ProtocolIdOrigin.find_or_create_by(code: 'CCR', name: 'CCR')
ProtocolIdOrigin.find_or_create_by(code: 'NCT', name: 'NCT')
ProtocolIdOrigin.find_or_create_by(code: 'OTH', name: 'Other')

HolderType.find_or_create_by(code: 'INV', name: 'Investigator')
HolderType.find_or_create_by(code: 'ORG', name: 'Organization')
HolderType.find_or_create_by(code: 'IND', name: 'Industry')
HolderType.find_or_create_by(code: 'NIH', name: 'NIH')
HolderType.find_or_create_by(code: 'NCI', name: 'NCI')

ExpandedAccessType.find_or_create_by(code: 'AVA', name: 'Available')
ExpandedAccessType.find_or_create_by(code: 'NLA', name: 'No Longer Available')
ExpandedAccessType.find_or_create_by(code: 'TNA', name: 'Temporarily Not Available')
ExpandedAccessType.find_or_create_by(code: 'AFM', name: 'Approved for Marketing')

TrialStatus.find_or_create_by(code: 'INR', name: 'In Review')
TrialStatus.find_or_create_by(code: 'APP', name: 'Approved')
TrialStatus.find_or_create_by(code: 'ACT', name: 'Active')
TrialStatus.find_or_create_by(code: 'TCA', name: 'Temporarily Closed to Accrual and Intervention')
TrialStatus.find_or_create_by(code: 'CAC', name: 'Closed to Accrual')
TrialStatus.find_or_create_by(code: 'CAI', name: 'Closed to Accrual and Intervention')
TrialStatus.find_or_create_by(code: 'COM', name: 'Complete')
TrialStatus.find_or_create_by(code: 'ACO', name: 'Administratively Complete')
TrialStatus.find_or_create_by(code: 'WIT', name: 'Withdrawn')
TrialStatus.find_or_create_by(code: 'AVA', name: 'Available')
TrialStatus.find_or_create_by(code: 'NLA', name: 'No longer available')
TrialStatus.find_or_create_by(code: 'TNA', name: 'Temporarily not available')
TrialStatus.find_or_create_by(code: 'AFM', name: 'Approved for marketing')

ResearchCategory.find_or_create_by(code: 'INT', name: 'Interventional')
ResearchCategory.find_or_create_by(code: 'OBS', name: 'Observational')
ResearchCategory.find_or_create_by(code: 'EXP', name: 'Expanded Access')
ResearchCategory.find_or_create_by(code: 'ANC', name: 'Ancillary Correlative')
########### SEEDING STATIC DATA ENDS #######################

########## SEEDING APP SETTINGS BEGINS ##########

AppSetting.find_or_create_by(code: 'FM', name: 'Funding Mechanism List', value: 'see big value', big_value: 'B01,B08,B09,C06,D43,D71,DP1,DP2,DP3,E11,F05,F30,F31,F32,F33,F34,F37,F38,G07,G08,G11,G12,G13,G20,G94,H13,H23,H25,H28,H50,H57,H62,H64,H75,H79,HD4,HR1,HS5,I01,K01,K02,K05,K06,K07,K08,K12,K14,K18,K21,K22,K23,K24,K25,K26,K30,K99,KD1,KL1,KL2,L30,L32,L40,L50,L60,M01,N01,N02,N03,N43,N44,P01,P20,P30,P40,P41,P42,P50,P51,P60,P76,PL1,PN1,PN2,R00,R01,R03,R04,R06,R08,R13,R15,R17,R18,R21,R24,R25,R30,R33,R34,R36,R37,R41,R42,R43,R44,R49,R55,R56,R90,RC1,RC2,RC3,RC4,RL1,RL2,RL5,RL9,RS1,S06,S10,S11,S21,S22,SC1,SC2,SC3,T01,T02,T03,T06,T09,T14,T15,T32,T34,T35,T36,T37,T42,T90,TL1,TU2,U01,U09,U10,U11,U13,U14,U17,U18,U19,U1A,U1Q,U1S,U1T,U1V,U21,U22,U23,U24,U27,U2G,U2R,U30,U32,U34,U36,U38,U41,U42,U43,U44,U45,U47,U48,U49,U50,U51,U52,U53,U54,U55,U56,U57,U58,U59,U60,U61,U62,U65,U66,U75,U79,U81,U82,U83,U84,U87,U88,U90,UA1,UC1,UC2,UC3,UC6,UC7,UD1,UE1,UE2,UG1,UH1,UH2,UH3,UL1,UM1,UR1,UR3,UR6,UR8,US3,US4,UT1,UT2,VF1,X01,X02,X06,X98,Y01,Y02,Z01,Z02,Z1A')

AppSetting.find_or_create_by(code: 'IC', name: 'Institute Code List', value: 'see big value', big_value: 'AA,AE,AF,AG,AI,AM,AO,AR,AT,BC,BX,CA,CB,CD,CE,CH,CI,CK,CL,CM,CN,CO,CP,CR,CT,CU,CX,DA,DC,DD,DE,DK,DP,EB,EH,EM,EP,ES,EY,FD,GD,GH,GM,GW,HB,HC,HD,HG,HI,HK,HL,HM,HO,HP,HR,HS,HV,HX,HY,IP,JT,LM,MD,MH,MN,NB,NH,NR,NS,NU,OA,OC,OD,OF,OH,OL,OR,PC,PH,PR,PS,RC,RD,RG,RM,RR,RX,SC,SF,SH,SM,SP,SU,TI,TP,TR,TS,TW,VA,WC,WH,WT')

AppSetting.find_or_create_by(code: 'NCI', name: 'NCI Division/Program Code List', value: 'see big value', big_value: 'CCR,CCT/CTB,CIP,CDP,CTEP,DCB,DCCPS,DCEG,DCP,DEA,DTP,OD,OSB/SPOREs,TRP,RRP,N/A')

AppSetting.find_or_create_by(code: 'LOGIN_BULLETIN', name: 'Login Bulletin', description: 'Message for login page if needed.', value: 'see big value', big_value: '')

AppSetting.find_or_create_by(code: 'NIH', name: 'NIH Institution Code List', value: 'see big value', big_value: 'NEI-National Eye Institute;NHLBI-National Heart, Lung, and Blood Institute;NHGRI-National Human Genome Research Institute;NIA-National Institute on Aging;NIAA-National Institute on Alcohol Abuse and Alcoholism;NIAID-National Institute of Allergy and Infectious Diseases;NIAMS-National Institute of Arthritis and Musculoskeletal and Skin Diseases;NIBIB-National Institute of Biomedical Imaging and Bioengineering;NICHD-NICHD-Eunice Kennedy Shriver National Institute of Child Health and Human Development;NIDCD-National Institute on Deafness and Other Communication Disorders;NIDCR-National Institute of Dental and Craniofacial Research;NIDDK-National Institute of Diabetes and Digestive and Kidney Diseases;NIDA-National Institute on Drug Abuse;NIEHS-National Institute of Environmental Health Sciences;NIGMS-National Institute of General Medical Sciences;NIMH-National Institute of Mental Health;NINDS-National Institute of Neurological Disorders and Stroke;NINR-National Institute of Nursing Research;NLM-National Library of Medicine;CIT-Center for Information Technology;CSR-Center for Scientific Review;FIC-John E. Fogarty International Center for Advanced Study in the Health Sciences;NCCAM-National Center for Complementary and Alternative Medicine;NCMHD-National Center on Minority Health and Health Disparities;NCRR-National Center for Research Resources (NCRR);CC-NIH Clinical Center;OD-Office of the Director')

AppSetting.find_or_create_by(code: 'APP_RELEASE_MILESTONE', name: 'Application Release Milestone', description: 'Use this for identifying a milestone of a software release, e.g. 5.0 M1', value: 'M2', big_value: '')



########## SEEDING APP SETTINGS ENDS ##########

if Organization.count  == 0
org1 = Organization.create(id: 139020, source_id: 'MN021', name: 'University of Minnesota/Masonic Children\'s Hospital', source_status: source_act, source_context: ctep, address: '2450 Riverside Ave', city: 'Minneapolis', state_province: 'Minnesota', country:usa)
if !org1.new_record?
  org1.name_aliases.create(name: 'University of Minnesota Children\'s Hospital Fairview')
  org1.name_aliases.create(name: 'University of Minnesota Medical Center-Fairview-Riverside')
end
org2 = Organization.create(id: 139049, source_id: 'MN022', name: 'University of Minnesota Medical Center-Fairview', source_status: source_act, source_context: ctep, address: '516 Delaware St SE', city: 'Minneapolis', state_province:'Minnesota', country:usa)
if !org2.new_record?
  org2.name_aliases.create(name: 'Masonic Cancer Center, University of Minnesota')
end
org3 = Organization.create(id: 153109, source_id: 'NC164', name: 'Coastal Carolina Radiation Oncology', source_status: source_act, source_context: ctep, address: '1988 S 16th St', city: 'Wilmington', state_province:'North Carolina', country:usa)
org4 = Organization.create(id: 12733422, name: 'Comprehensive Cancer Center of Wake Forest University', source_status: source_act, source_context:ctrp, address: '1 Medical Center Blvd', city: '', state_province:'North Carolina', country: usa) #labeled unknown in directory
org5 = Organization.create(id: 117163, source_id: 'LA032', name: 'Ochsner Baptist Medical Center', source_status: source_act, source_context: ctep, address: '2700 Napoleon Ave', city: 'New Orleans', state_province:'Louisiana', country:usa)
if !org5.new_record?
  org5.name_aliases.create(name: 'Ochsner Baptist Medical Center')
end
org6 = Organization.create(id: 173475, source_id: 'NY139', name: 'Syracuse Veterans Administration Medical Center', source_status: source_act, source_context: ctep, address: ' 800 Irving Ave', city: 'Syracuse', state_province:'New York', country:usa)
org7 = Organization.create(id: 150970, source_id: 'NC088', name: 'Veterans Administration Medical Center.', source_status: source_act, source_context: ctep, address: '50 Irving St NW', city: '', state_province:'District of Columbia', country:usa)
org8 = Organization.create(id: 213850, source_id: 'WAKE', name: 'Wake Forest NCORP Research Base', source_status: source_act, source_context: ctep, address: 'Medical Center Blvd', city: 'Winston-Salem', state_province:'North Carolina', country:usa, phone: '336-716-0891', postal_code: '27157')
if !org8.new_record?
  org8.name_aliases.create(name: 'Wake Forest Cancer Center Research Base')
end
org9 = Organization.create(id: 36296220, source_id: 'NC275', name: 'Wake Forest University at Clemmons', source_status: source_act, source_context: ctep, address: '3540 Clemmons Rd', city: 'Clemmons', state_province:'North Carolina', country:usa)
org10 = Organization.create(id: 36296062, source_id: 'NC273', name: 'Wake Forest University at Elkin', source_status: source_act, source_context: ctep, address: '200 Johnson Ridge Medical Park', city: 'Elkin', state_province:'North Carolina', country:usa)
org11 = Organization.create(id: 36296115, source_id: 'NC274', name: 'Wake Forest University at Lexington', source_status: source_act, source_context: ctep, address: '250 Hospital Drive', city: 'Lexington', state_province:'North Carolina', country:usa)
org12 = Organization.create(id: 36296009, source_id: 'NC272', name: 'Wake Forest University at Mount Airy', source_status: source_act, source_context: ctep, address: '910 Worth St.', city: 'Mt. Airy', state_province:'North Carolina', country:usa)
org13 = Organization.create(id: 149074, source_id: 'NC002', name: 'Wake Forest University Health Sciences', source_status: source_act, source_context: ctep, address: '1 Medical Center Blvd', city: 'Winston-Salem', state_province:'North Carolina', country:usa) #no source id
org14 = Organization.create(id: 149221, source_id: 'NC008', name: 'Wake Medical Center-Breast Screening and Diagnostic', source_status: source_act, source_context: ctep, address: '3000 New Bern Avenue ', city: 'Raleigh', state_province:'North Carolina', country:usa)
org15 = Organization.create(id: 23875109, name: 'ACORN Research, LLC', source_status: source_pend, source_context:ctrp, address: '6555 Quince Rd', city: 'Memphis', state_province:'Tennessee', country: usa, source_id: '23456', ctrp_id: 23456) #no source id
org16 = Organization.create(id: 24068, source_id: 'ACT', name: 'Actelion Pharmaceuticals Switzerland', source_status: source_act, source_context: ctep, address: 'Gewerbestrasse 16', city: 'Allschwil', state_province:'Basel-Landschaft', country: 'Switzerland')
if !org16.new_record?
  org16.name_aliases.create(name: 'Actelion')
end
org17 = Organization.create(id: 8352734, name: 'Boston University School Of Public Health', source_status: source_act,  source_context:ctrp, address: '715 Albany St', city: 'Boston', state_province:'Massachusetts', country: usa) #no source id
org18 = Organization.create(id: 34563051, name: 'UCB, Inc.', source_status: source_act,  source_context:ctrp, address: '1950 Lake Park Drive', city: 'Smyrna', state_province:'Georgia', country: usa) #no source id
if !org18.new_record?
  org18.name_aliases.create(name: 'UCB Pharma')
end
org19 = Organization.create(name: 'ACORN Research, LLC', source_status: source_pend, source_context:ctep, address: '6555 Quince Rd', city: 'Memphis', state_province:'Tennessee', country: usa, source_id: "ACRN", ctrp_id: 23456) #no source id

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


if Person.count  == 0
person1 = Person.find_or_create_by(id:1699192, source_id:'33303', source_context: ctep, fname:'Ajeet', lname:'Gajra', prefix:'Dr.', suffix:'', email:'gajraa@upstate.edu', phone:'315-425-2707')
person2 = Person.find_or_create_by(id:7857011, source_id:'518786', source_context: ctrp, fname:'Alicia', lname:'Kunin-Batson', prefix:'Dr.', suffix:'', email:'kunin003@umn.edu', phone:'612-624-6931')
person3 = Person.find_or_create_by(id:3567738, source_id:'515762', source_context: ctep, fname:'Amy', mname:'M.', lname:'Linabery', prefix:'Ms.', suffix:'', email:'devr0053@umn.edu', phone:'612-624-0146')
person4 = Person.find_or_create_by(id:2944806, source_id:'41379', source_context: ctrp, fname:'Amy', mname:'L.', lname:'Jonson', prefix:'Dr.', suffix:'', email:'jonso001@umn.edu', phone:'612-624-2620')
person5 = Person.find_or_create_by(id:1832268, source_id:'34482', source_context: ctep, fname:'Badrinath', mname:'R.', lname:'Konety', prefix:'Dr.', suffix:'', email:'brkonety@umn.edu', phone:'612-624-2620')
person6 = Person.find_or_create_by(id:10161459, source_id:'46120', source_context: ctrp, fname:'Christine', lname:'Holmberg', prefix:'Dr.', suffix:'', email:'christine.holmberg@charite.de', phone:'-1152')
person7 = Person.find_or_create_by(id:366649, source_id:'11640', source_context: ctep, fname:'Christopher', mname:'Yancey', lname:'Thomas', prefix:'Dr.', suffix:'', email:'cythomas@wakehealth.edu', phone:'434-243-6143')
person8 = Person.find_or_create_by(id:2026171, source_id:'35504', source_context: ctrp, fname:'Daniel', mname:'Evan', lname:'Epner', prefix:'Dr.', suffix:'', email:'depner@mdanderson.org', phone:'713-792-3245')
person9 = Person.find_or_create_by(id:672434, source_id:'19844', source_context: ctep, fname:'David', mname:'Marc', lname:'Peereboom', prefix:'Dr.', suffix:'', email:'peerebd@ccf.org', phone:'866-223-8100')
person10 = Person.find_or_create_by(id:1426655, source_id:'15179', source_context: ctrp, fname:'Gisele', lname:'Sarosy', prefix:'Dr.', suffix:'', email:'gsarosy@mail.nih.gov', phone:'800-411-1222')
end

PoAffiliationStatus.find_or_create_by(name: 'Active', code: 'ACTIVE')
PoAffiliationStatus.find_or_create_by(name: 'Inactive', code: 'INACTIVE')

##Families
family1 = Family.find_or_create_by(name: 'Albert Einstein Cancer Center',family_status_id:1,family_type_id:1)#Cancer Center
family2 = Family.find_or_create_by(name: 'Arizona Cancer Center',family_status_id:1,family_type_id:1)#Cancer Center
family3 = Family.find_or_create_by(name: 'David H. Koch Institute for Integrative Cancer Research at MIT',family_status_id:1,family_type_id:4) #Research Center
family4 = Family.find_or_create_by(name: 'NCI Center for Cancer Research (CCR)',family_status_id:1,family_type_id:3) #NIH
family5 = Family.find_or_create_by(name: 'NRG Oncology',family_status_id:1,family_type_id:2)#NCTN
family6 = Family.find_or_create_by(name: 'Yale Cancer Center',family_status_id:2,family_type_id:1)#Cancer Center



test_users = [ {"username" => "ctrpsuper", "role" => "ROLE_SUPER", "approve" => true},
               {"username" => "ctrpadmin", "role" => "ROLE_SUPER" , "approve" => true},
               {"username" => "ctrpcurator", "role" => "ROLE_CURATOR" , "approve" => true},
               {"username" => "testercurator", "role" => "ROLE_CURATOR" , "approve" => true},
               {"username" => "po_curator1", "role" => "ROLE_CURATOR", "approve" => false },
               {"username" => "po_curator2", "role" => "ROLE_CURATOR" , "approve" => false},
               {"username" => "po_curator3", "role" => "ROLE_CURATOR" , "approve" => false},
               {"username" => "ctrpreadonly", "role" => "ROLE_READONLY", "approve" => true }
          ]

test_users.each do |u|
  user = User.find_by_username(u["username"])
  unless user.blank?
    user.role = u["role"]
    user.approved =  u["approve"]
    user.save!
    puts "Updated role of user = #{user.username}, role = #{user.role}"
  end
end


boston_users = [ {"username" => "ctrpsuperboston", "role" => "ROLE_SUPER", "approve" => true},
               {"username" => "b1", "role" => "ROLE_SUPER" , "approve" => false},
               {"username" => "b2", "role" => "ROLE_SUPER" , "approve" => false},
               {"username" => "b3", "role" => "ROLE_SUPER" , "approve" => false},
               {"username" => "b4", "role" => "ROLE_SUPER", "approve" => false }
]


boston_users.each do |u|
  user = User.find_by_username(u["username"])
  unless user.blank?
    user.role = u["role"]
    user.approved =  u["approve"]
    # Set the Organization to 'Boston University School Of Public Health'
    boston_univ = Organization.find_by_id(8352734)
    user.organization = boston_univ
    user.save!
    puts "Updated role of user = #{user.username}, role = #{user.role}"
  end
end

##Add NCICTRPDEV team
LdapUser.delete_all

charlie = {"email" => "shivece@mail.nih.gov", "role" => "ROLE_SUPER" }
mahesh = {"email" => "yelisettim@mail.nih.gov", "role" => "ROLE_SUPER" }
shilpi = {"email" => "singhs10@mail.nih.gov", "role" => "ROLE_SUPER" }
shamim = {"email" => "ahmeds6@mail.nih.gov", "role" => "ROLE_SUPER" }
murali = {"email" => "dullam@mail.nih.gov", "role" => "ROLE_SUPER" }
tony = {"email" => "wangg5@mail.nih.gov", "role" => "ROLE_SUPER" }
shenpei = {"email" => "wus4@mail.nih.gov", "role" => "ROLE_SUPER" }
sarada = {"email" => "schintal@mail.nih.gov", "role" => "ROLE_SUPER" }
hemant = {"email" => "undalehv@mail.nih.gov", "role" => "ROLE_CURATOR" }
radhika = {"email" => "radhika.tekumalla@nih.gov", "role" => "ROLE_SUPER" }

ncictrpdev_users = [charlie, mahesh, shilpi, shamim, murali, tony, shenpei, sarada, hemant, radhika]

##Add CTRP Business Analysts

joe = {"email" => "martuccijj@mail.nih.gov", "role" => "ROLE_CURATOR" }
jose = {"email" => "galvezjj@mail.nih.gov", "role" => "ROLE_READONLY" }
michael = {"email" => "izbickimj@mail.nih.gov", "role" => "ROLE_CURATOR" }
sandy = {"email" => "lightbodysj@mail.nih.gov", "role" => "ROLE_READONLY" }
kirsten = {"email" => "larcokl@mail.nih.gov", "role" => "ROLE_CURATOR" }
deb = {"email" => "hopeda@mail.nih.gov", "role" => "ROLE_CURATOR" }
susan = {"email" => "nonemakersl@mail.nih.gov", "role" => "ROLE_READONLY" }

ba_users = [joe, jose, michael, sandy, kirsten, deb, susan]

all_users = ncictrpdev_users + ba_users

## Save the users by bypassing validation. We want to save the user without the password
begin
  all_users.each do |u|
    ldap_user = LdapUser.new
    ldap_user.email = u["email"]
    ldap_user.username = u["email"].split("@")[0]
    ldap_user.role = u["role"]
    ldap_user.approved = true
    ldap_user.save(validate: false)
    puts "Saved user = #{ldap_user.username}  role = #{ldap_user.role}"
  end
rescue Exception => e
  Rails.logger.info "Exception thrown #{e.inspect}"
end
