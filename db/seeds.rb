require 'rubygems'
require 'roo'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#Remove Data
DataImport.delete_trial_data
NameAlias.delete_all
Organization.delete_all
Person.delete_all


SourceContext.find_or_create_by(code: 'CTEP', name: 'CTEP')
SourceContext.find_or_create_by(code: 'CTRP', name: 'CTRP')
SourceContext.find_or_create_by(code: 'NLM', name: 'NLM')
SourceStatus.find_or_create_by(code: 'ACT', name: 'Active')
SourceStatus.find_or_create_by(code: 'PEND', name: 'Pending')
SourceStatus.find_or_create_by(code: 'INACT', name: 'InActive')
SourceStatus.find_or_create_by(code: 'NULLIFIED', name: 'Nullified')
FamilyRelationship.find_or_create_by(code: 'ORG', name: 'Organizational')
FamilyRelationship.find_or_create_by(code: 'AFF', name: 'Affiliation')

source_act = SourceStatus.find_by_code("ACT")
source_pend = SourceStatus.find_by_code("PEND")
source_inact = SourceStatus.find_by_code("INACT")
source_nullified = SourceStatus.find_by_code("NULLIFIED")

ctep = SourceContext.find_by_code('CTEP')
ctrp = SourceContext.find_by_code('CTRP')
nlm = SourceContext.find_by_code('NLM')

org = FamilyRelationship.find_by_code('ORG')
aff = FamilyRelationship.find_by_code('AFF')

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

ResponsibleParty.find_or_create_by(code: 'SPONSOR', name: 'Sponsor')
ResponsibleParty.find_or_create_by(code: 'PI', name: 'Principal Investigator')
ResponsibleParty.find_or_create_by(code: 'SI', name: 'Sponsor-Investigator')

ProtocolIdOrigin.find_or_create_by(code: 'NCT', name: 'ClinicalTrials.gov Identifier')
ProtocolIdOrigin.find_or_create_by(code: 'CTEP', name: 'CTEP Identifier')
ProtocolIdOrigin.find_or_create_by(code: 'DCP', name: 'DCP Identifier')
ProtocolIdOrigin.find_or_create_by(code: 'CCR', name: 'CCR Identifier')
ProtocolIdOrigin.find_or_create_by(code: 'DNCI', name: 'Duplicate NCI Identifier')
ProtocolIdOrigin.find_or_create_by(code: 'ONCT', name: 'Obsolete ClinicalTrials.gov Identifier')
ProtocolIdOrigin.find_or_create_by(code: 'OTH', name: 'Other Identifier')

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
TrialStatus.find_or_create_by(code: 'CAC', name: 'Closed to Accrual')
TrialStatus.find_or_create_by(code: 'CAI', name: 'Closed to Accrual and Intervention')
TrialStatus.find_or_create_by(code: 'TCL', name: 'Temporarily Closed to Accrual')
TrialStatus.find_or_create_by(code: 'TCA', name: 'Temporarily Closed to Accrual and Intervention')
TrialStatus.find_or_create_by(code: 'COM', name: 'Complete')
TrialStatus.find_or_create_by(code: 'ACO', name: 'Administratively Complete')
TrialStatus.find_or_create_by(code: 'WIT', name: 'Withdrawn')
TrialStatus.find_or_create_by(code: 'AVA', name: 'Available')
TrialStatus.find_or_create_by(code: 'NLA', name: 'No longer available')
TrialStatus.find_or_create_by(code: 'TNA', name: 'Temporarily not available')
TrialStatus.find_or_create_by(code: 'AFM', name: 'Approved for marketing')

ResearchCategory.find_or_create_by(code: 'INT', name: 'Interventional')
ResearchCategory.find_or_create_by(code: 'OBS', name: 'Observational')
ResearchCategory.find_or_create_by(code: 'ANC', name: 'Ancillary Correlative')

