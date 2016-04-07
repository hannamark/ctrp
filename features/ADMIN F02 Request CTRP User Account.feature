@Admin @Global 
Feature: ADMIN F02 Request CTRP User Account

As someone without a CTRP User Account, I can request a user account

Scenario: #1 I can request a user account - NIH
Given I have access to a CTRP user sign up screen
And my Domain is "NIH"
When I enter my username 
  And I enter my First name 
  And I enter my Last name 
  And I select my Domain
  And I enter my e-mail address
  and I select my Organization affliation from an auto-select Organization dropdown 
  and I select the functionality I desire from the list:
|View Information|
|Manage and Curate Persons, Organizations and Families|
|Manage and Abstract Trial Registrations and Results|
|Manage Abstraction functionally|
|Administer/Approve CTRP Accounts|
|Administer and Manage all Functionality and Configurations|
Then the system will save the User request to the database 
And the system will send an email to the Account Admin(s) for that new request


Scenario: #2 I can request a user account - NIHEXT
Given I have access to a CTRP user sign up screen
And my domain is "NIHEXT"
When I enter my username 
  And I enter my First name 
  And I enter my Last name 
  And I select my Domain
  And I enter my e-mail address
  and I select my Organization affliation from an auto-select Organization dropdown 
  and I select the functionality I desire from the list:
|Submit Trials|
|Manage/Approve Trial ownership, Accruals, Site accounts |
Then the system will save the User request to the database 
And the system will send an email to the Account Admin(s) for that new request

Scenario: #3 I can request a user account - Federated
Given I have access to a CTRP user sign up screen
And my domain is a federated domain (not NIH or NIHEXT)
When I enter my username 
  And I enter my First name 
  And I enter my Last name 
  And I select my Domain
  And I enter my Password
  And I enter my password confirmation
  And I enter my e-mail address
  and I select my Organization affliation from an auto-select Organization dropdown 
Then the system will save the User request to the database 
and the desired functionality will be:
|Submit Trials|
And the system will send an email to the site Admin(s) for the organization family for the organization that is selected for that new request

 

