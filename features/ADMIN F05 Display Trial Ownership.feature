@Admin @Global 
Feature: ADMIN F05 Display Trial Ownership (Registered user Details)

As a CTRP User I view registered user details

Scenario: #1 I can view Registered User Details - CTRP-RO, Abstractor, Super, Admin
Given I am logged into CTRP
And I select the Registered User Details
Then I will see a list of all CTRP Users:
| Last Name, First Name, Organization Affiliation|
And I can select a user
And the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed

Scenario: #1a I can view Registered User Details as a Site Administrator
Given I am logged into CTRP
And I select the Registered User Details
Then I will see a list of all CTRP Users in my Family:
| Last Name, First Name, Organization Affiliation|
And I can select a user
And the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed

Scenario: #1b I can view Registered User Details as a Site Trial Submitter
Given I am logged into CTRP
And I select the Registered User Details
Then I will only see my name in the list of CTRP Users:
| Last Name, First Name, Organization Affiliation|
And I can select a user
And the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed


Scenario: #2 I can view Registered User Details - user details
Given I am logged into CTRP
And I select the Registered User Details
Then I will see a list of all CTRP Users:
| Last Name, First Name, Organization Affiliation|
And I can select a user
And the user's profile will be displayed including the following:
|First Name|
|Last Name|
|Address (street, city, state, zip)|
|Phone #, Phone Ext|
|E-mail|
|User Name |
|Organization ID, |Organizational Affiliation (Selectable to see org details)|
|Organization Family|
|PRS Org Name|
|Role|

Scenario: #3 I can view Registered User Details - Trials Owned
Given I am logged into CTRP
And I select the Registered User Details
Then I will see a list of all CTRP Users:
| Last Name, First Name, Organization Affiliation|
And I can select a user
And the user's profile will be displayed including the following:
And All the trials the user is a trial owner will be displayed including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Trial Sub-type|
|Record Verification Date|
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated)|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
|Action - View TSR|
And the default sort order will be by NCI ID with the newest trial ID first
And I can sort the trials by the fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Trial Sub-type|
|Record Verification Date|
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
And I can export the list of owned trials to Excel including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Trial Sub-type|
|Record Verification Date|
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|


Scenario: #4 I can view Registered User Details - Submitted Trials
Given I am logged into CTRP 
And I select the Registered User Details
Then I will see a list of all CTRP Users:
| Last Name, First Name, Organization Affiliation|
And I can select a user
And the user's profile will be displayed 
And All the trials the user submitted will be displayed including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Trial Sub-type|
|Record Verification Date|
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
|Action - View TSR|
And the default sort order will be by NCI ID with the newest trial ID first
And I can sort the trials by the fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Trial Sub-type|
|Record Verification Date|
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|
And I can export the list of owned trials to Excel including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|Lead Org PO ID|
|Processing Priority|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Milestone, Milestone Date|
|Current Admin Milestone, Milestone Date|
|Current Scientific Milestone, Milestone Date|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Trial Sub-type|
|Record Verification Date|
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|

Scenario: #5 I can view the trial details
Given I am logged into CTRP 
And I select the Registered User Details
And I can select a user
And the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed
And I select a trial
Then I will open the trial abstraction for the trial 
And the side bar menu will be displayed for the trial
And the trial overview section will be displayed


Scenario: #6 Paging
Given I am logged into CTRP 
And I select the Registered User Details
And I can select a user
And the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And the trial list will be paginated
And All the trials the user submitted will be displayed
And the list will be paginated

       
