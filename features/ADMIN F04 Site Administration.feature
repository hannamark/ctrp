@Admin
Feature: As a CTRP User with Administration privileges, I can grant Site Administrator privileges to CTRP Users with the same site affiliation

Scenario: #1 I can view CTRP Users with the same site affilition and their Site Administration privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administation feature
Then I will see a list of all CTRP Users with the same Site Affiliation as I have listing:
| First Name |
| Last Name |
| Email |
| Organizational Affiliation |
And the list will display an indicator if the CTRP Users have Site Administrator privileges

Scenario: #2 I can search for CTRP Users with the same site affilition and their Site Administration privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administation feature
And I enter search criteria as
| Last Name |
| First Name |
| Email |
And I select the Search option
Then I will see a list of all CTRP Users with the same Site Affiliation as I have, that match the search criteria, listing:
| First Name |
| Last Name |
| Email |
| Organizational Affiliation |
And the list will display an indicator if the CTRP Users have Site Administrator privileges

Scenario: #3 I can enable Site Administrative privileges for CTRP Users with the same site affilition
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administation feature
And I will see a list of all CTRP Users with the same Site Affiliation as I have listing:
| First Name |
| Last Name |
| Email |
| Organizational Affiliation |
And the list will display an indicator if the CTRP Users have Site Administrator privileges
When I select the option for a displayed CTRP User to have Site Administrative Privileges
Then the CTRP system will change the privileges for the CTRP User to a Site Administrator
And the CTRP User will be able to access the Administrative features in CTRP

Scenario: #4 I can disable Site Administrative privileges for CTRP Users with the same site affilition
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administation feature
And I will see a list of all CTRP Users with the same Site Affiliation as I have listing:
| First Name |
| Last Name |
| Email |
| Organizational Affiliation |
And the list will display an indicator if the CTRP Users have Site Administrator privileges
When I select the option for a displayed CTRP User to disable Site Administrative Privileges
Then the CTRP system will remove the privileges for the CTRP User as a Site Administrator
And the CTRP User will no longer be able to access the Administrative features in CTRP