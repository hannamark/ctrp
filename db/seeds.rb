#Static seed data for all environments

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
#DataImport.delete_trial_data
#NameAlias.delete_all
#Organization.delete_all
#Person.delete_all
puts "Begin seeding"

puts "Seeding static members"

SourceContext.find_or_create_by(code: 'CTEP', name: 'CTEP')
SourceContext.find_or_create_by(code: 'CTRP', name: 'CTRP')
SourceContext.find_or_create_by(code: 'NLM', name: 'NLM')
SourceStatus.find_or_create_by(code: 'ACT', name: 'Active')
SourceStatus.find_or_create_by(code: 'PEND', name: 'Pending')
SourceStatus.find_or_create_by(code: 'INACT', name: 'InActive')
SourceStatus.find_or_create_by(code: 'NULLIFIED', name: 'Nullified')
FamilyRelationship.find_or_create_by(code: 'ORG', name: 'Organizational')
FamilyRelationship.find_or_create_by(code: 'AFF', name: 'Affiliation')
InternalSource.find_or_create_by(code: 'CTGI', name: 'ClinicalTrials.gov Import')
InternalSource.find_or_create_by(code: 'CTRP', name: 'CTRP')




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
ProtocolIdOrigin.find_or_create_by(code: 'CDR', name: 'CDR Identifier')
ProtocolIdOrigin.find_or_create_by(code: 'DNCI', name: 'Duplicate NCI Identifier')
ProtocolIdOrigin.find_or_create_by(code: 'ONCT', name: 'Obsolete ClinicalTrials.gov Identifier')
ProtocolIdOrigin.find_or_create_by(code: 'OTH', name: 'Other Identifier')

HolderType.find_or_create_by(code: 'INV', name: 'Investigator')
HolderType.find_or_create_by(code: 'ORG', name: 'Organization')
HolderType.find_or_create_by(code: 'IND', name: 'Industry')
HolderType.find_or_create_by(code: 'NIH', name: 'NIH')
HolderType.find_or_create_by(code: 'NCI', name: 'NCI')

TrialStatus.find_or_create_by(code: 'INR', name: 'In Review')
TrialStatus.find_or_create_by(code: 'APP', name: 'Approved')
TrialStatus.find_or_create_by(code: 'ACT', name: 'Active')
TrialStatus.find_or_create_by(code: 'EBI', name: 'Enrolling by Invitation')
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
ResearchCategory.find_or_create_by(code: 'EXP', name: 'Expanded Access')
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

SubmissionType.find_or_create_by(code: 'ORI', name: 'Original')
SubmissionType.find_or_create_by(code: 'AMD', name: 'Amendment')
SubmissionType.find_or_create_by(code: 'UPD', name: 'Update')

SubmissionSource.find_or_create_by(code: 'CCR', name: 'CCR')
SubmissionSource.find_or_create_by(code: 'CTEP', name: 'CTEP')
SubmissionSource.find_or_create_by(code: 'DCP', name: 'DCP')
SubmissionSource.find_or_create_by(code: 'CCT', name: 'Cancer Center')

SubmissionMethod.find_or_create_by(code: 'REG', name: 'Registery')
SubmissionMethod.find_or_create_by(code: 'BAT', name: 'Batch')
SubmissionMethod.find_or_create_by(code: 'CTI', name: 'ClinicalTrials.gov Import')
SubmissionMethod.find_or_create_by(code: 'PDQ', name: 'PDQ')
SubmissionMethod.find_or_create_by(code: 'GSV', name: 'Grid Service')
SubmissionMethod.find_or_create_by(code: 'RSV', name: 'Rest Service')

SiteRecruitmentStatus.find_or_create_by(code: 'INR', name: 'In Review')
SiteRecruitmentStatus.find_or_create_by(code: 'APP', name: 'Approved')
SiteRecruitmentStatus.find_or_create_by(code: 'ACT', name: 'Active')
SiteRecruitmentStatus.find_or_create_by(code: 'EBI', name: 'Enrolling by Invitation')
SiteRecruitmentStatus.find_or_create_by(code: 'CAC', name: 'Closed to Accrual')
SiteRecruitmentStatus.find_or_create_by(code: 'CAI', name: 'Closed to Accrual and Intervention')
SiteRecruitmentStatus.find_or_create_by(code: 'TCL', name: 'Temporarily Closed to Accrual')
SiteRecruitmentStatus.find_or_create_by(code: 'TCA', name: 'Temporarily Closed to Accrual and Intervention')
SiteRecruitmentStatus.find_or_create_by(code: 'COM', name: 'Complete')
SiteRecruitmentStatus.find_or_create_by(code: 'ACO', name: 'Administratively Complete')
SiteRecruitmentStatus.find_or_create_by(code: 'WIT', name: 'Withdrawn')