ProcessingStatus.find_or_create_by(code: 'SUB', name: 'Submitted')
ProcessingStatus.find_or_create_by(code: 'STM', name: 'Submission Terminated')
ProcessingStatus.find_or_create_by(code: 'SRE', name: 'Submission Reactivated')
ProcessingStatus.find_or_create_by(code: 'AMS', name: 'Amendment Submitted')
ProcessingStatus.find_or_create_by(code: 'ACC', name: 'Accepted')
ProcessingStatus.find_or_create_by(code: 'REJ', name: 'Rejected')
ProcessingStatus.find_or_create_by(code: 'ABS', name: 'Abstracted')
ProcessingStatus.find_or_create_by(code: 'VFP', name: 'Verification Pending')
ProcessingStatus.find_or_create_by(code: 'AVR', name: 'Abstraction Verified Response')
ProcessingStatus.find_or_create_by(code: 'VNR', name: 'Abstraction Verified No Response')
ProcessingStatus.find_or_create_by(code: 'OHD', name: 'On-Hold')

Milestone.find_or_create_by(code: 'SAC', name: 'Submission Acceptance Date')
Milestone.find_or_create_by(code: 'SRJ', name: 'Submission Rejection Date')
Milestone.find_or_create_by(code: 'STR', name: 'Submission Terminated Date')
Milestone.find_or_create_by(code: 'SRE', name: 'Submission Reactivated Date')
Milestone.find_or_create_by(code: 'SRD', name: 'Submission Received Date')
Milestone.find_or_create_by(code: 'APS', name: 'Administrative Processing Start Date')
Milestone.find_or_create_by(code: 'APC', name: 'Administrative Processing Completed Date')
Milestone.find_or_create_by(code: 'RAQ', name: 'Ready for Administrative QC Date')
Milestone.find_or_create_by(code: 'AQS', name: 'Administrative QC Start Date')
Milestone.find_or_create_by(code: 'AQC', name: 'Administrative QC Completed Date')
Milestone.find_or_create_by(code: 'SPS', name: 'Scientific Processing Start Date')
Milestone.find_or_create_by(code: 'SPC', name: 'Scientific Processing Completed Date')
Milestone.find_or_create_by(code: 'RSQ', name: 'Ready for Scientific QC Date')
Milestone.find_or_create_by(code: 'SQS', name: 'Scientific QC Start Date')
Milestone.find_or_create_by(code: 'SQC', name: 'Scientific QC Completed Date')
Milestone.find_or_create_by(code: 'RTS', name: 'Ready for Trial Summary Report Date')
Milestone.find_or_create_by(code: 'TSR', name: 'Trial Summary Report Date')
Milestone.find_or_create_by(code: 'STS', name: 'Submitter Trial Summary Report Feedback Date')
Milestone.find_or_create_by(code: 'IAV', name: 'Initial Abstraction Verified Date')
Milestone.find_or_create_by(code: 'ONG', name: 'On-going')
Milestone.find_or_create_by(code: 'AVD', name: 'Abstraction Verified Date')
Milestone.find_or_create_by(code: 'LRD', name: 'Late Rejection Date')


########### SEEDING STATIC DATA ENDS #######################

########## SEEDING APP SETTINGS BEGINS ##########

AppSetting.find_or_create_by(code: 'FM', name: 'Funding Mechanism List', value: 'see big value', big_value: 'B01,B08,B09,C06,D43,D71,DP1,DP2,DP3,E11,F05,F30,F31,F32,F33,F34,F37,F38,G07,G08,G11,G12,G13,G20,G94,H13,H23,H25,H28,H50,H57,H62,H64,H75,H79,HD4,HR1,HS5,I01,K01,K02,K05,K06,K07,K08,K12,K14,K18,K21,K22,K23,K24,K25,K26,K30,K99,KD1,KL1,KL2,L30,L32,L40,L50,L60,M01,N01,N02,N03,N43,N44,P01,P20,P30,P40,P41,P42,P50,P51,P60,P76,PL1,PN1,PN2,R00,R01,R03,R04,R06,R08,R13,R15,R17,R18,R21,R24,R25,R30,R33,R34,R36,R37,R41,R42,R43,R44,R49,R55,R56,R90,RC1,RC2,RC3,RC4,RL1,RL2,RL5,RL9,RS1,S06,S10,S11,S21,S22,SC1,SC2,SC3,T01,T02,T03,T06,T09,T14,T15,T32,T34,T35,T36,T37,T42,T90,TL1,TU2,U01,U09,U10,U11,U13,U14,U17,U18,U19,U1A,U1Q,U1S,U1T,U1V,U21,U22,U23,U24,U27,U2G,U2R,U30,U32,U34,U36,U38,U41,U42,U43,U44,U45,U47,U48,U49,U50,U51,U52,U53,U54,U55,U56,U57,U58,U59,U60,U61,U62,U65,U66,U75,U79,U81,U82,U83,U84,U87,U88,U90,UA1,UC1,UC2,UC3,UC6,UC7,UD1,UE1,UE2,UG1,UH1,UH2,UH3,UL1,UM1,UR1,UR3,UR6,UR8,US3,US4,UT1,UT2,VF1,X01,X02,X06,X98,Y01,Y02,Z01,Z02,Z1A')

