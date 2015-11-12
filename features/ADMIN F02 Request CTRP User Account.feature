@Admin @Global 
Feature: ADMIN F02 Request CTRP User Account

As someone without a CTRP User Account, I can request a user account

Scenario: #1 I can request a user account
Given I have access to a CTRP user sign up screen
When I enter my username 
  And I enter my First name 
  And I enter my Last name 
  and I select my Organization affliation from an auto-select Organization dropdown 
  and I select my intended role (options - CTRP user, Site Admin, Super User) 
Then the system will save the User request to the database 
And the system will send an email to the Super User(s) about the new request




 

