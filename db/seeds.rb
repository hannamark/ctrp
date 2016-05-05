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

StudySource.find_or_create_by(code: 'NAT', name: 'National')
StudySource.find_or_create_by(code: 'EPR', name: 'Externally Peer-Reviewed')
StudySource.find_or_create_by(code: 'INS', name: 'Institutional')
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

TimePerspective.find_or_create_by(code: 'PRO', name: 'Prospective')
TimePerspective.find_or_create_by(code: 'RET', name: 'Retrospective')
TimePerspective.find_or_create_by(code: 'CRO', name: 'Cross sectional')
TimePerspective.find_or_create_by(code: 'OTH', name: 'Other')

BiospecimenRetention.find_or_create_by(code: 'NONE', name: 'None Retained')
BiospecimenRetention.find_or_create_by(code: 'SDNA', name: 'Samples With DNA')
BiospecimenRetention.find_or_create_by(code: 'SNODNA', name: 'Samples Without DNA')

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
TrialStatus.find_or_create_by(code: 'WIT', name: 'Withdrawn')
TrialStatus.find_or_create_by(code: 'ACO', name: 'Administratively Complete')
TrialStatus.find_or_create_by(code: 'COM', name: 'Complete')
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

Milestone.find_or_create_by(code: 'SRD', name: 'Submission Received Date')
Milestone.find_or_create_by(code: 'SAC', name: 'Submission Acceptance Date')
Milestone.find_or_create_by(code: 'STR', name: 'Submission Terminated Date')
Milestone.find_or_create_by(code: 'SRE', name: 'Submission Reactivated Date')
Milestone.find_or_create_by(code: 'SRJ', name: 'Submission Rejection Date')
Milestone.find_or_create_by(code: 'VPS', name: 'Validation Processing Start Date')
Milestone.find_or_create_by(code: 'VPC', name: 'Validation Processing Completed Date')
Milestone.find_or_create_by(code: 'RVQ', name: 'Ready for Validation QC Date')
Milestone.find_or_create_by(code: 'VQS', name: 'Validation QC Start Date')
Milestone.find_or_create_by(code: 'VQC', name: 'Validation QC Completed Date')
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
Milestone.find_or_create_by(code: 'ONG', name: 'On-going Abstraction Verified Date')
Milestone.find_or_create_by(code: 'LRD', name: 'Late Rejection Date')

MilestoneType.find_or_create_by(code: 'ADM', name: 'Administrative')
MilestoneType.find_or_create_by(code: 'SCI', name: 'Scientific')
MilestoneType.find_or_create_by(code: 'GEN', name: 'General')

SubmissionType.find_or_create_by(code: 'ORI', name: 'Original')
SubmissionType.find_or_create_by(code: 'AMD', name: 'Amendment')
SubmissionType.find_or_create_by(code: 'UPD', name: 'Update')

SubmissionSource.find_or_create_by(code: 'CCR', name: 'CCR')
SubmissionSource.find_or_create_by(code: 'CTEP', name: 'CTEP')
SubmissionSource.find_or_create_by(code: 'DCP', name: 'DCP')
SubmissionSource.find_or_create_by(code: 'CCT', name: 'Cancer Center')

SubmissionMethod.find_or_create_by(code: 'REG', name: 'Registry')
SubmissionMethod.find_or_create_by(code: 'BAT', name: 'Batch')
SubmissionMethod.find_or_create_by(code: 'CTI', name: 'ClinicalTrials.gov Import')
SubmissionMethod.find_or_create_by(code: 'GSV', name: 'Grid Service')
SubmissionMethod.find_or_create_by(code: 'RSV', name: 'REST Service')
SubmissionMethod.find_or_create_by(code: 'OTHER', name: 'Other')

SiteRecruitmentStatus.find_or_create_by(code: 'INR', name: 'In Review')
SiteRecruitmentStatus.find_or_create_by(code: 'APP', name: 'Approved')
SiteRecruitmentStatus.find_or_create_by(code: 'ACT', name: 'Active')
SiteRecruitmentStatus.find_or_create_by(code: 'EBI', name: 'Enrolling by Invitation')
SiteRecruitmentStatus.find_or_create_by(code: 'CAC', name: 'Closed to Accrual')
SiteRecruitmentStatus.find_or_create_by(code: 'CAI', name: 'Closed to Accrual and Intervention')
SiteRecruitmentStatus.find_or_create_by(code: 'TCL', name: 'Temporarily Closed to Accrual')
SiteRecruitmentStatus.find_or_create_by(code: 'TCA', name: 'Temporarily Closed to Accrual and Intervention')
SiteRecruitmentStatus.find_or_create_by(code: 'WIT', name: 'Withdrawn')
SiteRecruitmentStatus.find_or_create_by(code: 'ACO', name: 'Administratively Complete')
SiteRecruitmentStatus.find_or_create_by(code: 'COM', name: 'Complete')

Gender.find_or_create_by(code: 'M', name: 'Male')
Gender.find_or_create_by(code: 'F', name: 'Female')
Gender.find_or_create_by(code: 'B', name: 'Both')

InterventionType.find_or_create_by(code: 'DRUG', name: 'Drug', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'DEVI', name: 'Device', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'BIOL', name: 'Biological/Vaccine', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'PROC', name: 'Procedure/Surgery', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'RAD', name: 'Radiation', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'BEHA', name: 'Behavioral', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'GENE', name: 'Genetic', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'DSUP', name: 'Dietary Supplement', category: 'clinicaltrials.gov')
InterventionType.find_or_create_by(code: 'OTH', name: 'Other', category: 'clinicaltrials.gov')

InterventionType.find_or_create_by(code: 'DRUGC', name: 'Drug', category: 'cancer.gov')
InterventionType.find_or_create_by(code: 'PROCC', name: 'Procedure/Surgery', category: 'cancer.gov')
InterventionType.find_or_create_by(code: 'GENEC', name: 'Genetic', category: 'cancer.gov')
InterventionType.find_or_create_by(code: 'OTHC', name: 'Other', category: 'cancer.gov')

NcitStatus.find_or_create_by(code:'ACT',name:'Active')
NcitStatus.find_or_create_by(code:'INA',name:'Inactive')