AppSetting.find_or_create_by(code: 'IC', name: 'Institute Code List', value: 'see big value', big_value: 'AA,AE,AF,AG,AI,AM,AO,AR,AT,BC,BX,CA,CB,CD,CE,CH,CI,CK,CL,CM,CN,CO,CP,CR,CT,CU,CX,DA,DC,DD,DE,DK,DP,EB,EH,EM,EP,ES,EY,FD,GD,GH,GM,GW,HB,HC,HD,HG,HI,HK,HL,HM,HO,HP,HR,HS,HV,HX,HY,IP,JT,LM,MD,MH,MN,NB,NH,NR,NS,NU,OA,OC,OD,OF,OH,OL,OR,PC,PH,PR,PS,RC,RD,RG,RM,RR,RX,SC,SF,SH,SM,SP,SU,TI,TP,TR,TS,TW,VA,WC,WH,WT')

AppSetting.find_or_create_by(code: 'NCI', name: 'NCI Division/Program Code List', value: 'see big value', big_value: 'CCR,CCT/CTB,CIP,CDP,CTEP,DCB,DCCPS,DCEG,DCP,DEA,DTP,OD,OSB/SPOREs,TRP,RRP,N/A')

AppSetting.find_or_create_by(code: 'LOGIN_BULLETIN', name: 'Login Bulletin', description: 'Message for login page if needed.', value: 'see big value', big_value: 'This is the CI tier at CBIIT')

AppSetting.find_or_create_by(code: 'NIH', name: 'NIH Institution Code List', value: 'see big value', big_value: 'NEI-National Eye Institute;NHLBI-National Heart, Lung, and Blood Institute;NHGRI-National Human Genome Research Institute;NIA-National Institute on Aging;NIAA-National Institute on Alcohol Abuse and Alcoholism;NIAID-National Institute of Allergy and Infectious Diseases;NIAMS-National Institute of Arthritis and Musculoskeletal and Skin Diseases;NIBIB-National Institute of Biomedical Imaging and Bioengineering;NICHD-NICHD-Eunice Kennedy Shriver National Institute of Child Health and Human Development;NIDCD-National Institute on Deafness and Other Communication Disorders;NIDCR-National Institute of Dental and Craniofacial Research;NIDDK-National Institute of Diabetes and Digestive and Kidney Diseases;NIDA-National Institute on Drug Abuse;NIEHS-National Institute of Environmental Health Sciences;NIGMS-National Institute of General Medical Sciences;NIMH-National Institute of Mental Health;NINDS-National Institute of Neurological Disorders and Stroke;NINR-National Institute of Nursing Research;NLM-National Library of Medicine;CIT-Center for Information Technology;CSR-Center for Scientific Review;FIC-John E. Fogarty International Center for Advanced Study in the Health Sciences;NCCAM-National Center for Complementary and Alternative Medicine;NCMHD-National Center on Minority Health and Health Disparities;NCRR-National Center for Research Resources (NCRR);CC-NIH Clinical Center;OD-Office of the Director')

AppSetting.find_or_create_by(code: 'APP_RELEASE_MILESTONE', name: 'Application Release Milestone', description: 'Use this for identifying a milestone of a software release, e.g. 5.0 M1', value: 'S7', big_value: '')

