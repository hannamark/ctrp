@PA @global
Feature: PA F05 Trial History Information - Audit Trail.Feature

As any CTRP PA User, I can View the Trial History Information Audit Trail

Scenario Outline: #1 I can view Trial History Information Audit Trail
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information Audit Trail Screen
And I select View Audit Trail
Then the aduit trail will be displayed for the Trial ordered by date with newest update first and include the following fields:

|NCI ID (nci_id)|
|Lead Protocol (lead_protocol_id)|
|official_title|
|pilot|
|program_code|
|grant_question|
|start_date|
|start_date_qual|
|primary_comp_date|
|primary_comp_date_qual|
|comp_date|
|comp_date_qual|
|ind_ide_question|
|intervention_indicator|
|sec801_indicator|
|data_monitor_indicator|
|Study Source (study_source_id:study_sources/Name)|
|Phase (phase_id)|
|primary purpose (primary_purpose_id:  primary_purposes/Name)|
|primary_purpose_other|
|secondary purpose (secondary_purpose_id: secondary_purposes/Name)|
|secondary_purpose_other|
|responsible party (responsible_party_id:responsible_parties/name)|
|Lead Org (lead_org_id:Organizations/Name)|
|PI (pi_id:People/Last Name, First Name, Middle Name)|
|Sponsor (sponsor_id:  Organizations/Name)|
|Investigator (investigator_id: People/Last Name, First Name, Middle Name)|
|created_at|
|updated_at|
|research category (research_category_id:  research_categories/Name)|
|accrual disease term (accrual_disease_term_id: accrual_disease_terms/name)|
|investigator_title|
|investigator aff id (investigator_aff_id: Organizations/Name)|
|created_by|
|updated_by|
|process_priority|
|process_comment|
|acronym|
|keywords|
|nih_nci_div|
|nih_nci_prog|
|send_trial|
|board_approval_num|
|brief_title|
|brief_summary|
|detailed_description|
|objectives|
|target_enrollment|
|final_enrollment|
|accruals|
|study Model: study_models.name|
|study_model_other|
|time perspectives:  time_perspectives.name |
|time_perspective_other |
|accept_vol|
|min_age|
|max_age|
|owner (owner_id:  Users/Username)|
|board_approval_status (board_approval_status_id: board_approval_status/name)|
|intervention_model (intervention_model_id:  intervention_models/name)|
|masking (masking_id: maskings.name|
|masking_role_subject
|masking_role_investigator
|masking_role_caregiver
|masking_role_outcome_assessor
|allocations (allocation_id: allocations.Name)|
|study_classification (study_classification_id: study_classifications.Name)|
|gender (gender_id: genders/Name)|
|min_age_unit (min_age_unit_id: age_unit.name)|
|max_age_unit (max_age_unit_id: age_unit.name))|
|anatomic_site (anatomic_site_id:  anatomic_sites.Name)|
|num_of_arms|
|verification_date|
|sampling_method|
|study_pop_desc|
|board_name|
|board_affiliation (board_affiliation_id:  Organizations.name)|
|submission number|
|Submission date|
|Submission type|
|Submission source|
|Submission Method|
|Admendment Number|
|Milestone Name|
|Processing Status Name|
|Other ID (multiple) xxxx: other_ids.protocol_id, other_ids.protocol_id_origin_id:  protocol_id_origins.name|
|Markers Name (multiple) xxxx: markers.name, markers.evaluation_type_id evaluation_types.name, markers.assay_type_id assay_types.name, markers.biomarker_use_id biomarker_uses.name, markers.biomarker_purpose_id biomarker_purposes.name, marker.specimen_type_id specimen_types.name, markers.record_status|
|Outcome Measure  (multiple) xxxxx: outcome_measures.outcome_measure_type_id: outcome_measures_types.name,  outcome_measures.title, outcome_measures.time_frame, outcome_measures.description, outcome_measures.safety_issue |
|eligibility criteria (multiple) xxxx other_criteria.criteria_type, other_criteria.criteria_desc |
|Associated Trials (multiple)  xxxx associated_trials.trial_identifier, identifier_type identifier_types.code, name  |
|Disease and Condition (multiple) xxxx  diseases.preferred_name, diseases.code, diseases.thesaurus_id, diseases.display name  |
|Interventions (multiple)xxxx interventions.name, other_name, description, intervention_type_id  intervention_types.code, name  |
|arms_groups (multiple) xxxx arms_groups.label,type,description, intervention_id intervention_types.code, name |
|Subgroup Stratification Criteria (multiple) xxxx sub_groups.code, sub_groups.description |

|trial owners (multiple) xxxx trial_ownerships.user_id: users.username| 
|trial documents (multiple) xxxx trial_documents.filename, document_type, document_subtype|
|alternative titles (multiple) xxxx alternate_titles.category,  title  (???source) |

|central contacts (multiple) xxxx central_contacts.phone, email, central_contact_type_id: central_contact_types.name, person_id: people.fname, mname, lname |

