@PO @Global
Feature: Edit Person Information

Scenario: As a Po Curator, I can Edit Person record name information
Given I know which person record I want to edit
And I am logged in to CTRP PO application
And I have searched for a person and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit person information screen
When I change the name of the organization I wish to edit
And I set the Person status to either Pending or Active
And I submit my edit request
Then the system should change the Person name in the Person record to the new name
And my name should be listed as last update with the current date and time
And the organization status should be Pending or Active as indicated

Scenario: As PO Curator, I can Edit a Person record phone number
Given I know which Person record I want to edit
And I am logged in to CTRP PO application
And I have searched for a Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
When I change the phone number of the Person I wish to edit
And I submit my edit request
Then the system should change the phone number in the Person record to the new phone number
And my name should be listed as last update with the current date and time

Scenario: As a PO Curator, I can Edit a Person record email
Given I know which Person record I want to edit
And I am logged in to CTRP PO application
And I have searched for an Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
When I change the email of the Person I wish to edit
And I submit my edit request
Then the system should change the email address in the Person record to the new email address
And my name should be listed as last update with the current date and time

Scenario: As a PO Curator, I can Edit a Person record Affiliated Organization status
Given I know which organization I want to edit
And I am logged in to CTRP PO application
And I have searched for a Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
And I select an Affiliated Organization
When I change the status of the Affiliated Organization I wish to edit
And I submit my edit request
Then the system should change the status of the Affiliated Organization in the Person Record
And my name should be listed as last update with the current date and time

Scenario: As a PO Curator, I can add a Person record Affiliated Organization
Given I know which organization I want to edit
And I am logged in to CTRP PO application
And I have searched for a Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
And I have have performed a search of organizations and selected an organization
When I select an organization to affiliate with the Person record
And I submit my edit request
Then the system should add the Affiliated Organization in the Person Record
And the current Affiliated Organization status should be Active and the Status Date should be the current date and time
And my name should be listed as last update with the current date and time

Scenario: As a PO Curator, I can Edit Person records with multiple parameters
Given I know which Person record I want to edit
And I am logged in to CTRP PO application
And I have searched for a Person and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit person information screen
And I change multiple parameters of the Person I wish to edit
And I submit my edit request
Then the system should change all the updated parameters in the Person record
And my name should be listed as last update with the current date and time


