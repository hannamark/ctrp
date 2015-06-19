@PO @Global
Feature: Delete Organization

Scenario: As a PO Curator, I can Delete an Organization with no Trial Records
Given I know which organization I want to delete
And I am logged in to CTRP PO application
And I have searched for an organization and found the one I wish to delete
When I have selected the function Delete Organization
And I submit my delete request
And there are no occurrences of the organization in use in CTRP
Then the system will change the organization status to Deleted 
And my name will be listed as last update with the current date and time

Scenario: As a PO Curator, I cannot Delete Organization with Trial Records
Given I know which organization I want to delete
And I am logged in to CTRP PO application
And I have searched for an organization 
And there are occurrences of the organization in use in CTRP
Then the Delete function will be disabled