Gender.find_or_create_by(code: 'M', name: 'Male')
Gender.find_or_create_by(code: 'F', name: 'Female')
Gender.find_or_create_by(code: 'B', name: 'Both')

StudyClassification.find_or_create_by(code: 'BAV', name: 'Bio-availability')
StudyClassification.find_or_create_by(code: 'BEQ', name: 'Bio-equivalence')
StudyClassification.find_or_create_by(code: 'EFF', name: 'Efficacy')
StudyClassification.find_or_create_by(code: 'NA', name: 'NA')
StudyClassification.find_or_create_by(code: 'PD', name: 'Pharmacodynamics')
StudyClassification.find_or_create_by(code: 'PK', name: 'Pharmacokinetics')
StudyClassification.find_or_create_by(code: 'PKPD', name: 'Pharmacokinetics/dynamics')
StudyClassification.find_or_create_by(code: 'SF', name: 'Safety')
StudyClassification.find_or_create_by(code: 'SFEFF', name: 'Safety/Efficacy')

OutcomeMeasureType.find_or_create_by(code: 'PRI', name: 'Primary')
OutcomeMeasureType.find_or_create_by(code: 'SEC', name: 'Secondary')
OutcomeMeasureType.find_or_create_by(code: 'OTH', name: 'Other Prespecified')

Allocation.find_or_create_by(code: 'NA', name: 'NA')
Allocation.find_or_create_by(code: 'RCT', name: 'Randomized Control Trial')
Allocation.find_or_create_by(code: 'NRT', name: 'Non-Randomized Trial')

InterventionModel.find_or_create_by(code: 'SG', name: 'Single Group')
InterventionModel.find_or_create_by(code: 'PL', name: 'Parallel')
InterventionModel.find_or_create_by(code: 'CO', name: 'Cross-Over')
InterventionModel.find_or_create_by(code: 'FT', name: 'Factorial')

Masking.find_or_create_by(code: 'OP', name: 'Open')
Masking.find_or_create_by(code: 'SB', name: 'Single Blind')
Masking.find_or_create_by(code: 'DB', name: 'Double Blind')

AgeUnit.find_or_create_by(code: 'YR', name: 'Year')
AgeUnit.find_or_create_by(code: 'YRS', name: 'Years')
AgeUnit.find_or_create_by(code: 'MO', name: 'Month')
AgeUnit.find_or_create_by(code: 'MOS', name: 'Months')
AgeUnit.find_or_create_by(code: 'WK', name: 'Week')
AgeUnit.find_or_create_by(code: 'WKS', name: 'Weeks')
AgeUnit.find_or_create_by(code: 'DY', name: 'Day')
AgeUnit.find_or_create_by(code: 'DYS', name: 'Days')
AgeUnit.find_or_create_by(code: 'HR', name: 'Hour')
AgeUnit.find_or_create_by(code: 'HRS', name: 'Hours')
AgeUnit.find_or_create_by(code: 'MN', name: 'Minute')
AgeUnit.find_or_create_by(code: 'MNS', name: 'Minutes')

########### SEEDING STATIC DATA ENDS #######################

########## SEEDING APP SETTINGS BEGINS ##########

