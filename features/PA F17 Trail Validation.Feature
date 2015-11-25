@PA @global
Feature: PA F17 Trial Validation (Submission)

As any CTRP PA User, I can enter Trial Validaiton (Submission) 

Scenario: #1 I can view, edit and enter different Protocol Identifiers for a trial
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And the NCI ID is displayed
And I can edit the Lead Organizaiton identifier
And I can optionally enter, edit or delete one or more Other Trial Identifiers
Then the trial Other Identifiers section will be complete

Scenario: #2 I can enter the Official Title for the trial
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I edit the Offical Title
Then the Offical Title will be complete

Scenario: #3 I can enter the Phase for the trial
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I edit the trial Phase
|0|
|I|
|I/II|
|II|
|II/III|
|III|
|IV|
|NA|
Then the Phase will be complete

Scenario: #4 I can enter if the trail is a pilot
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I edit if the trial is a pilot
|Yes|
|No|
Then the pilot selection will be complete

Scenario: #5 I can enter the Primary Purpose for the trial
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I edit the Primary Purpose
|Treatment|
|Prevention|
|Supportive Care|
|Screening|
|Diagnostic|
|Health Services Research|
|Basic Science|
|Other|
Then the Primary Purpose will be complete

Scenario: #6 I can view the study Primary Purpose Description for the trial
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I the Primary Purpose is "Other"
When the Primary Purpose Description is dispalyed 
Then a description must be entered

Scenario: #7 I can associate an organization as the Lead Organization on a clinical trial
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, IRB) are displayed
Then I can select an organization from the list or search for an organization
And the selected organization will be associated to the trail as the Lead Organization

Scenario: #8 I can associate a person as the Principal Investigator on a clinical trial
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When I have performed a person look-up
And I have selected a person as the trial's Principal Investigator
Then the selected person will be associated to the trial as Principal Investigator

Scenario: #9 I can associate an organization as the Sponsor Organization on a clinical trial
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (Lead , IRB) are displayed
Then I can select an organization from the list or search for an organization
And the selected organization will be associated to the trail as the Sponsor

Scenario: #10 I can define the Responsible Party Type as either the Sponsor, Principal Investigator, or Sponsor-Investigator
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When I select the Responsible Party Type from a list of options as:
| Sponsor |
| Principal Investigator |
| Sponsor-Investigator |
Then the selected value will be recorded as the Responsible Party Type

Scenario: #11 I can select an Investigator when the Responsible Party is the Sponsor-Investigator
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When the Responsible Party Type is Sponsor-Investigator
And I have performed a person search
And I have selected a person as the Investigator
Then the person selected will be recorded as the Investigator for the Sponsor-Investigator Responsible Party and the Sponsor Organization will be recorded as the Investigator’s Affiliation Organization

Scenario: #12 I can define the Investigator’s Title
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When I enter the Title for the Investigator (Field will be prefilled with “Principal Investigator”)
Then the selected value will be recorded as the Responsible Party Type

Scenario: #13 I can associate an organization an Affiliation of the Investigator
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I have selected an organization as Affiliation of the Investigator
And the Responsible Party Type is Principal Investigator
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
Then the selected organization will be the Affiliation of the Investigator for the trial

Scenario: #14 I can view and edit the Data Table 4 Funding Catagory
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And see the valus for Data Table 4 Funding Catagory
When I select a different Data Table 4 Funding Catagory
|National|
|Externally Peer-Reviewed|
|Institutional|
|Industrial|
|Other|
|Expanded Access|
Then the selected value for Data Table 4 Funding Catagory will be associated with the trial

Scenario: #15 I can associate one or more organizations as the Data Table 4 Funding Source 
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
Then the selected organization will be associated to the trial as a Data Table 4 Funding Source

Scenario: #16 I can unassociate one or more organizations as the Data Table 4 Funding Source
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When I have selected the organization to remove from the Data Table 4 Funding Source
Then the selected organization will not be associated to the trial as a Data Table 4 Funding Source

Scenario: #17 I can view and edit the Program Code 
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When I select the Program Code field I can edit the value for Program Code
Then the selected value for Program Code will be associated with the trial

Scenario: #18 I can add and edit the Amendment Reason Code 
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And the trial is an amendment 
When I select the Amendment Reason Code from the list:
|Administrative|
|Scientific|
|Both|
Then the selected value for  Amendment Reason Code will be associated with the trial

Scenario: #19 Cancel Trial Validation 
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When select Cancel
Then the information entered or edited for the Trail will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #20 Save Trial Validation
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When select save 
Then the information entered or edited for the trail will be saved to the trial record

Scenario: #21 Accept Trial Validation
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When select Accept
Then the information entered or edited for the trail will be saved to the trial record
And the trial processing status will be Accepted 
And the trial milestone Submission Accepted Date will be created with the current date and time 
And the trail acceptance e-mail will be sent to the trial submitter

Scenario: #22 Reject Trial Validation
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And I select Reject
When I select a Rejection Reason from the list:
|Out of Scope|
|Duplicate|
|Other|
And can optionally add a Rejection Reason Comment
Then the information entered or edited for the trail will be saved to the trial record
And the trial processing status will be Rejected
And the trial milestone Submission Rejection Date will be created with the current date and time 
And the trail rejection e-mail will be sent to the trial submitter

Scenario: #23 Place On Hold Trial Validation
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
When I select Place On Hold
Then the information entered or edited for the trail will be saved to the trial record
And the "On Hold Info" screen will be displayed

Scenario: #24 Accept Trial Validation Error Non Import Non Amemdment
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And the study souce is:
|National|
|Externally Peer-Reviewed|
|Institutional|
When select Accept
And any of the mandatory fields have not be entered:
|Lead Organizaiton identifier|
|Official Title|
|Phase|
|Primary Purpose|
|Lead Organization|
|Principal Investigator|
|Sponsor Organization|
|Responsible Party|
|Investigator|
|Investigator Title|
|Investigator Affiliation|
Then a warning message will be displayed stating the missing information

Scenario: #25 Accept Trial Validation Error Non Import Amemdment
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And the study souce is:
|National|
|Externally Peer-Reviewed|
|Institutional|
When select Accept
And any of the mandatory fields have not be entered:
|Lead Organizaiton identifier|
|Official Title|
|Phase|
|Primary Purpose|
|Lead Organization|
|Principal Investigator|
|Sponsor Organization|
|Responsible Party|
|Investigator|
|Investigator Title|
|Investigator Affiliation|
|Amendment Reason Code|
Then a warning message will be displayed stating the missing information

Scenario: #26 Accept Trial Validation Errors Imported
Given I have selected a trial for Trail Validation 
And I am on the Trial Validation (Submission) screen
And the study souce is:
|Industrial|
|Other|
|Expanded Access|
When select Accept
And any of the mandatory fields have not be entered:
|Lead Organizaiton identifier|
|Official Title|
|Phase|
|Primary Purpose|
|Lead Organization|
Then a warning message will be displayed statinging the missing information