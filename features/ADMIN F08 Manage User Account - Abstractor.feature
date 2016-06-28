@Admin @Global 
Feature: ADMIN F08 Manage User Account - Abstractor

As someone with a CTRP Abstractor or CTRP Super Abstractor role, I can account information

Scenario: #1 I can view all CTRP Users 
Given I am logged into CTRP 
And I have Abstractor  privileges
When I select the Site Administation feature (User Portal)
Then I will see a list of all CTRP Users listing:
|Username|
| First Name |
| Last Name |
| Email |
| Organizational Affiliation |
| Organization Family|
And the list will display an indicator if the CTRP Users have Site Administrator privileges 
And the list will display an indicator if the CTRP Users will receive e-mails
And Status
And Current Status Date

Scenario: #2 I can search for CTRP Users 
Given I am logged into CTRP 
And I have Abstractor  privileges
When I select the Site Administation feature
And I enter search criteria as
|Username|
|Last Name |
|First Name |
|Email |
|Organization|
|Family|
|Site Admin Privilege|
|Status|
And I select the Search option
Then I will see a list of all CTRP Users with the same Site Affiliation as I have, that match the search criteria, listing:
|Username|
|Last Name |
|First Name |
|Email |
|Organization|
|Family|
And the list will display an indicator if the CTRP Users have Site Administrator privileges
And the list will display an indicator if the CTRP Users will receive e-mails
And the list will be ordered by Last Name and then First name
And the list can be sorted by
|Username|
|Last Name |
|First Name |
|Email |
|Organization|
|Family|
|Site Admin Privilege|
|Status|
|Status Date (Current Status Date)|

Scenario: #3 I can enter or update account information
Given I am logged into CTRP
And I have selectd a CTRP User 
When I enter or edit information in the following required fields
|Email Address |
|First Name |
|Last Name |
|Street Address |
|City |
|ZIP/Postal Code |
|Phone Number |
And I select the following required information
|Country |
|State |
And I enter the folowing option fields
|Middle Initial |
|PRS Organization Name |
And I select to either receive or not receive email notifications
And I can view
|Status|
|Role|
|Organizational Affiliation |
|Username|
|Domain|
And I select the Save option
Then the account information will be updated in CTRP