AppSetting.find_or_create_by(code: 'ACCEPTED_FILE_TYPES', name: 'Accepted File Types', value: 'pdf,doc,docx,xls,xlsx,zip,gz', big_value: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/zip, application/x-gzip')

trial_status_transition = '{
                             "STATUSZERO": {
                               "INR": {"valid": "Yes"},
                               "APP": {"warnings": [{"status": "INR"}]},
                               "WIT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "ACT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "CAC": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "CAI": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}]},
                               "TCL": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}]},
                               "TCA": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}]},
                               "COM": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]},
                               "ACO": {"warnings": [{"status": "INR"}, {"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}]}
                             },
                             "INR": {
                               "INR": {"errors": [{"message": "Duplicate"}]},
                               "APP": {"valid": "Yes", "sameDay": "Yes"},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "APP"}, {"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "APP"}, {"status": "ACT"}, {"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "APP": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Duplicate"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "ACT"}, {"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"warnings": [{"status": "ACT"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"status": "ACT"}, {"status": "TCL"}], "sameDay": "Yes"},
                               "COM": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"errors": [{"status": "ACT"}, {"status": "CAC"}], "warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "WIT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Duplicate"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACT": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Duplicate"}]},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAC": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Duplicate"}]},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "TCA": {"warnings": [{"message": "Invalid Transition"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "CAI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Duplicate"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"valid": "Yes", "sameDay": "Yes"},
                               "ACO": {"valid": "Yes", "sameDay": "Yes"}
                             },
                             "TCL": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"valid": "Yes", "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Duplicate"}]},
                               "TCA": {"valid": "Yes", "sameDay": "Yes"},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "TCA": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"valid": "Yes", "sameDay": "Yes"},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Duplicate"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "COM": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Duplicate"}]},
                               "ACO": {"errors": [{"message": "Invalid Transition"}]}
                             },
                             "ACO": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"errors": [{"message": "Invalid Transition"}]},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Duplicate"}]}
                             }
                           }'

AppSetting.find_or_create_by(code: 'TRIAL_STATUS_TRANSITION', name: 'Trial Status Transition Matrix', value: 'see big value', big_value: trial_status_transition)

########## SEEDING APP SETTINGS ENDS ##########
org1 = Organization.find_or_create_by( id: 139020, source_id: 'MN021', name: 'University of Minnesota/Masonic Children\'s Hospital', phone:'301-999-200f', source_status: source_act, source_context: ctep, address: '2450 Riverside Ave', city: 'Minneapolis', state_province: 'Minnesota', country:usa, postal_code: '35465', email: "ahaley@minnhealth.com")
if !org1.new_record?
  org1.name_aliases.find_or_create_by(name: 'University of Minnesota Children\'s Hospital Fairview')
  org1.name_aliases.find_or_create_by(name: 'University of Minnesota Medical Center-Fairview-Riverside')
end
org2 = Organization.find_or_create_by(id: 139049, source_id: 'MN022', name: 'University of Minnesota Medical Center-Fairview',  phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '516 Delaware St SE', city: 'Minneapolis', state_province:'Minnesota', country:usa, postal_code: '123432', email: "cdickens@minnhealth.com")
if !org2.new_record?
  org2.name_aliases.find_or_create_by(name: 'Masonic Cancer Center, University of Minnesota')
end

org3 = Organization.find_or_create_by(id: 153109, source_id: 'NC164', name: 'Coastal Carolina Radiation Oncology', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '1988 S 16th St', city: 'Wilmington', state_province:'North Carolina', country:usa, postal_code: '56456', email: "rdahl@wilmhealth.com")
org4 = Organization.find_or_create_by(id: 12733422, name: 'Comprehensive Cancer Center of Wake Forest University', phone:'315-425-2707', source_status: source_act, source_context:ctrp, address: '1 Medical Center Blvd', city: '', state_province:'North Carolina', country: usa, postal_code: '12344', email: "fforsyth@wakehealth.com") #labeled unknown in directory
org5 = Organization.find_or_create_by(id: 117163, source_id: 'LA032', name: 'Ochsner Baptist Medical Center', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '2700 Napoleon Ave', city: 'New Orleans', state_province:'Louisiana', country:usa, postal_code: '082345', email: "jlahiri@loiushealth.com")
if !org5.new_record?
  org5.name_aliases.find_or_create_by(name: 'Ochsner Baptist Medical Center')