AppSetting.find_or_create_by(code: 'FM', name: 'Funding Mechanism List', value: 'see big value', big_value: 'B01,B08,B09,C06,D43,D71,DP1,DP2,DP3,E11,F05,F30,F31,F32,F33,F34,F37,F38,G07,G08,G11,G12,G13,G20,G94,H13,H23,H25,H28,H50,H57,H62,H64,H75,H79,HD4,HR1,HS5,I01,K01,K02,K05,K06,K07,K08,K12,K14,K18,K21,K22,K23,K24,K25,K26,K30,K99,KD1,KL1,KL2,L30,L32,L40,L50,L60,M01,N01,N02,N03,N43,N44,P01,P20,P30,P40,P41,P42,P50,P51,P60,P76,PL1,PN1,PN2,R00,R01,R03,R04,R06,R08,R13,R15,R17,R18,R21,R24,R25,R30,R33,R34,R36,R37,R41,R42,R43,R44,R49,R55,R56,R90,RC1,RC2,RC3,RC4,RL1,RL2,RL5,RL9,RS1,S06,S10,S11,S21,S22,SC1,SC2,SC3,T01,T02,T03,T06,T09,T14,T15,T32,T34,T35,T36,T37,T42,T90,TL1,TU2,U01,U09,U10,U11,U13,U14,U17,U18,U19,U1A,U1Q,U1S,U1T,U1V,U21,U22,U23,U24,U27,U2G,U2R,U30,U32,U34,U36,U38,U41,U42,U43,U44,U45,U47,U48,U49,U50,U51,U52,U53,U54,U55,U56,U57,U58,U59,U60,U61,U62,U65,U66,U75,U79,U81,U82,U83,U84,U87,U88,U90,UA1,UC1,UC2,UC3,UC6,UC7,UD1,UE1,UE2,UG1,UH1,UH2,UH3,UL1,UM1,UR1,UR3,UR6,UR8,US3,US4,UT1,UT2,VF1,X01,X02,X06,X98,Y01,Y02,Z01,Z02,Z1A')

AppSetting.find_or_create_by(code: 'IC', name: 'Institute Code List', value: 'see big value', big_value: 'AA,AE,AF,AG,AI,AM,AO,AR,AT,BC,BX,CA,CB,CD,CE,CH,CI,CK,CL,CM,CN,CO,CP,CR,CT,CU,CX,DA,DC,DD,DE,DK,DP,EB,EH,EM,EP,ES,EY,FD,GD,GH,GM,GW,HB,HC,HD,HG,HI,HK,HL,HM,HO,HP,HR,HS,HV,HX,HY,IP,JT,LM,MD,MH,MN,NB,NH,NR,NS,NU,OA,OC,OD,OF,OH,OL,OR,PC,PH,PR,PS,RC,RD,RG,RM,RR,RX,SC,SF,SH,SM,SP,SU,TI,TP,TR,TS,TW,VA,WC,WH,WT')

AppSetting.find_or_create_by(code: 'NCI', name: 'NCI Division/Program Code List', value: 'see big value', big_value: 'CCR,CCT/CTB,CIP,CDP,CTEP,DCB,DCCPS,DCEG,DCP,DEA,DTP,OD,OSB/SPOREs,TRP,RRP,N/A')

AppSetting.find_or_create_by(code: 'NIH', name: 'NIH Institution Code List', value: 'see big value', big_value: 'NEI-National Eye Institute;NHLBI-National Heart, Lung, and Blood Institute;NHGRI-National Human Genome Research Institute;NIA-National Institute on Aging;NIAA-National Institute on Alcohol Abuse and Alcoholism;NIAID-National Institute of Allergy and Infectious Diseases;NIAMS-National Institute of Arthritis and Musculoskeletal and Skin Diseases;NIBIB-National Institute of Biomedical Imaging and Bioengineering;NICHD-NICHD-Eunice Kennedy Shriver National Institute of Child Health and Human Development;NIDCD-National Institute on Deafness and Other Communication Disorders;NIDCR-National Institute of Dental and Craniofacial Research;NIDDK-National Institute of Diabetes and Digestive and Kidney Diseases;NIDA-National Institute on Drug Abuse;NIEHS-National Institute of Environmental Health Sciences;NIGMS-National Institute of General Medical Sciences;NIMH-National Institute of Mental Health;NINDS-National Institute of Neurological Disorders and Stroke;NINR-National Institute of Nursing Research;NLM-National Library of Medicine;CIT-Center for Information Technology;CSR-Center for Scientific Review;FIC-John E. Fogarty International Center for Advanced Study in the Health Sciences;NCCAM-National Center for Complementary and Alternative Medicine;NCMHD-National Center on Minority Health and Health Disparities;NCRR-National Center for Research Resources (NCRR);CC-NIH Clinical Center;OD-Office of the Director')

