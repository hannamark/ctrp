@Global @Reg
Feature: As a CTRP User, I can identify a trial by NCT ID for import from ClinicalTrials.gov

Scenario: #1 I can search for an Industrial or Other trial by NCT ID from ClinicalTrials.gov
Given I have selected the option to register an Industrial or Other trial
And I am on the Import ClinicalTrials.gov Trials screen
When I have entered a NCT Number
Then the Search Studies feature will indicate if the NCT ID is a valid NCT ID in ClinicalTrials.gov
And the Search Studies feature will indicate if a trial with the NCT ID has been registered in CTRP

Scenario: #2 I can import an Industrial trial by NCT ID from ClinicalTrials.gov
Given I have selected the option to import an Industrial trial
And I am on the Import ClinicalTrials.gov Trials screen
When I have entered a NCT Number
And the Search Studies feature indicates that the trial has not been registered in CTRP
And the trial NCT ID, Status, and Study Title, Conditions, and Interventions are displayed
Then I can import the trial information from ClinicalTrials.gov into CTRP
And the trial Study Souce will be listed as Industrial
@ClinicalTrials.gov XML to CTRP fields are listed in Jira PO-6482

Scenario: #3 I can import a trial with Study Source 'Other' by NCT ID from ClinicalTrials.gov
Given I have selected the option to import an 'Other' trial
And I am on the Import ClinicalTrials.gov Trials screen
When I have entered a NCT Number
And the Search Studies feature indicates that the trial has not been registered in CTRP
And the trial NCT ID, Status, and Study Title, Conditions, and Interventions are displayed
Then I can import the trial information from ClinicalTrials.gov into CTRP
And the trial Study Source will be listed as Other
@ClinicalTrials.gov XML to CTRP fields are listed in Jira PO-6482

Scenario: #4 I can add my site as a participating site after a trial is imported from ClinicalTrials.gov
Given I have selected the option to import an Industrial or 'Other' trial
And I am on the Import ClinicalTrials.gov Trials screen
And I have entered a NCT Number
And I have selected the option to Import from ClinicalTrials.gov
Then the trial information will be displayed including
Title
Phase
Trial Type
Primary Purpose
Secondary Purpose
Lead Organization
Study Source
Funding Source
Collaborators
And I can select the "Add My Site" function to add my site as a participating site

Scenario: #5 I can enter my site information as a participating site after a trial is imported from ClinicalTrials.gov
Given I have selected the option to import an Industrial or 'Other' trial
And I have completed the import
And I have selected the option to "Add My Site"
Then I can enter my Local Trial Identifier
And look-up and add the Site Principal Investigator
And enter a Program Code
And enter the Recruitment Status and and Recruitment Status Date