end
org6 = Organization.find_or_create_by(id: 173475, source_id: 'NY139', name: 'Syracuse Veterans Administration Medical Center', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: ' 800 Irving Ave', city: 'Syracuse', state_province:'New York', country:usa, postal_code: '12347', email: "kdesai@syrhealth.com")
org7 = Organization.find_or_create_by(id: 150970, source_id: 'NC088', name: 'Veterans Administration Medical Center.', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '50 Irving St NW', city: '', state_province:'District of Columbia', country:usa, postal_code: '95673', email: "pcoaehlo@columbiahealth.com")
org8 = Organization.find_or_create_by(id: 213850, source_id: 'WAKE', name: 'Wake Forest NCORP Research Base', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: 'Medical Center Blvd', city: 'Winston-Salem', state_province:'North Carolina', country:usa, postal_code: '27157', email: "gmarquez@salemhealth.com")
if !org8.new_record?
  org8.name_aliases.create(name: 'Wake Forest Cancer Center Research Base')
end
org9 = Organization.find_or_create_by(id: 36296220, source_id: 'NC275', name: 'Wake Forest University at Clemmons', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '3540 Clemmons Rd', city: 'Clemmons', state_province:'North Carolina', country:usa, postal_code: '78778', email: "owilde@clemmhealth.com")
org10 = Organization.find_or_create_by(id: 36296062, source_id: 'NC273', name: 'Wake Forest University at Elkin', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '200 Johnson Ridge Medical Park', city: 'Elkin', state_province:'North Carolina', country:usa, postal_code: '27345', email: "rstevenson@elkinhealth.com")
org11 = Organization.find_or_create_by(id: 36296115, source_id: 'NC274', name: 'Wake Forest University at Lexington', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '250 Hospital Drive', city: 'Lexington', state_province:'North Carolina', country:usa, postal_code: '3427157', email: "jswift@lexhealth.com")
org12 = Organization.find_or_create_by(id: 36296009, source_id: 'NC272', name: 'Wake Forest University at Mount Airy', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '910 Worth St.', city: 'Mt. Airy', state_province:'North Carolina', country:usa, postal_code: '5627157', email: "jrrtolkien@airyhealth.com")
org13 = Organization.find_or_create_by(id: 149074, source_id: 'NC002', name: 'Wake Forest University Health Sciences', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '1 Medical Center Blvd', city: 'Winston-Salem', state_province:'North Carolina', country:usa, postal_code: '3427157', email: "mtwain@wakehealth.com") #no source id
org14 = Organization.find_or_create_by(id: 149221, source_id: 'NC008', name: 'Wake Medical Center-Breast Screening and Diagnostic', phone:'315-425-2707', source_status: source_act, source_context: ctep, address: '3000 New Bern Avenue ', city: 'Raleigh', state_province:'North Carolina', country:usa, postal_code: '4527157', email: "jausten@wakehealth.com")
org15 = Organization.find_or_create_by(id: 23875109, name: 'ACORN Research, LLC', phone:'315-425-2707', source_status: source_pend, source_context:ctrp, address: '6555 Quince Rd', city: 'Memphis', state_province:'Tennessee', country: usa, source_id: '23456') #no source id
org16 = Organization.find_or_create_by(id: 24068, source_id: 'ACT', phone:'315-425-2707', name: 'Actelion Pharmaceuticals Switzerland', source_status: source_act, source_context: ctep, address: 'Gewerbestrasse 16', city: 'Allschwil', state_province:'Basel-Landschaft', country: 'Switzerland', postal_code: '34527157', email: "ebronte@wakehealth.com")
if !org16.new_record?
  org16.name_aliases.find_or_create_by(name: 'Actelion')
end
org17 = Organization.find_or_create_by(id: 8352734, name: 'Boston University School Of Public Health', source_status: source_act,  source_context:ctrp, address: '715 Albany St', city: 'Boston', state_province:'Massachusetts', country: usa, postal_code: '27157', email: "cbronte@masshealth.com") #no source id
org18 = Organization.find_or_create_by(id: 34563051, name: 'UCB, Inc.', source_status: source_act,  source_context:ctrp, address: '1950 Lake Park Drive', city: 'Smyrna', state_province:'Georgia', country: usa, email: "enesbit@smyrnahealth.com") #no source id
if !org18.new_record?
  org18.name_aliases.find_or_create_by(name: 'UCB Pharma')
