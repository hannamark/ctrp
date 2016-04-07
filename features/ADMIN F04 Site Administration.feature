@Admin @Global  
Feature: ADMIN F04 Site Administration

As a CTRP User with Site Administration privileges, I can grant Site Administrator privileges to CTRP Users with the same site affiliation

Scenario: #1 I can view CTRP Users with the same site affilition and their Site Administration privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administation feature (User Portal)
Then I will see a list of all CTRP Users with the same Site Affiliation as I have listing:
|Username|
| First Name |
| Last Name |
| Email |
| Organizational Affiliation |
| Organization Family|
And the list will display an indicator if the CTRP Users have Site Administrator privileges 
And Status

Scenario: #2 I can search for CTRP Users with the same site affilition and their Site Administration privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administation feature
And I enter search criteria as
|Username|
| Last Name |
| First Name |
| Email |
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

Scenario: #3 I can enable Site Administrative privileges for CTRP Users with the same site affilition
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administation feature
And I will see a list of all CTRP Users with the same Site Affiliation as I have listing:
|Username|
|Last Name |
|First Name |
|Email |
|Organization|
|Family|
And the list will display an indicator if the CTRP Users have Site Administrator privileges
And Status
When I select a site user
Then the CTRP system will display the user profile for the CTRP User
And I can change the privileges for the CTRP User to 
|Site Administrator|
And the CTRP User will be able to access the Administrative features in CTRP.


