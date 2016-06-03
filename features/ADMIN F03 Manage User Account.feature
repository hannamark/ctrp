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

Scenario: #2 I can request Administrative Access privileges
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select the option to request Admin Access
And the system will send an email to the site Admin(s) for the organization family for the organization that is selected for my account

Scenario: #3 Admin Access for change in an organization in Family
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
And the selected organiziton is in my organization Family
Then the new organization will be affilliated to my account

Scenario: #4 Admin Access for change in an organization not in my Family
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
And the selected organiziton is not my organization Family
Then the new organization will be affilliated to my account
And my role will be set to Trial Submitter
And my status will be set to Pending
And the system will send an email to the site Admin(s) for the organization family for the organization that is selected for my account

Scenario: #5 Admin Access for change in an organization 
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
And I select or change my Organizational Affiliation
Then the new organization will be affilliated to my account
And my role will be set to Trial Submitter
And my status will be set to Pending
And the system will send an email to the site Admin(s) for the organization family for the organization that is selected for my account