end
org19 = Organization.find_or_create_by(name: 'ACORN Research, LLC', source_status: source_pend, source_context:ctep, address: '6555 Quince Rd', city: 'Memphis', state_province:'Tennessee', country: usa, source_id: "ACRN", ctrp_id: org15.id, postal_code: '23455', email: "vhugo@memphishealth.com") #no source id

org20 = Organization.find_or_create_by(id: 226701, source_id: 'TX111', name: 'Texas Health Harris Methodist Hospital Fort Worth', phone:'865-541-1812', source_status: source_act, source_context: ctrp, email: "jgrisham@texashealth.com", address: '1300 West Terrell', city: 'Fort Worth', state_province:'Texas', country:usa, postal_code:"147892")
org21 = Organization.find_or_create_by(id: 595150, source_id: 'CO029', name: 'Memorial Hospital Colorado Springs', phone:'865-541-1813', source_status: source_act, source_context: ctrp, email: "mcrichton@boulderhealth.com", address: '1400 East Boulder', city: 'Colorado Springs', state_province:'Colorado', country:usa, postal_code:"37498")
org22 = Organization.find_or_create_by(id: 2118412, source_id: 'MA043', name: 'Boston Medical Center', phone:'617-353-7571', source_status: source_act, source_context: ctrp, email: "rcook@bostonhealth.com",  address: '1 Medical Center Drive', city: 'Boston', state_province:'Massachussets', country:usa, postal_code:"3849504")
org23 = Organization.find_or_create_by(id: 33699872, source_id: 'NVRF', name: 'Nevada Cancer Research Foundation CCOP', phone:'702-541-1815', source_status: source_act, source_context: ctrp,  email: "rludlum@lasvegashealth.com",  address: '1 Rancho Drive', city: 'Las Vegas', state_province:'Nevada', country:usa, postal_code:"926344")
org24 = Organization.find_or_create_by(id: 8149074, source_id: 'WA002', name: 'Harborview Medical Center', phone:'865-541-1816', source_status: source_act, source_context: ctrp, email: "dbrown@seattlehealth.com", address: '23 Wheeling Drive', city: 'Seattle', state_province:'Washington', country:usa, postal_code:"123683") #no source id


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

