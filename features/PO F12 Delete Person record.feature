@PO @Global
Feature: Delete Person Record

Scenario: As a PO Curator, I can Delete a Person record with no Trial Record associations
Given I know which Person Record I want to delete
And I am logged in to CTRP PO application
And I have searched for a Person Record and found the one I wish to delete
When I have selected the function Delete Person Record
And I submit my delete request
And there are no occurrences of the Person Record in use in CTRP
Then the system will change the Person Record status to Deleted 
And my name will be listed as last update with the current date and time

Scenario: As a PO Curator, I cannot Delete Person Records with Trial Record associations
Given I know which Person Record I want to delete
And I am logged in to CTRP PO application
And I have searched for a Person Record 
And there are occurrences of the Person Record in use in CTRP
Then the Delete function will be disabled