AppSetting.find_or_create_by(code: 'ACCEPTED_FILE_TYPES', name: 'Accepted File Types', value: 'pdf,doc,docx,xls,xlsx,zip,gz', big_value: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/zip, application/x-gzip')

AppSetting.find_or_create_by(code: 'NIH_NCI_DIV_PA', name: 'NCI Division/Department Code List for PA', value: 'see big value', big_value: 'CCR,CTEP,DCP,NHBLI')

AppSetting.find_or_create_by(code: 'NIH_NCI_PROG_PA', name: 'NCI Division/Program Code List for PA', value: 'see big value', big_value: 'BIQSFP,SPORE,Steering_Commitee_Reviewed')

trial_status_transition = '{
                             "STATUSZERO": {
                               "INR": {"valid": "Yes"},
                               "APP": {"warnings": [{"status": "INR"}]},
                               "WIT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "ACT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "EBI": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
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
                               "EBI": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
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
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "EBI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Duplicate"}]},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
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
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
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
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Duplicate"}]}
                             }
                           }'

AppSetting.find_or_create_by(code: 'TRIAL_STATUS_TRANSITION', name: 'Trial Status Transition Matrix', value: 'see big value', big_value: trial_status_transition)

sr_status_transition = '{
                             "STATUSZERO": {
                               "INR": {"valid": "Yes"},
                               "APP": {"warnings": [{"status": "INR"}]},
                               "WIT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "ACT": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
                               "EBI": {"warnings": [{"status": "INR"}, {"status": "APP"}]},
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
                               "EBI": {"warnings": [{"status": "APP"}], "sameDay": "Yes"},
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
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"valid": "Yes", "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "EBI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Duplicate"}]},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
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
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
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
                               "EBI": {"valid": "Yes", "sameDay": "Yes"},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
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
                               "EBI": {"errors": [{"message": "Invalid Transition"}]},
                               "CAC": {"errors": [{"message": "Invalid Transition"}]},
                               "CAI": {"errors": [{"message": "Invalid Transition"}]},
                               "TCL": {"errors": [{"message": "Invalid Transition"}]},
                               "TCA": {"errors": [{"message": "Invalid Transition"}]},
                               "COM": {"errors": [{"message": "Invalid Transition"}]},
                               "ACO": {"errors": [{"message": "Duplicate"}]}
                             }
                           }'

AppSetting.find_or_create_by(code: 'SR_STATUS_TRANSITION', name: 'Site Recruitment Status Transition Matrix', value: 'see big value', big_value: sr_status_transition)

AppSetting.find_or_create_by(code: 'CLINICAL_TRIALS_IMPORT_URL', name: 'ClinicalTrials.gov import URL', value: 'https://clinicaltrials.gov/show/NCT********?displayxml=true')

########## SEEDING APP SETTINGS ENDS ##########

puts "Seeding ldap and local users"
#Add LDAP and local test users
#Need dummy org for LDAP users
  org0 = Organization.find_or_create_by( id: 9999999,
                                         source_id: '9999999',
                                         name: 'ZZZ test org for test accounts',
                                         phone:'240-276-0000',
                                         source_status: SourceStatus.find_by_code("ACT"),
                                         source_context: SourceContext.find_by_code('CTRP'),
                                         address: '9605 Medical Center Dr',
                                         city: 'Rockville',
                                         state_province: 'Maryland',
                                         country: 'United States',
                                         postal_code: '20850',
                                         email: "ncictrpdev@mail.nih.gov"
  )