person1 = Person.find_or_create_by(id:1699192, source_id:'33303', source_context: ctep, fname:'Ajeet', lname:'Gajra', prefix:'Dr.', suffix:'', email:'gajraa@upstate.edu', phone:'315-425-2707')
person2 = Person.find_or_create_by(id:7857011, source_id:'518786', source_context: ctrp, fname:'Alicia', lname:'Kunin-Batson', prefix:'Dr.', suffix:'', email:'kunin003@umn.edu', phone:'612-624-6931')
person3 = Person.find_or_create_by(id:3567738, source_id:'515762', source_context: ctep, fname:'Amy', mname:'M.', lname:'Linabery', prefix:'Ms.', suffix:'', email:'devr0053@umn.edu', phone:'612-624-0146')
person4 = Person.find_or_create_by(id:2944806, source_id:'41379', source_context: ctrp, fname:'Amy', mname:'L.', lname:'Jonson', prefix:'Dr.', suffix:'', email:'jonso001@umn.edu', phone:'612-624-2620')
person5 = Person.find_or_create_by(id:1832268, source_id:'34482', source_context: ctep, fname:'Badrinath', mname:'R.', lname:'Konety', prefix:'Dr.', suffix:'', email:'brkonety@umn.edu', phone:'612-624-2620')
person6 = Person.find_or_create_by(id:10161459, source_id:'46120', source_context: ctrp, fname:'Christine', lname:'Holmberg', prefix:'Dr.', suffix:'', email:'christine.holmberg@charite.de', phone:'-1152')
person7 = Person.find_or_create_by(id:366649, source_id:'11640', source_context: ctep, fname:'Christopher', mname:'Yancey', lname:'Thomas', prefix:'Dr.', suffix:'', email:'cythomas@wakehealth.edu', phone:'434-243-6143')
person8 = Person.find_or_create_by(id:2026171, source_id:'35504', source_context: ctrp, fname:'Daniel', mname:'Evan', lname:'Epner', prefix:'Dr.', suffix:'', email:'depner@mdanderson.org', phone:'713-792-3245')
Person.find_or_create_by(source_id:'AB123', source_context: ctep, fname:'Daniel', mname:'Evan', lname:'Epner', prefix:'Dr.', suffix:'', email:'depner@ctep', phone:'123-456-7890', ctrp_id: person8.id)
Person.find_or_create_by(source_id:'098', source_context: nlm, fname:'Daniel', mname:'Evan', lname:'Epner', prefix:'Dr.', suffix:'', email:'depner@nlm', phone:'098-765-4321', ctrp_id: person8.id)
person9 = Person.find_or_create_by(id:672434, source_id:'19844', source_context: ctep, fname:'David', mname:'Marc', lname:'Peereboom', prefix:'Dr.', suffix:'', email:'peerebd@ccf.org', phone:'866-223-8100')
person10 = Person.find_or_create_by(id:1426655, source_id:'15179', source_context: ctrp, fname:'Gisele', lname:'Sarosy', prefix:'Dr.', suffix:'', email:'gsarosy@mail.nih.gov', phone:'800-411-1222')
person11 = Person.find_or_create_by(id:28417522, source_id:'15178', source_context: ctrp, source_status: source_act, fname:'Rachel', lname:'Nusbaum', prefix:'Dr.', suffix:'', email:'rhm23@georgetown.edu', phone:'800-555-1244')
person12 = Person.find_or_create_by(id:1950481, source_id:'15177', source_context: ctrp, source_status: source_act, fname:'Alessandra', lname:'Ferrajol', prefix:'Dr.', suffix:'', email:'aferrajo@mdanderson.org', phone:'800-111-1244')
person13 = Person.find_or_create_by(id:28186245, source_id:'15176', source_context: ctrp, source_status: source_act, fname:'Kristi', lname:'Graves', prefix:'Dr.', suffix:'', email:'kdg9@georgetown.edu', phone:'800-777-1244')
person14 = Person.find_or_create_by(id:3561594, source_id:'15175', source_context: ctrp, source_status: source_act, fname:'Diane', lname:'Roulston', prefix:'Dr.', suffix:'', email:'droulstn@umich.edu', phone:'800-777-1244')
person15 = Person.find_or_create_by(id:1500960, source_id:'15180', source_context: ctrp, source_status: source_act, fname:'James', lname:'Lee', prefix:'Mr.', suffix:'', email:'jal2024@med.cornell.edu', phone:'800-777-1244')


PoAffiliationStatus.find_or_create_by(name: 'Active', code: 'ACTIVE')
PoAffiliationStatus.find_or_create_by(name: 'Inactive', code: 'INACTIVE')

##Families
family1 = Family.find_or_create_by(name: 'Albert Einstein Cancer Center',family_status_id:1,family_type_id:1)#Cancer Center
family2 = Family.find_or_create_by(name: 'Arizona Cancer Center',family_status_id:1,family_type_id:1)#Cancer Center
family3 = Family.find_or_create_by(name: 'David H. Koch Institute for Integrative Cancer Research at MIT',family_status_id:1,family_type_id:4) #Research Center
family4 = Family.find_or_create_by(name: 'NCI Center for Cancer Research (CCR)',family_status_id:1,family_type_id:3) #NIH
family5 = Family.find_or_create_by(name: 'NRG Oncology',family_status_id:1,family_type_id:2)#NCTN
family6 = Family.find_or_create_by(name: 'Yale Cancer Center',family_status_id:2,family_type_id:1)#Cancer Center


## Trials
## Delete existing Trial data
DataImport.delete_trial_data
## Reading and importing Trial related spreadsheets
puts "Parsing Trial Spreadsheet"
DataImport.import_trials
puts "Parsing Milestone Spreadsheet"
DataImport.import_milestones
puts "Parsing Participating Sites Spreadsheet"
DataImport.import_participating_sites


