@Global @Reg
Feature: Reg F16 Import Trial

As a CTRP User, I can identify a trial by NCT ID for import from ClinicalTrials.gov

Scenario: #1 I can search for an Industrial or Other trial by NCT ID from ClinicalTrials.gov
Given I have selected the option to register an Industrial or Other trial
And I am on the Import ClinicalTrials.gov Trials screen
When I have entered a NCT Number
Then the Search Studies feature will indicate if the NCT ID is a valid NCT ID in ClinicalTrials.gov
And the Search Studies feature will indicate if a trial with the NCT ID has been registered in CTRP

Scenario: #2 I can import an Industrial or Other trial by NCT ID from ClinicalTrials.gov
Given I have selected the option to import an Industrial trial
And I am on the Import ClinicalTrials.gov Trials screen
When I have entered a NCT Number
And the Search Studies feature indicates that the trial has not been registered in CTRP
And the trial NCT ID, Status, and Study Title, Conditions, and Interventions are displayed
Then I can import the trial information from ClinicalTrials.gov into CTRP
And the trial Study Souce will be listed as Industrial
And the XML from ClinicalTrials.gov will be added to the trial related document
And the trial milestone "Submission Received Date" will be added with the date of the import
|Import Mappings are in CTRP AUM\Functional\Registration\ClinicalTrials Import Data Element Mapping v3.docx|
And an email entitled "Imported Trial Record" will be sent to the CTRP import application user (Email list can be found in the shared drive under functional/registration: CTRP System Generated Emails)

Scenario: #3 I can import an Expanded Access trial by NCT ID from ClinicalTrials.gov
Given I have selected the option to import an Expanded Access trial
And I am on the Import ClinicalTrials.gov Trials screen
When I have entered a NCT Number
And the Search Studies feature indicates that the trial has not been registered in CTRP
And the trial NCT ID, Status, and Study Title, Conditions, and Interventions are displayed
Then I can import the trial information from ClinicalTrials.gov into CTRP
And the trial Study Souce will be listed as Industrial
And the trial Research Category will be listed as Expanded Access
And the XML from ClinicalTrials.gov will be added to the trial related document
And the trial milestone "Submission Received Date" will be added with the date of the import
And an email entitled "Imported Trial Record" will be sent to the CTRP import application user (Email list can be found in the shared drive under functional/registration: CTRP System Generated Emails)
And the trial status will match the trial status in ClinicalTrials.gov as:
|Available|
|No Longer Available|
|Temporarily not Available|
|Approved for Marketing|

Scenario: #4a I will not be able to import NIH trial from ClinicalTrials.gov
Given I have selected the option to import a trial from ClinicalTrials.gov
And I have entered a NCT Number
When the XML from ClinicalTrials.gov contains the XML: <agency_class>NIH</agency_class>
Then the error message "Error Message:gov.nih.nci.pa.service.PAException: Unable to import study NCTxxxxxxxx because it does not belong to Industrial/Consortia category" will be displayed

Scenario: #4b I will not be able to import U.S. Federal trial from ClinicalTrials.gov
Given I have selected the option to import a trial from ClinicalTrials.gov
And I have entered a NCT Number
When the XML from ClinicalTrials.gov contains the XML: <agency_class>U.S. Fed</agency_class>
Then the error message "Error Message:gov.nih.nci.pa.service.PAException: Unable to import study NCTxxxxxxxx because it does not belong to Industrial/Consortia category" will be displayed

Scenario: #4c I will not be able to import a trial previously registered in CTRP
Given I have selected the option to import a trial from ClinicalTrials.gov
And I have entered a NCT Number
When the NCT number has been previously registered in CTRP on a trial
And the previously registered trial with the NCT number has not been rejected
And the previously registered trial with the NCT number has not been submission terminated
Then the error message will be displayed "A study with the given identifier already exists in CTRP.  To find this trial in CTRP, go to the Search Trials Page"

Scenario: #4d I will not be able to import a trial for the same lead organization and lead organization ID
Given I have selected the option to import a trial from ClinicalTrials.gov
And I have entered a NCT Number
When the lead organization and lead organization ID for the trial to be imported match the lead organization and lead organization ID for a trial registered in CTRP
And the previously registered trial with the same lead organization and lead organization ID has not been rejected
And the previously registered trial with the same lead organization and lead organization ID has not been submission terminated
Then the error message will be displayed "Error Message: gov.nih.nci.pa.service.PAException: Duplicate Trial Submission: A trial exists in the system with the same Lead Organization Trial Identifier for the selected Lead Organization" 

Scenario: #5 I can add my site as a participating site after a trial is imported from ClinicalTrials.gov
Given I have selected the option to import an Industrial, Expanded Access, or 'Other' trial
And I am on the Import ClinicalTrials.gov Trials screen
And I have entered a NCT Number
And I have selected the option to Import from ClinicalTrials.gov
Then the trial information will be displayed including
|Title|
|Phase|
|Trial Type|
|Primary Purpose|
|Secondary Purpose|
|Lead Organization|
|Study Source|
|Funding Source|
|Collaborators|
And I can select the "Add My Site" function to add my site as a participating site

Scenario: #6 I can enter my site information as a participating site after a trial is imported from ClinicalTrials.gov
Given I have selected the option to import an Industrial, Expanded Access, or 'Other' trial
And I have completed the import
And I have selected the option to "Add My Site"
Then I can enter my Local Trial Identifier
And look-up and add the Site Principal Investigator
And enter a Program Code
And enter the Recruitment Status and and Recruitment Status Date