ctep = Organization.find_or_create_by( id: 9999998,
                                       source_id: '9999998',
                                       name: 'organization for restfulservices',
                                       phone:'240-276-0001',
                                       source_status: SourceStatus.find_by_code("ACT"),
                                       source_context: SourceContext.find_by_code('CTEP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

test_users = [ {"username" => "ctrpsuper", "role" => "ROLE_SUPER", "approve" => true},
               {"username" => "ctrpadmin", "role" => "ROLE_SUPER" , "approve" => true},
               {"username" => "ctrpcurator", "role" => "ROLE_CURATOR" , "approve" => true},
               {"username" => "testercurator", "role" => "ROLE_CURATOR" , "approve" => true},
               {"username" => "ctrpro", "role" => "ROLE_RO", "approve" => true},
               {"username" => "ctrptrialsubmitter", "role" => "ROLE_TRIAL-SUBMITTER", "approve" => true},
               {"username" => "ctrptrialsubmitter2", "role" => "ROLE_TRIAL-SUBMITTER", "approve" => true},
               {"username" => "ctrptrialsubmitter3", "role" => "ROLE_TRIAL-SUBMITTER", "approve" => true},
               {"username" => "ctrpaccrualsubmitter", "role" => "ROLE_ACCRUAL-SUBMITTER", "approve" => true},
               {"username" => "ctrpsitesu", "role" => "ROLE_SITE-SU", "approve" => true},
               {"username" => "ctrpabstractor", "role" => "ROLE_ABSTRACTOR", "approve" => true},
               {"username" => "ctrpabstractorsu", "role" => "ROLE_ABSTRACTOR-SU", "approve" => true},
               {"username" => "ctepservice", "role" => "ROLE_SERVICE-REST", "approve" => true}

]

test_users.each do |u|
  user = User.find_by_username(u["username"])
  unless user.blank?
    user.role = u["role"]
    user.approved =  u["approve"]
    unless user.role == "ROLE_ADMIN" || user.role == "ROLE_SUPER" || user.role == "ROLE_SERVICE-REST"
      user.organization = org0
    end
    if user.role == "ROLE_SERVICE-REST"
      user.organization = ctep
    end
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
radhika = {"email" => "tekumall@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Radhika", "last_name" => "Tekumalla"}
vasu = {"email" => "nalluruvn@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Vasu", "last_name" => "Nalluru"}
barry = {"email" => "alkisbd@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Barry", "last_name" => "Alkis"}


ncictrpdev_users = [charlie, mahesh, shilpi, shamim, murali, tony, shenpei, sarada, hemant, radhika, vasu, barry]

##Add CTRP Business Analysts

joe = {"email" => "martuccijj@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Joe", "last_name" => "Martucci" }
michael = {"email" => "izbickimj@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Michael", "last_name" => "Izbicki"}
sandy = {"email" => "lightbodysj@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Sandy", "last_name" => "Lightbody" }
susan = {"email" => "nonemakersl@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Susan", "last_name" => "Nonemaker"  }
sophia = {"email" => "rarhais@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Sophia", "last_name" => "Rarhai"  }

ba_users = [joe, michael, sandy, susan, sophia]

##Add CTRO and Curator users

stephanie = {"email" => "whitleys@mail.nih.gov", "role" => "ROLE_ABSTRACTOR-SU", "first_name" => "Stephanie", "last_name" => "Whitley" }
kirsten = {"email" => "larcokl@mail.nih.gov", "role" => "ROLE_CURATOR", "first_name" => "Kirsten", "last_name" => "Larco" }
andrea = {"email" => "mooreaj@mail.nih.gov", "role" => "ROLE_ABSTRACTOR-SU", "first_name" => "Andrea", "last_name" => "Moore" }
graysonra = {"email" => "graysonra@mail.nih.gov", "role" => "ROLE_ABSTRACTOR-SU", "first_name" => "Rachel", "last_name" => "Grayson" }

ctro_users = [stephanie, kirsten, andrea, graysonra]

#Add Fed users

jose = {"email" => "galvezjj@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Jose", "last_name" => "Galvez" }
gene = {"email" => "krausg@mail.nih.gov", "role" => "ROLE_SUPER", "first_name" => "Gene", "last_name" => "Kraus" }

fed_users = [jose, gene]

all_users = ncictrpdev_users + ba_users + ctro_users + fed_users

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
    ldap_user.organization = org0
    ldap_user.save(validate: false)
    #puts "Saved user = #{ldap_user.username}  role = #{ldap_user.role}"
  end
rescue Exception => e
  Rails.logger.info "Exception thrown #{e.inspect}"
end


#Line to include seeds from passed environment variable
puts "Begin seeding environment-specfic data"
load(Rails.root.join( 'db', 'seeds', "#{Rails.env.downcase}.rb"))
puts "Seeding complete"