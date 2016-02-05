@PA @global
Feature: PA F05 Trial History Information - Audit Trail.Feature

As any CTRP PA User, I can View the Trial History Information Audit Trail

Scenario: #1 I can view Trial History Information Audit Trail
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
|masking (masking_id: maskings/Name|
|masking_role_subject
|masking_role_investigator
|masking_role_caregiver
|masking_role_outcome_assessor
|allocations (allocation_id: allocations/Name)|
|study_classification (study_classification_id: study_classifications/Name)|
|gender (gender_id: genders/Name)|
|min_age_unit (min_age_unit_id: age_unit/name)|
|max_age_unit (max_age_unit_id: age_unit/name))|
|anatomic_site (anatomic_site_id:  anatomic_sites/Name)|
|num_of_arms|
|verification_date|
|sampling_method|
|study_pop_desc|
|board_name|
|board_affiliation (board_affiliation_id:  Organizations/Name)|
|submission number|
|Submission date|
|Submission type|
|Submission source|
|Submission Method|
|Admendment Number|
|Milestone Name|
|Processing Status Name|
|Other ID (multiple)|
|Markers Name (multiple) markers.name, markers.evaluation_type_id evaluation_types.name, markers.assay_type_id assay_types.name, markers.biomarker_use_id biomarker_uses.name, markers.biomarker_purpose_id biomarker_purposes.name, marker.specimen_type_id specimen_types.name, markers.record_status|
|Outcome Measure  (multiple) outcome_measures.outcome_measure_type_id: outcome_measures_types.name,  outcome_measures.title, outcome_measures.time_frame, outcome_measures.description, outcome_measures.safety_issue |
|eligibility criteria (multiple) other_criteria.criteria_type, other_criteria.criteria_desc |
|Associated Trials (multiple)  associated_trials.trial_identifier, identifier_type identifier_types.code, name  |
|Disease and Condition (multiple)  diseases.preferred_name, diseases.code, diseases.thesaurus_id, diseases.display name  |
|Interventions (multiple)interventions.name, other_name, description, intervention_type_id  intervention_types.code, name  |
|arms_groups (multiple) arms_groups.label,type,description, intervention_id intervention_types.code, name |
|subgroup Stratification Criteria (multiple) sub_groups.code, sub_groups.description |



trial_ownerships.user_id users.username(s)
trial_documents.filename, document_type, document_subtype
alternative_titles.category, source, title


central_contacts.phone, e-mail, central_contact_type_ID, central_contact_types.name person_ID People.name
citations
collaborators.org_name,organization_id organizations.name
diseases
grants.funding_mechanism, institute_code,nci,serial_number
ind_ides.ind_ide_type, grantor, nih_nci,holder_type_id, expanded_access_type_id, expanded_access, exempt, ind_ide_number
links
milestones_wrappers
submissions
on_holds
other_criteria
other_ids
outcome_measures
oversight_authorities
participating_sites
processing_status_wrappers
sub_groups
trial_co_lead_orgs
trial_co_pis
trial_status_wrappers



Scenario: #2 I can export the results into an Excel spreadsheet
Given I have executed a search in CTRP
And the results are displayed in a table
When I select the export to Excel option
Then the contents of the search result will be export to an Excel format spreadsheet
And I will be able to open and save the spreadsheet



