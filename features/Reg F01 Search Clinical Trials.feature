@Reg @global
Feature: Reg F01 Search Clinical Trials
As any CTRP User, I can search CTRP clinical trial by various criteria and trial ownership

Scenario: #1 I can search for my clinical trials registered in CTRP
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select the option to search "My Trials"
Then CTRP will display all trials where I am listed as a Trial Owner and the trials match the trial search criteria
And the Clinical Trials Search Results will display the following sorted by NCI Trial Identifier:
|NCI Trial Identifier|
|Title|
|Lead Organization|
|Lead Org Trial Identifier|
|Principal Investigator|
|ClinicalTrials.gov Identifier|
|Other Identifiers|
|Current Trial Status|
|Current Processing Status|
|Available Actions|
|Accrual Disease Terminology|
|Sites|
|Phase|
|Primary Purpose|
|Category|
|Trial Start Date|
|Responsible Party|
|Sponsor|
|Summary 4 Funding Sponsor Type|
|Record Verification Date|
|Submitter|
|Primary Completion Date|
|Last Update Submitted|
|Last Updater Name|
|Last Amendment Submitted|
|Last Amender Name|
|On-Hold Reason|

Scenario: #2 I can search all clinical trials registered in CTRP
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select the option to search "All Trials"
Then CTRP will display all trials that match the trial search criteria
And the Clinical Trials Search Results will display the following sorted by NCI Trial Identifier:
|NCI Trial Identifier|
|Title|
|Current Trial Status|
|Lead Organization|
|Lead Org Trial Identifier|
|Principal Investigator|
|ClinicalTrials.gov Identifier|
|Other Identifiers|
|Sites|
|Available Actions|


Scenario: #3 I can search for my saved draft clinical trials registrations in CTRP
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select the option to search "Saved Drafts"
Then CTRP will display all of my draft registrations that match the trial search criteria
And the Clinical Trials Search Results will display the following sorted by NCI Trial Identifier:
|Temp Trial Identifier|
|Title|
|Lead Organization|
|Lead Org Trial Identifier|
|Action to Complete Registration
|Action to Delete Draft Registration|


Scenario: #4 I can search for clinical trials by Title
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I enter text in the title selection
And select a search option
Then the search results will display trials that contain the title search text

Scenario: #5 I can search for clinical trials by Phase
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select a trial Phase
And select a search option
Then the search results will display trials that match the Phase selected

Scenario: #6 I can search for pilot clinical trials
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select the Pilot "Yes" option
And select a search option
Then the search results will display trials that have the Pilot criteria equal to "Yes"

Scenario: #7 I can search for clinical trials by primary purpose
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select a trial primary purpose
And select a search option
Then the search results will display trials that match the primary purpose selected

Scenario: #8 I can search for clinical trials by protocol identifier
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I enter text in the protocol identifier selection
And select a search option
Then the search results will display trials that contain the protocol identifier search text

Scenario: #9 I can search for clinical trials by associated organization
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select an organization from the organization name search look-ahead
And select a search option
Then the search results will display trials where the organization selected is either lead organization, sponsor, or participating site

Scenario: #10 I can search for clinical trials by associated organization role
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select an organizations from an organization name search look-ahead
And I select a role as Lead Organization, Sponsor, or Participating Site
And select a search option
Then the search results will display trials where the organization selected has the organization role selected

Scenario: #11 I can search for clinical trials by Principal Investigator
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select a person from a person name search
And select a search option
Then the search results will display trials where the person selected is principal investigator

Scenario: #12 I can search for clinical trials by Study Source
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select a Study Source from a list that contains National, Externally Peer-Reviewed, Institutional, Industrial, Other, Expanded Access
And select a search option
Then the search results will display trials with a matching Study Source

Scenario: #13 I can search for clinical trials by multiple criteria
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I have selected or entered multiple search criteria
And selected a search option
Then the search results will display the trials that match all the search criteria selected

