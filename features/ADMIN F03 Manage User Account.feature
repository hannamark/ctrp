@Admin @Global 
Feature: ADMIN F03 Manage User Account

As someone with a CTRP User Account, I can manage my account information

Scenario: #1 I can enter or update my account information
Given I am logged into CTRP
And I select my username 
And the user account information screen is displayed for my account
When I enter or edit information in the following required fields
| Email Address |
| First Name |
| Last Name |
| Street Address |
| City |
| ZIP/Postal Code |
| Phone Number |
And I select the following required information
| Country |
| State |
| Organizational Affiliation |
And I enter the folowing option fields
| Middle Initial |
| PRS Organization Name |
And I select to either receive or not receive email notifications
And I can view the following fields for my account
|Username|
|Domain|
|Status|
|Role|
And I select the Save option
Then my account information will be updated in CTRP


Scenario: #3 Admin Access for change to an organization in Family
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
And the selected organiziton is in my organization Family
Then the new organization will be affilliated to my account

Scenario: #4 Admin Access for change to an organization not in my Family
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
And the selected organiziton is not my organization Family
When I select save 
Then a warning message will be displayed "If you change your organization, you will lose any existing Site Admin, Report Viewing, Accrual Submission and Trial Ownership privileges and your account will be set to a Pending status requiring reauthorization"
When I select OK
Then the new organization will be affilliated to my account
And my role will be set to Trial Submitter
And my status will be set to Pending
And the system will send the "CTRP Account Request" email to appsupport for an organizaiton change to a different family (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin) 

Scenario: #5 Admin Access for change to a different organization not associated with a family 
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
When I select save 
Then a warning message will be displayed "If you change your organization, you will lose any existing Site Admin, Report Viewing, Accrual Submission and Trial Ownership privileges and your account will be set to a Pending status requiring reauthorization"
When I select OK
Then the new organization will be affilliated to my account
And my role will be set to Trial Submitter
And my status will be set to Pending
And the system will send the "CTRP Account Request" email to appsupport for an organizaton change to a different family (Email list in the shared drive under Functional/Administration: CTRP System Generated Emails Admin)

Scenario: #6 I can view a users Trials
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed (Protocol Trials)
And All the trials the user submitted will be displayed (Protocol and Imported Trials)
And All the trials the user is a participationg site on will be displayed (Protocol and Imported Trials)

Scenario: #7 I can view a users Trials - Owned (CTRP-RO, Account Approver, Abstractor, Curator, Super, Admin)
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed (Protocol Trials)including the following fields:
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
|Record Verification Date|
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by|

Scenario: #7a I can view a users Trials - Owned (roles: Site Admin, Trial Submitter)
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed (Protocol Trials)including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
And the default sort order will be by NCI ID with the newest trial ID first
And I can sort the trials by the fields:
|NCI Trial Identifier|
|Lead Organization|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
And I can export the list of owned trials to Excel including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|


Scenario: #8 I can view a users Trials - Submitted (CTRP-RO, Account Approver, Abstractor, Curator, Super, Admin)
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed (Protocol and Imported Trials)including the following fields:
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
|Record Verification Date|
|On Hold Reasons|
|On Hold Dates|
|current Submission Type (O for Original, A for Amendment, U for Updated|
|Submission Method|
|Checked Out for Admin. Use by|
|Checked Out for Scientific Use by

Scenario: #8a I can view a users Trials - Submitted (roles: Site Admin, Trial Submitter)
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed (Protocol and Imported Trials)including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
And the default sort order will be by NCI ID with the newest trial ID first
And I can sort the trials by the fields:
|NCI Trial Identifier|
|Lead Organization|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
And I can export the list of owned trials to Excel including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|

Scenario: #9 I can view a users Trials - Participating Sites (CTRP-RO, Account Approver, Abstractor, Curator, Super, Admin)
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is a a participating site on will be displayed (Protocol and Imported Trials)including the following fields:
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

Scenario: #9a I can view a users Trials - Participating Sites (roles: Site Admin, Trial Submitter)
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is a a participating site on will be displayed (Protocol and Imported Trials)including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
And the default sort order will be by NCI ID with the newest trial ID first
And I can sort the trials by the fields:
|NCI Trial Identifier|
|Lead Organization|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|
And I can export the list of owned trials to Excel including the following fields:
|NCI Trial Identifier|
|Lead Organization|
|CTEP ID|
|DCP ID|
|Official Title|
|Current Processing Status|
|Current Processing Status Date|
|Clinical Research Category|
|Record Verification Date|

Scenario: #10 I can view the trial details - Site User (Site Admin and Site User) 
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed
And All the trials the user is a participating site on will be displayed
And I select a trial
Then the trial information will be displayed for the selected trial (Reg F25 View Clinical Trails) 

Scenario: #11 I can view the trial details - CTRP User (CTRP-RO, Account Approver, Abstractor, Curator, Super, Admin)
Given I am logged into CTRP
And I select the User from the list
Then the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And All the trials the user submitted will be displayed
And All the trials the user is a participating site on will be displayed
And I select a trial
Then the system will open the trial abstraction/validation screens for the trial 
And the side bar menu will be displayed for the trial
And the trial overview section will be displayed

Scenario: #12 Paging
Given I am logged into CTRP 
And I select the Registered User Details
And I can select a user
And the user's profile will be displayed
And All the trials the user is an owner of will be displayed
And the trial list will be paginated
And All the trials the user submitted will be displayed
And the list will be paginated
And All the trials the user is a participating site on will be displayed
And the list will be paginated
       