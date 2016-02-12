@PA @global
Feature: PAA F03 Add and Edit Regulatory Information

As any CTRP PA User, I can add and edit Regulatory Information (FDAAA)

Scenario: #1 I can define the Responsible Party Type as either the Sponsor, Principal Investigator, or Sponsor-Investigator
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
When I select the Responsible Party Type from a list of options as:
| Sponsor |
| Principal Investigator |
| Sponsor-Investigator |
Then the selected value will be recorded as the Responsible Party Type

Scenario: #2 I can select an Investigator when the Responsible Party is the Sponsor-Investigator
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
When the Responsible Party Type is Sponsor-Investigator
And I have performed a person search
And I have selected a person as the Investigator
Then the person selected will be recorded as the Investigator for the Sponsor-Investigator Responsible Party 
And the Sponsor Organization will be recorded as the Investigator�s Affiliation Organization

Scenario: #3 I can define the Investigator�s Title
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
When I enter the Title for the Investigator (Field will be prefilled with �Principal Investigator�)
Then the selected value will be recorded as the Responsible Party Type

Scenario: #4 I can associate an organization as an Affiliation of the Investigator
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
And I have selected an organization as an Affiliation of the Investigator (defaulted to Sponsor Organization)
And the Responsible Party Type is Principal Investigator
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
Then the selected organization will be the Affiliation of the Investigator for the trial

Scenario: #5 I can add and edit Regulatory Information for a Regulated Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected one or more Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
And the FDA Regulated Intervention Indicator will be defaulted to the "N/A" setting
And the Section 801 Indicator will be defaulted to the "N/A" setting
And the Data Monitoring Committee Appointed Indicator will be defaulted to the "N/A" setting
And I can select "yes", "No", "NA" FDA Regulated Intervention Indicator
And I can select "Yes", "No", "NA" for Section 801 Indicator
And I can select "Yes", "No", "NA" for Data Monitoring Committee Appointed Indicator
Then the required Regulatory Information for the trial will be associated with the trial


Scenario: #6 I can add and edit Regulatory Information for a non-Regulated Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
And I have selected "No" for FDA Regulated Intervention Indicator
And I have selected "Yes", "No", "NA" for Data Monitoring Committee Appointed Indicator
Then the required Regulatory Information for the trial will be associated with the trial
And the Section 801 Indicator will be set to "No"

Scenario: #7 I can add and edit Regulatory Information for a Regulated Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected one or more Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
And I have selected "Yes" for FDA Regulated Intervention Indicator
Then I have the option to select "Yes", "No" for Section 801 Indicator

Scenario: #8 Save Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information screen
When select save 
Then the information entered or edited on the Regulatory Information screen will be saved to the trial record

Scenario: #9 Cancel Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information screen
When I select Reset 
Then the information entered or edited on the Regulatory Information screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #10 Investigator is not null
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
When I select save
And the Responsible Party Type is �Sponsor Investigator�
And the Investigator is Null
Then a warning message will appear �Please enter the Investigator�

Scenario: #11 Investigator Title is not null
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
When I select save
And the Responsible Party Type is �Sponsor Investigator�
And the Investigator Title is Null
Then a warning message will appear �Please enter the Investigator Title�

Scenario: #12 Investigator Affiliation is not null
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
When I select save
And the Responsible Party Type is �Principal Investigator�
And the Investigator Affiliation is Null
Then a warning message will appear �Please enter the Investigator Affiliation�

Scenario: #13 "Upload from NCI CTRP" Note
Given I have selected a trial to abstract 
And I am on the Trial Regulatory Information screen
Then the label should be displayed below the Trial Regulatory Information section header"
|The information in this section is REQUIRED to enable "Upload from NCI CTRP" in ClinicalTrials.gov:|
And ClinicalTrials.gov it a link to 
|https://clinicaltrials.gov/|

Scenario: #14 Can not have a duplicate trial Oversight Authority Country and Trial Oversight Authority Organization
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information screen
And I have selected a Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected a Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
When I select a Trial Oversight Authority Country and Trial Oversight Authority Organization that has already been associated with this trial
Then a warning message will appear �The Trial Oversight Authority Country and Trial Oversight Authority Organization has already been selected.�

Scenario: #15 Warning for null fields on the Trial Regulatory Information screen
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information screen
When I select save
And any of the following fields <fields> are null
The the following Warning messages <Warning message> will appear and the information associated with the trial will be associated with the trial

Examples:
|<Field>                             |<Warning Message>               |
|Responsible Party Type              |Responsible Party Typeis required for Upload to ClinicalTrials.gov|
|Trial Oversight Authority Country   |Trial Oversight Authority Country is required for Upload to ClinicalTrials.gov|
|Trial Oversight Authority           |Trial Oversight Authority is required for Upload to ClinicalTrials.gov|
|FDA Regulated Intervention Indicator|FDA Regulated Intervention Indicator is required for Upload to ClinicalTrials.gov|
|Section 801 Indicator               |Section 801 Indicator is required for Upload to ClinicalTrials.gov|