## seed 40 NcitIntervention records
act = NcitStatus.find_by_code('ACT')
NcitIntervention.create(preferred_name: 'Zafuleptine', synonyms:  'ZAFULEPTINE; Zafuleptine', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: '18F-Fluoromisonidazole', synonyms:  '18F-Fluoromisonidazole; 18F-MISO; 18F-MISO; 18F-Misonidazole; 18F-fluoromisonidazole; FMISO; FMISO', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zaldaride', synonyms:  'ZALDARIDE; Zaldaride', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zaleplon', synonyms:  'Sonata; ZALEPLON; Zaleplon', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zalospirone Hydrochloride', synonyms:  'ZALOSPIRONE HYDROCHLORIDE; Zalospirone Hydrochloride', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zaltoprofen', synonyms:  'ZALTOPROFEN; Zaltoprofen', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zalutumumab', synonyms:  'HuMax-EGFr, 2F8; Zalutumumab', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zamifenacin', synonyms:  '(R)-3-(Diphenylmethoxy)-1-(3,4-(methylenedioxy)phenethyl)piperidine; ZAMIFENACIN; Zamifenacin', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zanamivir', synonyms:  '4-Guanidino-2,4-dideoxy-2,3-dehydro-N-acetylneuraminic Acid; 5-Acetamido-2,6-anhydro-3,4,5-trideoxy-4-guanidino-D-glycero-D-galacto-non-2-enonic Acid; GANA; GG 167; Relenza; Relenza; ZANAMIVIR; Zanamivir; zanamivir', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zanapezil', synonyms:  'ZANAPEZIL; Zanapezil', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zankiren', synonyms:  '(S)-N-((1S,2R,3S)-1-(Cyclohexylmethyl)-2,3-Dihydroxy-5-Methylhexyl)-Alpha((Alpha-S)-Alpha(((4-Methyl-1-Piperazinyl)Sulfonyl)Methyl)Hydrocinnamamido)-4-Thiazolepropionamide; 4-Thiazolepropanamide, N-(1-(Cyclohexylmethyl)-2,3-Dihydroxy-5-Methylhexyl)-Alpha-((2-(((4-Methyl-1-Piperazinyl)Sulfonyl)Methyl)-1-Oxo-3-Phenylpropyl)Amino)-, (1S-(1R*,(R*(R*)),2S*,3R*))-; ZANKIREN; Zankiren', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zankiren Hydrochloride', synonyms:  '(S)-N-((1S,2R,3S)-1-(Cyclohexylmethyl)-2,3-Dihydroxy-5-Methylhexyl)-Alpha((Alpha-S)-Alpha-(((4-Methyl-1-Piperazinyl)Sulfonyl)Methyl)Hydrocinnamamido)-4-Thiazolepropionamide Monohydrochloride; 4-Thiazolepropanamide, N-(1-(Cyclohexylmethyl)-2,3-Dihydroxy-5-Methylhexyl)-Alpha-((2-(((4-Methyl-1-Piperazinyl)Sulfonyl)Methyl)-1-Oxo-3-Phenylpropyl)Amino)-, Monohydrochloride, (1S-(1R*,(R*(R*)),2S*,3R*))-; ABBOTT-72517; ZANKIREN HYDROCHLORIDE; Zankiren Hydrochloride', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zanolimumab', synonyms:  'Anti-CD4 Monoclonal Antibody HuMax; HuMax-CD4; ZANOLIMUMAB; Zanolimumab', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zanoterone', synonyms:  'ZANOTERONE; Zanoterone', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zapizolam', synonyms:  'ZAPIZOLAM; Zapizolam', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zaprinast', synonyms:  'ZAPRINAST; Zaprinast', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zardaverine', synonyms:  'ZARDAVERINE; Zardaverine', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zatebradine', synonyms:  'UL-FS49; ZATEBRADINE; Zatebradine', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zatosetron', synonyms:  '5-Chloro-2,3-Dihydro-2,2-Dimethyl-N-1Alpha-H,5Alpha-H-Tropan-3Alpha-yl-7-Benzofurancarboxamide; 7-Benzofurancarboxamide, 5-Chloro-2,3-Dihydro-2,2-Dimethyl-N-(8-Methyl-8-Azabicyclo(3.2.1)Oct-3-yl)-, Endo-; LY-277359; LY277359; ZATOSETRON; Zatosetron', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zatosetron Maleate', synonyms:  '7-Benzofurancarboxamide, 5-Chloro-2,3-Dihydro-2,2-Dimethyl-N-(8-Methyl-8-Azabicyclo(3.2.1)Oct-3-yl)-, Endo-, (Z)-2-Butenedioate (1:1); LY-277359 Maleate; LY277359 Maleate; ZATOSETRON MALEATE; Zatosetron Maleate', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zaurategrast', synonyms:  'ZAURATEGRAST; Zaurategrast', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zea mays Pollen', synonyms:  'ZEA MAYS POLLEN; Zea mays Pollen', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zeaxanthin', synonyms:  '4-[18-(4-hydroxy-2,6,6-trimethyl-1-cyclohexenyl)-3,7,12,16-tetramethyl-octadeca-1,3,5,7,9,11,13,15,17-nonaenyl]-3,5,5-trimethyl-cyclohex-3-en-1-ol; ZEAXANTHIN; Zeaxanthin; Zeaxanthin', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zebularine', synonyms:  '1-beta-D-Ribofuranosyl-2(1H)-pyrimidinone; 2-Pyrimidone-1-beta-D-riboside; Pyrimidin-2-one beta-Ribofuranoside; Zebularine; Zebularine', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zedoary Oil', synonyms:  'ZEDOARY OIL; Zedoary Oil', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zein', synonyms:  'ZEIN; Zein', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zelandopam', synonyms:  'ZELANDOPAM; Zelandopam', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zenarestat', synonyms:  'ZENARESTAT; Zenarestat', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zenazocine Mesylate', synonyms:  '(+/-)-1-((2R*,6S*,11s*)-1,2,3,4,5,6-Hexahydro-8-Hydroxy-3,6,11-Trimethyl-2,6-Methano-3-Benzazocin-11-Yl)-6-Methyl-3-Heptanone Methanesulfonate (Salt); 3-Heptanone, 1-(1,2,3,4,5,6-Hexahydro-8-Hydroxy-3,6,11-Trimethyl-2,6-Methano-3-Benzazocin-11-Yl)-6-Methyl-, (2Alpha,6Alpha,11s*)-(+/-)-, Methanesulfonate (Salt); WIN 42964-4; ZENAZOCINE MESYLATE; Zenazocine Mesylate', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zeniplatin', synonyms:  'CL 286,558; ZENIPLATIN; Zeniplatin; cis-(2,2-Bis(aminomethyl)-1,3-propanediol)(1,1-cyclobutanedicarboxylato)platinum', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zepastine', synonyms:  'ZEPASTINE; Zepastine', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zeranol', synonyms:  'ZERANOL; Zeranol', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zetidoline', synonyms:  'ZETIDOLINE; Zetidoline', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zhongyao Fufang', synonyms:  'Zhongyao Fufang; Zhongyaofufang', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Ziconotide', synonyms:  'Prialt; Prialt; SNX 111; SNX-111; ZICONOTIDE; Ziconotide; ziconotide', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Ziconotide Acetate', synonyms:  'Cys-Lys-Gly-Lys-Gly-Ala-Lys-Cys-Ser-Arg-Leu-Met-Tyr-Asp-Cys-Cys-Thr-Gly-Ser-Cys-Arg-Ser-Gly-Lys-Cys-Nh2 Acetate; Omega-Conotoxin M VIIa Acetate; SNX-111 Acetate; ZICONOTIDE ACETATE; Ziconotide Acetate', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zidapamide', synonyms:  'ZIDAPAMIDE; Zidapamide', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zidometacin', synonyms:  'ZIDOMETACIN; Zidometacin', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zifrosilone', synonyms:  'ZIFROSILONE; Zifrosilone', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)
NcitIntervention.create(preferred_name: 'Zirconium Zr 89 Trastuzumab', synonyms:  '89Zr-Trastuzumab; Zirconium Zr 89 Trastuzumab', description: nil, type_code: nil, ct_gov_type_code: nil, ncit_status: act)


StudyClassification.find_or_create_by(code: 'SAFE', name: 'Safety')
StudyClassification.find_or_create_by(code: 'EFFI', name: 'Efficacy')
StudyClassification.find_or_create_by(code: 'SAEF', name: 'Safety/Efficacy')
StudyClassification.find_or_create_by(code: 'BAV', name: 'Bioavailability')
StudyClassification.find_or_create_by(code: 'BEQ', name: 'Bioequivalence')
StudyClassification.find_or_create_by(code: 'PD', name: 'Pharmacodynamics')
StudyClassification.find_or_create_by(code: 'PKPD', name: 'Pharmacokinetics/Pharmacodynamics')
StudyClassification.find_or_create_by(code: 'NA', name: 'NA')

StudyModel.find_or_create_by(code: 'COH', name: 'Cohort')
StudyModel.find_or_create_by(code: 'CASECO', name: 'Case-control')
StudyModel.find_or_create_by(code: 'CASEON', name: 'Case-only')
StudyModel.find_or_create_by(code: 'CASECR', name: 'Case-crossover')
StudyModel.find_or_create_by(code: 'EORCS', name: 'Ecologic or Community Studies')
StudyModel.find_or_create_by(code: 'FAMB', name: 'Family-based')
StudyModel.find_or_create_by(code: 'OTH', name: 'Other')

OutcomeMeasureType.find_or_create_by(code: 'PRI', name: 'Primary')
OutcomeMeasureType.find_or_create_by(code: 'SEC', name: 'Secondary')
OutcomeMeasureType.find_or_create_by(code: 'OTH', name: 'Other Pre-specified')

Allocation.find_or_create_by(code: 'NA', name: 'NA')
Allocation.find_or_create_by(code: 'RCT', name: 'Randomized Controlled Trial')
Allocation.find_or_create_by(code: 'NRT', name: 'Non-Randomized Trial')

InterventionModel.find_or_create_by(code: 'SG', name: 'Single Group')
InterventionModel.find_or_create_by(code: 'PL', name: 'Parallel')
InterventionModel.find_or_create_by(code: 'CO', name: 'Cross-Over')
InterventionModel.find_or_create_by(code: 'FT', name: 'Factorial')

Masking.find_or_create_by(code: 'OP', name: 'Open')
Masking.find_or_create_by(code: 'SB', name: 'Single Blind')
Masking.find_or_create_by(code: 'DB', name: 'Double Blind')

# AgeUnit.find_or_create_by(code: 'YR', name: 'Year')
AgeUnit.find_or_create_by(code: 'YRS', name: 'Years')
# AgeUnit.find_or_create_by(code: 'MO', name: 'Month')
AgeUnit.find_or_create_by(code: 'MOS', name: 'Months')
# AgeUnit.find_or_create_by(code: 'WK', name: 'Week')
AgeUnit.find_or_create_by(code: 'WKS', name: 'Weeks')
# AgeUnit.find_or_create_by(code: 'DY', name: 'Day')
AgeUnit.find_or_create_by(code: 'DYS', name: 'Days')
# AgeUnit.find_or_create_by(code: 'HR', name: 'Hour')
AgeUnit.find_or_create_by(code: 'HRS', name: 'Hours')
# AgeUnit.find_or_create_by(code: 'MN', name: 'Minute')
AgeUnit.find_or_create_by(code: 'MNS', name: 'Minutes')

AmendmentReason.find_or_create_by(code: 'AS', name: 'Acknowledged Scientific')
AmendmentReason.find_or_create_by(code: 'AA', name: 'Acknowledged Administrative')
AmendmentReason.find_or_create_by(code: 'AAS', name: 'Acknowledged Administrative and Scientific')

AnatomicSite.find_or_create_by(code:'AN', name: 'Anus')
AnatomicSite.find_or_create_by(code:'BJ', name: 'Bones and Joints')
AnatomicSite.find_or_create_by(code:'BN', name: 'Brain and Nervous System')
AnatomicSite.find_or_create_by(code:'BF', name: 'Breast - Female')
AnatomicSite.find_or_create_by(code:'BM', name: 'Breast - Male')
AnatomicSite.find_or_create_by(code:'CE', name: 'Cervix')
AnatomicSite.find_or_create_by(code:'CO', name: 'Colon')
AnatomicSite.find_or_create_by(code:'CU', name: 'Corpus Uteri')
AnatomicSite.find_or_create_by(code:'ES', name: 'Esophagus')
AnatomicSite.find_or_create_by(code:'ET', name: 'Eye and Orbit')
AnatomicSite.find_or_create_by(code:'HL', name: "Hodgkin's Lymphoma")
AnatomicSite.find_or_create_by(code:'IS', name: 'Ill-Defined Sites')
AnatomicSite.find_or_create_by(code:'KA', name: "Kaposi's Sarcoma")
AnatomicSite.find_or_create_by(code:'KI', name: "Kidney")
AnatomicSite.find_or_create_by(code:'LA', name: 'Larynx')
AnatomicSite.find_or_create_by(code:'LN', name: 'Leukemia, not otherwise specified')
AnatomicSite.find_or_create_by(code:'LO', name: 'Leukemia, other')
AnatomicSite.find_or_create_by(code:'LP', name: 'Lip, Oral Cavity and Pharynx')
AnatomicSite.find_or_create_by(code:'LR', name: 'Liver')
AnatomicSite.find_or_create_by(code:'LU', name: 'Lung')
AnatomicSite.find_or_create_by(code:'LY', name: 'Lymphoid Leukemia')
AnatomicSite.find_or_create_by(code:'ME', name: 'Melanoma, Skin')
AnatomicSite.find_or_create_by(code:'ML', name: 'Multiple')
AnatomicSite.find_or_create_by(code:'MM', name: 'Multiple Myeloma')
AnatomicSite.find_or_create_by(code:'MY', name: 'Mycosis Fungoides')
AnatomicSite.find_or_create_by(code:'MZ', name: 'Myeloid and Monocyte Leukemia')
AnatomicSite.find_or_create_by(code:'NL', name: "Non-Hodgkin's Lymphoma")
AnatomicSite.find_or_create_by(code:'OD', name: "Other Digestive Organ")
AnatomicSite.find_or_create_by(code:'OE', name: "Other Endocrine System")
AnatomicSite.find_or_create_by(code:'OF', name: "Other Female Genital")
AnatomicSite.find_or_create_by(code:'OH', name: "Other Hematopoietic")
AnatomicSite.find_or_create_by(code:'OM', name: "Other Male Genital")
AnatomicSite.find_or_create_by(code:'OR', name: "Other Respiratory/Intrathoracic Organs")
AnatomicSite.find_or_create_by(code:'OS', name: "Other Skin")
AnatomicSite.find_or_create_by(code:'OU', name: "Other Urinary")
AnatomicSite.find_or_create_by(code:'OV', name: "Ovary")
AnatomicSite.find_or_create_by(code:'PA', name: "Pancreas")
AnatomicSite.find_or_create_by(code:'PR', name: "Prostate")
AnatomicSite.find_or_create_by(code:'RE', name: "Rectum")
AnatomicSite.find_or_create_by(code:'SI', name: "Small Intestine")
AnatomicSite.find_or_create_by(code:'SO', name: "Soft Tissue / Sarcoma")
AnatomicSite.find_or_create_by(code:'ST', name: "Stomach")
AnatomicSite.find_or_create_by(code:'TH', name: "Thyroid")
AnatomicSite.find_or_create_by(code:'UM', name: "Unknown Sites")
AnatomicSite.find_or_create_by(code:'UR', name: "Urinary Bladder")

UserStatus.find_or_create_by(code: 'INR', name: 'In Review')
UserStatus.find_or_create_by(code: 'ACT', name: 'Active')
UserStatus.find_or_create_by(code: 'INA', name: 'Inactive')
UserStatus.find_or_create_by(code: 'DEL', name: 'Deleted')


### MARKER STATIC DATA

CadsrMarkerStatus.find_or_create_by(code: 'ACT', name: 'Active')
CadsrMarkerStatus.find_or_create_by(code: 'INA', name: 'Inactive')

##### Here ids are important to given statically to display codes in a specific order on front end
AssayType.find_or_create_by(id:21,  code:  'Other' , name:'Other')
AssayType.find_or_create_by(id:16,  code:  'HPLC' , name:'High Performance Liquid Chromatography')
AssayType.find_or_create_by(id:5,   code:  'Immunohistochemistry (IHC)' , name:'Immunohistochemistry Staining Method')
AssayType.find_or_create_by(id:6,   code:  'Western Blot (Immunoblot)' , name:'Western Blotting')
AssayType.find_or_create_by(id:10,  code:  'ELISPOT' , name:'Enzyme-linked Immunosorbent Spot Assay')
AssayType.find_or_create_by(id:17,  code:  'RT-PCR' , name:'RT-PCR')
AssayType.find_or_create_by(id:12,  code:  'Cytotoxicity Assay' , name:'Cytotoxicity Assay')
AssayType.find_or_create_by(id:8,   code:  'Sequencing' , name:'Nucleic Acid Sequencing')
AssayType.find_or_create_by(id:18,  code:  'Multiplex Immunoassay' , name:'Multiple Immunologic Technique')
AssayType.find_or_create_by(id:11,  code:  'Proliferation Assay' , name:'Proliferation Assay')
AssayType.find_or_create_by(id:20,  code:  'Unspecified' , name:'Unspecified')
AssayType.find_or_create_by(id:13,  code:  'Mass Spectrometry' , name:'Mass Spectrometry')
AssayType.find_or_create_by(id:19,  code:  'Real-Time PCR (quantitative PCR)' , name:'Real Time PCR')
AssayType.find_or_create_by(id:3,   code:  'Microarray' , name:'Microarray')
AssayType.find_or_create_by(id:4,   code:  'ELISA' , name:'ELISA')
AssayType.find_or_create_by(id:7,   code:  'Flow Cytometry' , name:'Flow Cytometry')
AssayType.find_or_create_by(id:2,   code:  'In Situ Hybridization' , name:'in situ Hybridization')
AssayType.find_or_create_by(id:14,  code:  'TUNEL assay' , name:'TdT-Mediated dUTP Nick End Labeling Assay')
AssayType.find_or_create_by(id:1,   code:  'PCR' , name:'Polymerase Chain Reaction')
AssayType.find_or_create_by(id:9,   code:  'Microscopy/Imaging' , name:'Microscopy Imaging Technique')
AssayType.find_or_create_by(id:15,  code:  'Real-Time RT-PCR (qRT-PCR)' , name:'Quantitative Reverse Transcriptase PCR')

EvaluationType.find_or_create_by(id:16, code:  'Other', name:  'Other')
EvaluationType.find_or_create_by(id:9,  code: 'Acetylation', name:  'Acetylation')
EvaluationType.find_or_create_by(id:11,  code: 'Loss of Heterozygosity (LOH)', name:  'Loss of Heterozygosity')
EvaluationType.find_or_create_by(id:7,  code: 'Phosphorylation', name:  'Phosphorylation Process')
EvaluationType.find_or_create_by(id:6,  code: 'Proteolytic Cleavage', name:  'Protein Cleavage')
EvaluationType.find_or_create_by(id:5,  code: 'Protein Activity', name:  'Protein or Enzyme Activity')
EvaluationType.find_or_create_by(id:4,  code: 'Subtyping', name:  'Subtype')
EvaluationType.find_or_create_by(id:3,  code: 'Cell Functionality', name:  'Cell Function')
EvaluationType.find_or_create_by(id:2,  code: 'Genetic Analysis', name:  'Genetic Testing')
EvaluationType.find_or_create_by(id:1,  code: 'Level/Quantity', name:  'Level Quantity Value')
EvaluationType.find_or_create_by(id:12, code: 'Germline Variant', name:  'Germline Mutation')
EvaluationType.find_or_create_by(id:13, code: 'Somatic Variant', name:  'Somatic Mutation')
EvaluationType.find_or_create_by(id:14, code: 'Chromosomal Amplification', name:  'Chromosomal Duplication')
EvaluationType.find_or_create_by(id:15, code: 'Chromosomal Deletion', name:  'Chromosomal Deletion')
EvaluationType.find_or_create_by(id:10,  code: 'Activation Status', name:  'Protein Activation Status')
EvaluationType.find_or_create_by(id:8,  code: 'Methylation', name:  'Methylation')

SpecimenType.find_or_create_by(id:14, code: 'Other', name:'Other')
SpecimenType.find_or_create_by(id:9,  code: 'Saliva', name:'Saliva')
SpecimenType.find_or_create_by(id:12, code: 'Feces', name:'Feces')
SpecimenType.find_or_create_by(id:1,  code: 'Serum', name:'Serum')
SpecimenType.find_or_create_by(id:11, code: 'Buccal Mucosa', name:'Buccal Mucosa')
SpecimenType.find_or_create_by(id:4,  code: 'Tissue', name:'Tissue')
SpecimenType.find_or_create_by(id:13, code: 'Unspecified', name:'Unspecified')
SpecimenType.find_or_create_by(id:7,  code: 'CSF', name:'Cerebrospinal Fluid')
SpecimenType.find_or_create_by(id:2,  code: 'Plasma', name:'Plasma')
SpecimenType.find_or_create_by(id:3,  code: 'Blood', name:'Blood')
SpecimenType.find_or_create_by(id:5,  code: 'Urine', name:'Urine')
SpecimenType.find_or_create_by(id:6,  code: 'PBMCs', name:'Peripheral Blood Mononuclear Cell')
SpecimenType.find_or_create_by(id:10, code: 'Cryopreserved Cells', name:'Cryopreserved Cell')
SpecimenType.find_or_create_by(id:8,  code: 'Bone Marrow', name:'Bone Marrow (biopsy/aspirate)')

BiomarkerUse.find_or_create_by(id:2, code:'Integrated', name:'Integrated')
BiomarkerUse.find_or_create_by(id:1, code:'Integral', name:'Integral')

BiomarkerPurpose.find_or_create_by(id:3, code: 'Stratification Factor', name:'Stratification Factor')
BiomarkerPurpose.find_or_create_by(id:2, code: 'Treatment Assignment', name:'Therapy Assignment')
BiomarkerPurpose.find_or_create_by(id:1, code: 'Eligibility Criterion', name:'Eligibility Determination')
BiomarkerPurpose.find_or_create_by(id:4, code: 'Research', name:'Research')
BiomarkerPurpose.find_or_create_by(id:5, code: 'Response Assessment', name:'Response Assessment')

IdentifierType.find_or_create_by(code: 'NCI', name: 'NCI')
IdentifierType.find_or_create_by(code: 'NCT', name: 'NCT')

CadsrMarker.find_or_create_by(id:659,
                              name: 'SLC2A4 (GLUT4, name:  solute carrier family 2 (facilitated glucose transporter), member 4)',
                              meaning: 'SLC2A4 Gene',
                              description: 'This gene plays a role in glucose transport regulation.',
                              cadsr_id: 3335290,
                              cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'),
                              nv_term_identifier: 'C89034',
                              pv_name: 'SLC2A4')

CadsrMarker.find_or_create_by(id:47,
                              name: 'AFP (FETA, name:  alpha-fetoprotein)',
                              meaning: 'Alpha-Fetoprotein',
                              description: 'This gene plays a role in glucose transport regulation.',
                              cadsr_id: 3335290,
                              cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'),
                              nv_term_identifier: 'C89034',
                              pv_name: 'SLC2A4')




CadsrMarker.find_or_create_by(id:3543,
                              name: 'Citrate',
                              meaning: 'Citrate',
                              description: 'A salt or ester of citric acid.',
                              cadsr_id: 3192535,
                              cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C63374', pv_name: 'Citrate')

CadsrMarker.find_or_create_by(id:169,
                              name: 'PDE5A (PDE5, name:  CN5A, name:  phosphodiesterase 5A (cGMP-specific), name:  CGB-PDE)',
                              meaning: 'cGMP-Specific 3,5-Cyclic Phosphodiesterase',
                              description: 'cGMP-specific 3,5-cyclic phosphodiesterase (875 aa, ~100 kDa) is encoded by the human PDE5A gene. This protein plays a role in the mediation of cyclic GMP metabolism.',
                              cadsr_id: 3243311, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C96469', pv_name: 'PDE5A')

CadsrMarker.find_or_create_by(id:375,
                              name: 'ITGAM (integrin, alpha M, name:  CR3A, name:  MAC-1, name:  CD11b)',
                              meaning: 'ITGAM gene',
                              description: 'This gene plays a role in extracellular matrix interactions and cellular adhesion.',
                              cadsr_id: 3279303, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1366562', pv_name: 'ITGAM')


CadsrMarker.find_or_create_by(id:394,
                              name: 'CD24 (CD24 antigen (small cell lung carcinoma cluster 4 antigen), name:  CD24A)',
                              meaning: 'CD24 gene',
                              description: 'This gene is involved in the immune responsiveness of B-cells.',
                              cadsr_id: 3281849, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1413212', pv_name: 'CD24')

CadsrMarker.find_or_create_by(id:494,
                              name: 'TNFAIP3 (A20, name:  OTUD7C, name:  tumor necrosis factor alpha-induced protein 3)',
                              meaning: 'TNFAIP3 gene',
                              description: 'This gene may play a role in the regulation of apoptosis.',
                              cadsr_id: 3288476, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1420799', pv_name: 'TNFAIP3');

CadsrMarker.find_or_create_by(id:568,
                              name: 'tumor protein p53 binding protein 1 (TP53BP1, name:  53BP1)',
                              meaning: 'TP53BP1 Gene',
                              description: 'This gene may play a role in the modulation of the response to DNA damage.',
                              cadsr_id: 3302801,
                              cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C88925', pv_name: 'tumor protein p53 binding protein 1')

CadsrMarker.find_or_create_by(id:702,
                              name: 'BCL2A1 (BCL2-related protein A1, name:  ACC-1, name:  GRS, name:  BCL2L5, name:  BFL1, name:  HBPA1, name:  ACC-2)',
                              meaning: 'BCL2A1 gene',
                              description: 'No Value Exists',
                              cadsr_id: 3351678,
                              cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1412761', pv_name: 'BCL2A1')

CadsrMarker.find_or_create_by(id:724,
                              name: 'MIR382 (MIRN382, name:  microRNA 382, name:  hsa-mir-382)',
                              meaning: 'MIR382 gene',
                              description: 'No Value Exists',
                              cadsr_id: 3359747,
                              cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1537903', pv_name: 'MIR382')

CadsrMarker.find_or_create_by(id:374,
                              name: 'CD33 (SIGLEC3, name:  CD33 antigen (gp67), name:  sialic acid binding Ig-like lectin 3, name:  FLJ00391, name:  SIGLEC-3, name:  p67)',
                              meaning: 'CD33 gene',
                              description: 'No Value Exists',
                              cadsr_id: 3279301,
                              cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C1439292', pv_name: 'CD33')

CadsrMarker.find_or_create_by(id:856,
                              name: 'AKT2',
                              meaning: 'AKT2 Gene',
                              description: 'This gene plays a role in glucose homeostasis and the inhibition of apoptosis.',
                              cadsr_id: 3412274,
                              cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C18352', pv_name: 'AKT2')

CadsrMarker.find_or_create_by(id:924,
                              name: 'IGHV3-21 (immunoglobulin heavy variable 3-21)',
                              meaning: 'IGHV3-21 gene',
                              description: 'No Value Exists',
                              cadsr_id: 3430847, cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'),
                              nv_term_identifier: 'C1416035', pv_name: 'IGHV3-21')
CadsrMarker.find_or_create_by(id:1781,
                              name: 'SPIB (SPI-B, name:  Transcription Factor Spi-B, name:  Spi-B Transcription Factor (Spi-1/PU.1 Related))',
                              meaning: 'SPIB Gene',
                              description: 'This gene is involved in the modulation of gene transcription.',
                              cadsr_id: 3684777,
                              cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'), nv_term_identifier: 'C99651', pv_name: 'SPIB')



CadsrMarkerSynonym.find_or_create_by(id: 678,alternate_name:  'CGB-PDE',cadsr_marker_id:  169,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 677,alternate_name:  'phosphodiesterase 5A (cGMP-specific)',cadsr_marker_id:  169,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 676,alternate_name:  'CN5A',cadsr_marker_id:  169,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 675,alternate_name:  'PDE5',cadsr_marker_id:  169,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))


CadsrMarkerSynonym.find_or_create_by(id: 1914,alternate_name:  'tumor necrosis factor alpha-induced protein 3',cadsr_marker_id:  494,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1912,alternate_name:  'A20',cadsr_marker_id:  494,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1913,alternate_name:  'OTUD7C',cadsr_marker_id:  494,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))

CadsrMarkerSynonym.find_or_create_by(id: 1563,alternate_name:  'CD24 antigen (small cell lung carcinoma cluster 4 antigen)',cadsr_marker_id:  394,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1564,alternate_name:  'CD24A',cadsr_marker_id:  394,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))

CadsrMarkerSynonym.find_or_create_by(id: 2740,alternate_name:  'BCL2L5',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2737,alternate_name:  'BCL2-related protein A1',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2739,alternate_name:  'GRS',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2742,alternate_name:  'HBPA1',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2738,alternate_name:  'ACC-1',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2743,alternate_name:  'ACC-2',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2741,alternate_name:  'BFL1',cadsr_marker_id:  702,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1431,alternate_name:  'sialic acid binding Ig-like lectin 3',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1432,alternate_name:  'FLJ00391',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1429,alternate_name:  'SIGLEC3',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1430,alternate_name:  'CD33 antigen (gp67)',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1434,alternate_name:  'SIGLEC-3',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 1433,alternate_name:  'p67',cadsr_marker_id:  374,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2800,alternate_name:  'microRNA 382',cadsr_marker_id:  724,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2801,alternate_name:  'hsa-mir-382',cadsr_marker_id:  724,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2799,alternate_name:  'MIRN382',cadsr_marker_id:  724,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 3554,alternate_name:  'immunoglobulin heavy variable 3-21',cadsr_marker_id:  924,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2296,alternate_name:  '53BP1',cadsr_marker_id:  568,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 2295,alternate_name:  'TP53BP1',cadsr_marker_id:  568,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 7725,alternate_name:  'Spi-B Transcription Factor (Spi-1/PU.1 Related)',cadsr_marker_id:  1781,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 7723,alternate_name:  'SPI-B',cadsr_marker_id:  1781,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))
CadsrMarkerSynonym.find_or_create_by(id: 7724,alternate_name:  'Transcription Factor Spi-B',cadsr_marker_id:  1781,cadsr_marker_status: CadsrMarkerStatus.find_by_code('ACT'))


########### SEEDING STATIC DATA ENDS #######################

########## SEEDING APP SETTINGS BEGINS ##########

AppSetting.find_or_create_by(code: 'FM', name: 'Funding Mechanism List', value: 'see big value', big_value: 'B01,B08,B09,C06,D43,D71,DP1,DP2,DP3,E11,F05,F30,F31,F32,F33,F34,F37,F38,G07,G08,G11,G12,G13,G20,G94,H13,H23,H25,H28,H50,H57,H62,H64,H75,H79,HD4,HR1,HS5,I01,K01,K02,K05,K06,K07,K08,K12,K14,K18,K21,K22,K23,K24,K25,K26,K30,K99,KD1,KL1,KL2,L30,L32,L40,L50,L60,M01,N01,N02,N03,N43,N44,P01,P20,P30,P40,P41,P42,P50,P51,P60,P76,PL1,PN1,PN2,R00,R01,R03,R04,R06,R08,R13,R15,R17,R18,R21,R24,R25,R30,R33,R34,R36,R37,R41,R42,R43,R44,R49,R55,R56,R90,RC1,RC2,RC3,RC4,RL1,RL2,RL5,RL9,RS1,S06,S10,S11,S21,S22,SC1,SC2,SC3,T01,T02,T03,T06,T09,T14,T15,T32,T34,T35,T36,T37,T42,T90,TL1,TU2,U01,U09,U10,U11,U13,U14,U17,U18,U19,U1A,U1Q,U1S,U1T,U1V,U21,U22,U23,U24,U27,U2G,U2R,U30,U32,U34,U36,U38,U41,U42,U43,U44,U45,U47,U48,U49,U50,U51,U52,U53,U54,U55,U56,U57,U58,U59,U60,U61,U62,U65,U66,U75,U79,U81,U82,U83,U84,U87,U88,U90,UA1,UC1,UC2,UC3,UC6,UC7,UD1,UE1,UE2,UG1,UH1,UH2,UH3,UL1,UM1,UR1,UR3,UR6,UR8,US3,US4,UT1,UT2,VF1,X01,X02,X06,X98,Y01,Y02,Z01,Z02,Z1A')

AppSetting.find_or_create_by(code: 'IC', name: 'Institute Code List', value: 'see big value', big_value: 'AA,AE,AF,AG,AI,AM,AO,AR,AT,BC,BX,CA,CB,CD,CE,CH,CI,CK,CL,CM,CN,CO,CP,CR,CT,CU,CX,DA,DC,DD,DE,DK,DP,EB,EH,EM,EP,ES,EY,FD,GD,GH,GM,GW,HB,HC,HD,HG,HI,HK,HL,HM,HO,HP,HR,HS,HV,HX,HY,IP,JT,LM,MD,MH,MN,NB,NH,NR,NS,NU,OA,OC,OD,OF,OH,OL,OR,PC,PH,PR,PS,RC,RD,RG,RM,RR,RX,SC,SF,SH,SM,SP,SU,TI,TP,TR,TS,TW,VA,WC,WH,WT')

AppSetting.find_or_create_by(code: 'NCI', name: 'NCI Division/Program Code List', value: 'see big value', big_value: 'CCR,CCT/CTB,CIP,CDP,CTEP,DCB,DCCPS,DCEG,DCP,DEA,DTP,OD,OSB/SPOREs,TRP,RRP,N/A')

AppSetting.find_or_create_by(code: 'NIH', name: 'NIH Institution Code List', value: 'see big value', big_value: 'NEI-National Eye Institute;NHLBI-National Heart, Lung, and Blood Institute;NHGRI-National Human Genome Research Institute;NIA-National Institute on Aging;NIAAA-National Institute on Alcohol Abuse and Alcoholism;NIAID-National Institute of Allergy and Infectious Diseases;NIAMS-National Institute of Arthritis and Musculoskeletal and Skin Diseases;NIBIB-National Institute of Biomedical Imaging and Bioengineering;NICHD-NICHD-Eunice Kennedy Shriver National Institute of Child Health and Human Development;NIDCD-National Institute on Deafness and Other Communication Disorders;NIDCR-National Institute of Dental and Craniofacial Research;NIDDK-National Institute of Diabetes and Digestive and Kidney Diseases;NIDA-National Institute on Drug Abuse;NIEHS-National Institute of Environmental Health Sciences;NIGMS-National Institute of General Medical Sciences;NIMH-National Institute of Mental Health;NINDS-National Institute of Neurological Disorders and Stroke;NINR-National Institute of Nursing Research;NLM-National Library of Medicine;CIT-Center for Information Technology;CSR-Center for Scientific Review;FIC-John E. Fogarty International Center for Advanced Study in the Health Sciences;NCCAM-National Center for Complementary and Alternative Medicine;NCMHD-National Center on Minority Health and Health Disparities;NCRR-National Center for Research Resources (NCRR);CC-NIH Clinical Center;OD-Office of the Director')

AppSetting.find_or_create_by(code: 'ACCEPTED_FILE_TYPES_REG', name: 'Accepted File Types for Registry', value: 'pdf,doc,docx,docm,xls,xlsx,xlsm,xlsb,rtf,txt', big_value: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-word.document.macroenabled.12, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroenabled.12, application/vnd.ms-excel.sheet.binary.macroenabled.12, application/rtf, text/plain')

AppSetting.find_or_create_by(code: 'ACCEPTED_FILE_TYPES', name: 'Accepted File Types for PA', value: 'pdf,doc,docx,docm,xls,xlsx,xlsm,xlsb,rtf,txt', big_value: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-word.document.macroenabled.12, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroenabled.12, application/vnd.ms-excel.sheet.binary.macroenabled.12, application/rtf, text/plain')

AppSetting.find_or_create_by(code: 'TRIAL_DOCUMENT_TYPES', name: 'Trial Related Documents', value: 'Protocol Document,IRB Approval,TSR,Informed Consent,Change Memo Document,Complete Sheet,Other,List of Participating Sites,Protocol Highlighted Document', big_value: 'nothing here')

AppSetting.find_or_create_by(code: 'NIH_NCI_DIV_PA', name: 'NCI Division/Department Code List for PA', value: 'see big value', big_value: 'CCR,CTEP,DCP,NHBLI')

AppSetting.find_or_create_by(code: 'NIH_NCI_PROG_PA', name: 'NCI Division/Program Code List for PA', value: 'see big value', big_value: 'BIQSFP,SPORE,Steering_Commitee_Reviewed')

AppSetting.find_or_create_by(code: 'SAMPLING_METHOD_PA', name: 'Sampling Method', value: 'Probability Sample,Non-Probability Sample', big_value: 'see value')

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
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "EBI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Duplicate"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
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
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "COM": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"},
                               "ACO": {"warnings": [{"status": "CAC"}, {"status": "CAI"}], "sameDay": "Yes"}
                             },
                             "EBI": {
                               "INR": {"errors": [{"message": "Invalid Transition"}]},
                               "APP": {"errors": [{"message": "Invalid Transition"}]},
                               "WIT": {"valid": "Yes", "sameDay": "Yes"},
                               "ACT": {"errors": [{"message": "Invalid Transition"}]},
                               "EBI": {"errors": [{"message": "Duplicate"}]},
                               "CAC": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "CAI": {"warnings": [{"status": "CAC"}, {"message": "Same Day"}], "sameDay": "Yes"},
                               "TCL": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
                               "TCA": {"valid": "Yes", "warnings": [{"message": "Same Day"}], "sameDay": "Yes"},
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

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_URL', name: 'NCI Thesaurus URL', value: 'http://evs.nci.nih.gov/ftp1/NCI_Thesaurus/Branches/')

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_FILES', name: 'NCI Thesaurus files', value: 'see big value', big_value: 'Neoplasm.zip')

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_INFO_URL', name: 'NCI Thesaurus page for a term', value: 'https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=NCI_Thesaurus&code=')

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_TREE_URL', name: 'NCI Thesaurus tree for a term', value: 'https://ncit.nci.nih.gov/ncitbrowser/ajax?action=search_hierarchy&ontology_node_ns=NCI_Thesaurus&ontology_display_name=NCI_Thesaurus&ontology_node_id=')

AppSetting.find_or_create_by(code: 'NCI_THESAURUS_INTERVENTIONS', name: 'NCI Thesaurus files for Interventions', value: 'see big value', big_value: 'Drug_Food_Chemical_or_Biomedical_Material.zip')

AppSetting.find_or_create_by(code: 'USER_DOMAINS', description: 'Double pipe delimited values', name: 'User Domains', value: 'see big value', big_value: 'NIH||NIHEXT||Federated')

AppSetting.find_or_create_by(code: 'USER_ROLES', description: 'Double pipe delimited values', name: 'User Roles', value: 'see big value', big_value: 'ROLE_RO||ROLE_SUPER||ROLE_ADMIN||ROLE_CURATOR||ROLE_ABSTRACTOR||ROLE_ABSTRACTOR-SU||ROLE_TRIAL-SUBMITTER||ROLE_ACCRUAL-SUBMITTER||ROLE_SITE-SU||ROLE_SERVICE-REST')

AppSetting.find_or_create_by(code: 'NIH_USER_FUNCTIONS', description: 'Double pipe delimited values', name: 'NIH User Functions', value: 'see big value', big_value: 'View Information||Manage and Curate Persons||Organizations and Families||Manage and Abstract Trial Registrations and Results||Manage Abstraction functionally||Administer/Approve CTRP Accounts||Administer and Manage all Functionality and Configurations')

AppSetting.find_or_create_by(code: 'NIHEXT_USER_FUNCTIONS', description: 'Double pipe delimited values', name: 'NIHEXT User Functions', value: 'see big value', big_value: 'Submit Trials||Manage/Approve Trial ownership, Accruals, Site accounts')

AppSetting.find_or_create_by(code: 'Federated_USER_FUNCTIONS', description: 'Double pipe delimited values', name: 'Federated User Functions', value: 'see big value', big_value: 'Submit Trials')

########## SEEDING APP SETTINGS ENDS ##########

########## SEEDING MAIL TEMPLATES STARTS ##########

MailTemplate.find_or_create_by(
                code: 'TRIAL_REG',
                name: 'Trial Registration',
                from: 'noreply@ctrp.nci.nih.gov',
                to: 'noreply@ctrp.nci.nih.gov',
                subject: 'NCI CTRP: Trial RECORD CREATED for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
                body_text: 'Text version.',
                body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body><hr> <p><b>Title: </b>${trialTitle}</p> ${trialIdentifiers} <table border="0"> <tr> <td><b>Submission Date:</b></td> <td>${submissionDate}</td> </tr> </table> <hr> <p>Date: ${CurrentDate}</p> <p>Dear ${SubmitterName},</p> <p>You have successfully created a record in the NCI Clinical Trials Reporting Program (CTRP) for the trial identified above.</p> <p>The CTRP has assigned your trial the following unique NCI Trial Identification (Trial ID) number:<br> <b>${nciTrialIdentifier}</b><br><br> Please reference this number in all future correspondence with the Clinical Trials Reporting Office (CTRO).</p> <p><b>NEXT STEPS:</b><br> The Clinical Trials Reporting Office (CTRO) staff is reviewing your trial to ensure that it meets all of the requirements for registration in the CTRP system. They will email you their findings within two (2) business days. </p> <p>In the meantime, if you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov.</p> <p>Thank you for submitting your trial for registration in the Clinical Trials Reporting Program.</p></body></html>'
)

MailTemplate.find_or_create_by(
    code: 'TRIAL_UPDATE',
    name: 'Trial Update',
    from: 'noreply@ctrp.nci.nih.gov',
    to: '${trialSubmitterEmail}',
    subject: 'NCI CTRP: Trial RECORD UPDATED for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>
                                <p><b>NCI Trial ID: </b>${nciTrialIdentifier}</p>
                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>Submitting Organization: </b>${submitting_organization}</p>
                                <p><b>Submission Date: </b>${submissionDate}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>The NCI Clinical Trials Reporting Program (CTRP) received updates for the trial identified above.</p>
                            <p><b>Update Information: </b></p>
                            <p>Other Identifiers: new identifier(s) added</p>
                            <p>Grant Information: Added</p>
                            <p>Trial Status: Added</p>
                            <p>Trial Status Date: Added</p>
                            <p>Start Date and Type: Added</p>
                            <p>Primary Completion Date and Type: Added</p>
                            <p>Participating Site status: Added</p>
                            <p>Trial Related Documents: Added</p>

                            <p><b>NEXT STEPS:</b></p>
                            <p>If you have questions about this or other CTRP topics, please contact us at <a href="mailto:ncictro@mail.nih.gov">ncictro@mail.nih.gov</a>.</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            </body></html>'
)


MailTemplate.find_or_create_by(
    code: 'TRIAL_AMEND',
    name: 'Trial Amendment',
    from: 'noreply@ctrp.nci.nih.gov',
    to: '${trialAmendSubmitterEmail}',
    subject: 'NCI CTRP: Trial AMENDMENT ${trialAmendNumber} for ${nciTrialIdentifier}, ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>

                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>Lead Organization: </b>${lead_organization}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>NCI Trial ID: </b>${nciTrialIdentifier}</p>
                                <p><b>NCT ID: </b>${nctId}</p>
                                <p><b>CTEP ID: </b>${ctepId}</p>
                                <p><b>DCP ID: </b>${dcpId}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>The NCI Clinical Trials Reporting Program (CTRP) received the amendment you submitted for the trial identified above.</p>
                            <p><b>Amendment Information: </b></p>
                            <p>Amendment Number: ${trialAmendNumber}</p>
                            <p>Amendment Date: ${trialAmendmentDate}</p>

                            <p><b>NEXT STEPS:</b></p>
                            <p>The Clinical Trials Reporting Office (CTRO) staff is reviewing the amended information to ensure that it meets all of the requirements for registration in the CTRP system. The CTRO will send you a separate email that indicates whether they have accepted or rejected your trial within two (2) business days.</p>
                            <p>If you have questions about this or other CTRP topics, please contact us at <a href="mailto:ncictro@mail.nih.gov">ncictro@mail.nih.gov</a>.</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            </body></html>'
)


MailTemplate.find_or_create_by(
    code: 'TRIAL_DRAFT',
    name: 'Trial Draft',
    from: 'noreply@ctrp.nci.nih.gov',
    to: '${trialSubmitterEmail}',
    subject: 'NCI CTRP: Trial RECORD SAVED as DRAFT for ${leadOrgTrialIdentifier}',
    body_text: 'Text version',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                            </head><body><hr> <p><b>Title: </b>${trialTitle}</p>
                            <div>
                                <p><b>Lead Organization Trial ID: </b>${leadOrgTrialIdentifier}</p>
                                <p><b>Lead Organization: </b>${lead_organization}</p>
                                <p><b>CTRP-assigned Lead Organization ID: </b>${ctrp_assigned_lead_org_id}</p>
                                <p><b>Submission Date: </b>${submissionDate}</p>
                            </div>
                            <hr>
                            <p>Date: ${CurrentDate}</p>
                            <p><b>Dear ${SubmitterName}</b>,</p>
                            <p>You have saved a draft of the trial identified above for submission to the NCI Clinical Trials Reporting Program (CTRP).</p>

                            <p><b>NEXT STEPS:</b></p>
                            <p>To retrieve and complete your submission, use the "Search Saved Drafts" feature on the "Search Trials" page in the CTRP Registration application.</p>
                            <p>Clinical Trials Reporting Office (CTRO) staff will not access or process your trial until you have completed the submission. </p>
                            <p><b>Important!</b> You can save your draft for a maximum of 30 days.</p>
                            <p>If you have questions about this or other CTRP topics, please contact us at ncictro@mail.nih.gov</p>
                            <p>Thank you for participating in the NCI Clinical Trials Reporting Program. </p>
                            </body></html>'
)

MailTemplate.find_or_create_by(
    code: 'USER_REGISTRATION',
    name: 'User Registration',
    from: 'noreply@ctrp.nci.nih.gov',
    to:   'ctrpaccountapprover1@ctrp-ci.nci.nih.gov,ctrpaccountapprover2@ctrp-ci.nci.nih.gov',
    subject: 'New NCI CTRP Account Request',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body><p>Dear Sir/Madam,<br><br>A new user account in the  Clinical Trials Reporting Program (CTRP) Clinical Trials Registration application.<br><br>The user information is as follows:<ul><li><b>First Name:</b> ${first_name}</li><li><b>Last Name:</b> ${last_name}</li><li><b>Affiliated Organization:</b> ${organization}</li><li><b>Email:</b> ${email}</li></ul></p><p>The user would like the following functions:${functions_list}</p><p>Please Navigate to http://ctrp-ci.nci.nih.gov/ and activate user and assign role.<p></body></html>'
)

MailTemplate.find_or_create_by(
    code: 'USER_ADMIN_REQUEST',
    name: 'User Admin Request',
    from: 'noreply@ctrp.nci.nih.gov',
    to:   'ctrpaccountapprover1@ctrp-ci.nci.nih.gov,ctrpaccountapprover2@ctrp-ci.nci.nih.gov',
    subject: 'New NCI CTRP User Admin Request',
    body_text: 'Text version.',
    body_html: '<!DOCTYPE html><html><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type" /></head><body><p>Dear Sir/Madam,<br><br><b>${username}</b>, a user in the  Clinical Trials Reporting Program (CTRP) Clinical Trials Registration application, is requesting admin access.</p><p>Please Navigate to http://ctrp-ci.nci.nih.gov/ for the user\'s details and assign new role to grant access.<p></body></html>'
)


########## SEEDING MAIL TEMPLATES ENDS ############

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

org1 = Organization.find_or_create_by( id: 9999997,
                                       source_id: '9999997',
                                       name: 'ZZZ test org for test accounts 2',
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

org2 = Organization.find_or_create_by( id: 9999996,
                                       source_id: '9999996',
                                       name: 'ZZZ test org for test accounts 3',
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

family0 = Family.find_or_create_by( name: 'ZZZ family',
                                    family_status: FamilyStatus.find_by_code('ACTIVE'),
                                    family_type: FamilyType.find_by_code('CANCERCENTER')
)

family0.organizations << org0
family0.organizations << org1
family0.organizations << org2

org3 = Organization.find_or_create_by( id: 9999995,
                                       source_id: '9999995',
                                       name: 'AAA test org for test accounts',
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

org4 = Organization.find_or_create_by( id: 9999994,
                                       source_id: '9999994',
                                       name: 'AAA test org for test accounts 2',
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

org5 = Organization.find_or_create_by( id: 9999993,
                                       source_id: '9999993',
                                       name: 'AAA test org for test accounts 3',
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

family1 = Family.find_or_create_by( name: 'AAA family',
                                    family_status: FamilyStatus.find_by_code('ACTIVE'),
                                    family_type: FamilyType.find_by_code('NIH')
)

family1.organizations << org3
family1.organizations << org4
family1.organizations << org5

ctep = Organization.find_or_create_by( id: 10000000,
                                       source_id: '10000000',
                                       name: 'CTEP',
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
ccr = Organization.find_or_create_by( id: 10000001,
                                       source_id: '10000001',
                                       name: 'CCR',
                                       phone:'240-276-0002',
                                       source_status: SourceStatus.find_by_code("ACT"),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)

dcp = Organization.find_or_create_by( id: 10000002,
                                       source_id: '10000002',
                                       name: 'DCP',
                                       phone:'240-276-0003',
                                       source_status: SourceStatus.find_by_code("ACT"),
                                       source_context: SourceContext.find_by_code('CTRP'),
                                       address: '9605 Medical Center Dr',
                                       city: 'Rockville',
                                       state_province: 'Maryland',
                                       country: 'United States',
                                       postal_code: '20850',
                                       email: "ncictrpdev@mail.nih.gov"
)


test_users = [ {"username" => "ctrpsuper", "role" => "ROLE_SUPER", "approve" => true},
               {"username" => "ctrpsuper2", "role" => "ROLE_SUPER", "approve" => true},
               {"username" => "ctrpsuper3", "role" => "ROLE_SUPER", "approve" => true},
               {"username" => "ctrpadmin", "role" => "ROLE_SUPER" , "approve" => true},
               {"username" => "ctrpcurator", "role" => "ROLE_CURATOR" , "approve" => true},
               {"username" => "testercurator", "role" => "ROLE_CURATOR" , "approve" => true},
               {"username" => "ctrpro", "role" => "ROLE_RO", "approve" => true},
               {"username" => "ctrptrialsubmitter", "role" => "ROLE_TRIAL-SUBMITTER", "approve" => true},
               {"username" => "ctrptrialsubmitter2", "role" => "ROLE_TRIAL-SUBMITTER", "approve" => true},
               {"username" => "ctrptrialsubmitter3", "role" => "ROLE_TRIAL-SUBMITTER", "approve" => true},
               {"username" => "ctrpaccrualsubmitter", "role" => "ROLE_ACCRUAL-SUBMITTER", "approve" => true},
               {"username" => "ctrpsitesu", "role" => "ROLE_SITE-SU", "approve" => true},
               {"username" => "ctrpsitesu2", "role" => "ROLE_SITE-SU", "approve" => true},
               {"username" => "ctrpabstractor", "role" => "ROLE_ABSTRACTOR", "approve" => true},
               {"username" => "ctrpabstractor2", "role" => "ROLE_ABSTRACTOR", "approve" => true},
               {"username" => "ctrpabstractor3", "role" => "ROLE_ABSTRACTOR", "approve" => true},
               {"username" => "ctrpabstractorsu", "role" => "ROLE_ABSTRACTOR-SU", "approve" => true},
               {"username" => "ctepservice", "role" => "ROLE_SERVICE-REST", "approve" => true},
               {"username" => "ccrservice", "role" => "ROLE_SERVICE-REST", "approve" => true},
               {"username" => "dcpservice", "role" => "ROLE_SERVICE-REST", "approve" => true},
               {"username" => "ctrpaccountapprover1", "role" => "ROLE_ACCOUNT-APPROVER", "approve" => true},
               {"username" => "ctrpaccountapprover2", "role" => "ROLE_ACCOUNT-APPROVER", "approve" => true}
]

test_users.each do |u|
  user = User.find_by_username(u["username"])
  unless user.blank?
    user.password = "Welcome01"
    user.encrypted_password = "$2a$10$Kup4LOl1HMoxIDrqxeUbNOsh3gXJhMz/FYPPJyVAPbY0o3DxuFaXK"

    user.role = u["role"]
    user.approved =  u["approve"]
    unless user.role == "ROLE_ADMIN" || user.role == "ROLE_SUPER" || user.role == "ROLE_SERVICE-REST"
      if user.username == 'ctrpsitesu2'
        user.organization = org3
      else
        user.organization = org0
      end
    end
    if user.role == "ROLE_SERVICE-REST"
      case user.username
        when "ctepservice"
          user.organization = ctep

        when "dcpservice"
          user.organization = dcp

        when "ccrservice"
          user.organization = ccr
      end
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