|citations (multiple) xxxx citations.description, pub_med_id, results_reference|  
|collaborators (multiple) xxxx collaborators.org_name,organization_id: organizations.name  |
| grants (multiple) xxxx grants.funding_mechanism, institute_code,nci,serial_number |

|Ind ( multiple) xxxx ind_ides.ind_ide_type, grantor, nih_nci,holder_type_id, expanded_access, exempt, ind_ide_number, expanded_access_type_id: expanded_access_types.name|
|links (multiple) xxxx  links.description|
|Milestones (multiple) xxxx milestone_wrappers.milestone_date, milestone_id: milestones.name, submission_id: submission_types.name|
|submissions (multiple) xxxx submission.submission_num, submission_date, amendment_date,amendment_reason_id: cccc, submission_type_id: cccc, submission_source_id: submission_sources.name, submission_method_id: submission_methods.name|

| oversight_authorities (multiple) xxxx oversight_authorities.country, organization|
| participating_sites (multiple) xxxx participating_sites.protocol_id, program_code, contact_name, contact_phone, contact_email, organization_id: organizations.name, person_id: people.fname, mname, lname|

|Processing Status processing_status_wrappers.status_date, processing_status_id: processing_statuses.name |
| Trial co leads (multiple) xxxx trial_co_lead_orgs.organization_id: organizations.name|
| Co-PIs trial_co_pis.person_id : people.fname, mname, lname|
| Trial Status trial_status_wrappers.status_date, why_stopped, trial_status_id: trial_statuses.name|

Examples:
|NCI-ID| NCI-2015-01299 |
| Lead Protocol| 9226 |
|official_title|Individualized Treatment for Relapsed/Refractory Acute Leukemia Based on Chemosensitivity and Genomics/Gene Expression Data|
|program_code| 45  |
|grant_question|XXX|
|start_date |September 11, 2015| 
|start_date_qual|Actual    | 
|primary_comp_date|July 01, 2019 |
|primary_comp_date_qual|Anticipated |
|comp_date          |  |
|comp_date_qual|  |
|ind_ide_question|No|
|intervention_indicator| Single Group |
|sec801_indicator|No|
|data_monitor_indicator|Yes|
| Study Source |XXXXIndustrial|
|Phase |NA|
|primary purpose|Treatment|
|primary_purpose_other| |    
|secondary purpose |Ancillary-Correlative |
|secondary_purpose_other|  |
|responsible party|Sponsor|
|Lead Org|Fred Hutch/University of Washington Cancer Consortium|
|PI Last Name, First Name, Middle Name|Becker, Pamela |
|Sponsor| 	University of Washington Medical Center|
|Investigator Last Name, First Name, Middle Name |Becker, Pamela |
|Created At | July 29, 2015|
|updated_at |September 18, 2015|
|research category|Interventional   |
|accrual disease term|ICD9|
|investigator_title|XXX|
|investigator aff id (investigator_aff_id: Organizations/Name)|XXX|
|created_by|XXX|
|updated_by|XXX|
|process_priority|2- Normal  (AS IN 4x)|
|process_comment| |
|acronym| |
|keywords| |
|nih_nci_div|XXX|
|nih_nci_prog|XXX|
|send_trial|XXX|
|board_approval_num|9226|
|brief_title|High Throughput Drug Sensitivity Assay and Genomics- Guided Treatment of Patients with Relapsed or Refractory Acute Leukemia|
|brief_summary|This clinical trial studies the feasibility of choosing treatment based on a high throughput ex vivo drug sensitivity assay in combination with mutation analysis for patients with acute leukemia that has returned after a period of improvement or does not respond to treatment. A high throughput screening assay tests many different drugs individually or in combination that kill leukemia cells in tiny chambers at the same time. High throughput drug sensitivity assay and mutation analysis may help guide the choice most effective for an individual’s acute leukemia.|
|detailed_description|Leukemia cells obtained from blood or bone marrow are analyzed for sensitivity to both individual drugs and drug combinations via high throughput chemotherapy sensitivity assay and next generation sequencing assays. Doctors will then recommend chemotherapy regimens based on the results. After completion of the chemotherapy regimen, patients are followed up at 2-4 weeks for response, and then every 3 months for 2 years for duration of response and survival. |
|objectives|PRIMARY OBJECTIVES:I. To test patient cells in a high throughput assay against individual drugs and drug combinations within 21 days to enable optimal choice of drug combinations for therapy. II. To test gene expression that reveals activation of druggable pathways or mutations in genes that confer susceptibility to specific agents may also be considered in choice of treatment.  SECONDARY OBJECTIVES:  I. To evaluate the response to the chosen therapy.|
||target_enrollment|15|
|final_enrollment| |
|accruals|0|
|study Model: study_models.name|NA|
|study_model_other|Cohort OR NA|
|time perspectives |Prospective|
|time_perspective_other ||
|accept_vol ACCEPTS HEALTHY VOLUNTEERS|No|
|gender |Both|
|min_age|3.0|
|min_age_unit |Years|
|max_age|999.0|
|max_age_unit|Years|
|owner (owner_id:  Users/Username)|XXX|
|board_approval_status (board_approval_status_id: board_approval_status/name)|XXX|
|intervention_model (intervention_model_id:  intervention_models/name)|XXX|
|masking |Open|
|masking_role_subject|NA ??|
|masking_role_investigator|NA ??|
|masking_role_caregiver|NA ??|
|masking_role_outcome_assessor|NA ??|
|allocations |NA|
|study_classification |Efficacy|
|anatomic_site|Leukemia, not otherwise specified; Lymphoid Leukemia; Myeloid and Monocytic Leukemia|
|num_of_arms|1|
|verification_date|XXX|
|sampling_method|XXX|
|study_pop_desc|XXX|
|board_name|XXX|
|board_affiliation (board_affiliation_id:  Organizations.name)|XXX|
|submission number|XXX|
|Submission date|XXX|
|Submission type|XXX|
|Submission source|Registy|
|Submission Method|XXX|
|Admendment Number|1|
|Milestone Name|XXX|
|Processing Status Name|XXX|
|Other ID (multiple) xxxx: other_ids.protocol_id, other_ids.protocol_id_origin_id:  protocol_id_origins.name||
|Markers Name (multiple) xxxx: markers.name, markers.evaluation_type_id evaluation_types.name, markers.assay_type_id assay_types.name, markers.biomarker_use_id biomarker_uses.name, markers.biomarker_purpose_id biomarker_purposes.name, marker.specimen_type_id specimen_types.name, markers.record_status|XXX| 
|Outcome Measure  (multiple) xxxxx: outcome_measures.outcome_measure_type_id: outcome_measures_types.name,  outcome_measures.title, outcome_measures.time_frame, outcome_measures.description, outcome_measures.safety_issue |XXX|
|eligibility criteria (multiple) xxxx other_criteria.criteria_type, other_criteria.criteria_desc | XXX|
|Associated Trials (multiple)  xxxx associated_trials.trial_identifier, identifier_type identifier_types.code, name  |XXX|
|Disease and Condition (multiple) xxxx  diseases.preferred_name, diseases.code, diseases.thesaurus_id, diseases.display name  |XXX|
|Interventions (multiple)xxxx interventions.name, other_name, description, intervention_type_id  intervention_types.code, name  |XXX|
|arms_groups (multiple) xxxx arms_groups.label,type,description, intervention_id intervention_types.code, name |XXX|
|Subgroup Stratification Criteria (multiple) xxxx sub_groups.code, sub_groups.description |XXX|

