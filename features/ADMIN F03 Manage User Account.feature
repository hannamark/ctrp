@Admin @Global
Feature: ADMIN F03 Manage User Account

As someone with a CTRP User Account, I can manage my account information

Scenario: #1 I can initially enter my account information
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
When I enter information in the following required fields
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
And I select the Save option
Then my account information will be updated in CTRP

Scenario: #2 I can request Administrative Access privileges
Given I am logged into CTRP
And I select the option to update my user account information in CTRP
When I select or change my Organizational Affiliation
Then I will be asked if Admin Access is requested