test_users = [ {"username" => "ctrpsuper", "role" => "ROLE_SUPER", "approve" => true},
               {"username" => "ctrpadmin", "role" => "ROLE_SUPER" , "approve" => true},
               {"username" => "ctrpcurator", "role" => "ROLE_CURATOR" , "approve" => true},
               {"username" => "testercurator", "role" => "ROLE_CURATOR" , "approve" => true},
               {"username" => "ctrpro", "role" => "ROLE_RO", "approve" => true},
               {"username" => "ctrptrialsubmitter", "role" => "ROLE_TRIAL-SUBMITTER", "approve" => true},
               {"username" => "ctrpaccrualsubmitter", "role" => "ROLE_ACCRUAL-SUBMITTER", "approve" => true},
               {"username" => "ctrpsitesu", "role" => "ROLE_SITE-SU", "approve" => true},
               {"username" => "ctrpabstractor", "role" => "ROLE_ABSTRACTOR", "approve" => true},
               {"username" => "ctrpabstractorsu", "role" => "ROLE_ABSTRACTOR-SU", "approve" => true}
          ]

test_users.each do |u|
  user = User.find_by_username(u["username"])
  unless user.blank?
    user.role = u["role"]
    user.approved =  u["approve"]
    user.save!
    #puts "Updated role of user = #{user.username}, role = #{user.role}"
  end
end

##Add NCICTRPDEV team
LdapUser.delete_all

charlie = {"email" => "shivece@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Charlie", "last_name" => "Shive" }
mahesh = {"email" => "yelisettim@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Mahesh", "last_name" => "Yelisetti" }
shilpi = {"email" => "singhs10@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Shilpi", "last_name" => "Singh" }
shamim = {"email" => "ahmeds6@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Shamim", "last_name" => "Ahmed" }
murali = {"email" => "dullam@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Murali", "last_name" => "Dulla" }
tony = {"email" => "wangg5@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Tony", "last_name" => "Wang" }
shenpei = {"email" => "wus4@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Shenpei", "last_name" => "Wu" }
sarada = {"email" => "schintal@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Sarada", "last_name" => "Chintala" }
hemant = {"email" => "undalehv@mail.nih.gov", "role" => "ROLE_CURATOR", "first_name" => "Hemant", "last_name" => "Undale" }
radhika = {"email" => "radhika.tekumalla@nih.gov", "role" => "ROLE_SUPER", "first_name" => "Radhika", "last_name" => "Tekumalla"}

ncictrpdev_users = [charlie, mahesh, shilpi, shamim, murali, tony, shenpei, sarada, hemant, radhika]

##Add CTRP Business Analysts

joe = {"email" => "martuccijj@mail.nih.gov", "role" => "ROLE_CURATOR", "first_name" => "Joe", "last_name" => "Martucci" }
jose = {"email" => "galvezjj@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Jose", "last_name" => "Galvez" }
michael = {"email" => "izbickimj@mail.nih.gov", "role" => "ROLE_CURATOR", "first_name" => "Michael", "last_name" => "Izbicki"}
sandy = {"email" => "lightbodysj@mail.nih.gov", "role" => "ROLE_RO", "first_name" => "Sandy", "last_name" => "Lightbody" }
kirsten = {"email" => "larcokl@mail.nih.gov", "role" => "ROLE_CURATOR", "first_name" => "Kirsten", "last_name" => "Larco" }
deb = {"email" => "hopeda@mail.nih.gov", "role" => "ROLE_CURATOR", "first_name" => "Deb", "last_name" => "Hope"  }
susan = {"email" => "nonemakersl@mail.nih.gov", "role" => "ROLE_RO", "first_name" => "Susan", "last_name" => "Nonemaker"  }
sophia = {"email" => "rarhais@mail.nih.gov", "role" => "ROLE_CURATOR", "first_name" => "Sophia", "last_name" => "Rarhai"  }

ba_users = [joe, jose, michael, sandy, kirsten, deb, susan, sophia]

all_users = ncictrpdev_users + ba_users

## Save the users by bypassing validation. We want to save the user without the password
begin
  all_users.each do |u|
    ldap_user = LdapUser.new
    ldap_user.email = u["email"]
    ldap_user.username = u["email"].split("@")[0]
    ldap_user.role = u["role"]
    ldap_user.first_name = u["first_name"]
    ldap_user.last_name = u["last_name"]
    ldap_user.approved = true
    ldap_user.save(validate: false)
    #puts "Saved user = #{ldap_user.username}  role = #{ldap_user.role}"
  end
rescue Exception => e
  Rails.logger.info "Exception thrown #{e.inspect}"
end