|trial owners (multiple) xxxx trial_ownerships.user_id: users.username| XXX|
|trial documents (multiple) xxxx trial_documents.filename, document_type, document_subtype|XXX|
|alternative titles (multiple) xxxx alternate_titles.category,  title  (???source) |XXX|

|central contacts (multiple) xxxx central_contacts.phone, email, central_contact_type_id: central_contact_types.name, person_id: people.fname, mname, lname |XXX|

|citations (multiple) xxxx citations.description, pub_med_id, results_reference|  XXX|
|collaborators (multiple) xxxx collaborators.org_name,organization_id: organizations.name  |XXX|
| grants (multiple) xxxx grants.funding_mechanism, institute_code,nci,serial_number |XXX|

|Ind ( multiple) xxxx ind_ides.ind_ide_type, grantor, nih_nci,holder_type_id, expanded_access, exempt, ind_ide_number, expanded_access_type_id: expanded_access_types.name|XXX|
|links (multiple) xxxx  links.description|XXX|
|Milestones (multiple) xxxx milestone_wrappers.milestone_date, milestone_id: milestones.name, submission_id: submission_types.name|XXX|
|submissions (multiple) xxxx submission.submission_num, submission_date, amendment_date,amendment_reason_id: cccc, submission_type_id: cccc, submission_source_id: submission_sources.name, submission_method_id: submission_methods.name|XXX|

| oversight_authorities (multiple) xxxx oversight_authorities.country, organization|XXX|
| participating_sites (multiple) xxxx participating_sites.protocol_id, program_code, contact_name, contact_phone, contact_email, organization_id: organizations.name, person_id: people.fname, mname, lname|XXX|

|Processing Status processing_status_wrappers.status_date, processing_status_id: processing_statuses.name |XXX|
| Trial co leads (multiple) xxxx trial_co_lead_orgs.organization_id: organizations.name|XXX|
| Co-PIs trial_co_pis.person_id : people.fname, mname, lname|XXX|
| Trial Status trial_status_wrappers.status_date, why_stopped, trial_status_id: trial_statuses.name|XXX|


Scenario: #2 I can export the results into an Excel spreadsheet
Given I have executed a search in CTRP
And the results are displayed in a table
When I select the export to Excel option
Then the contents of the search result will be export to an Excel format spreadsheet
And I will be able to open and save the spreadsheet



