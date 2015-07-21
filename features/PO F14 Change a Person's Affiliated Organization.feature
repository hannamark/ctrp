@PO @Global
Feature: Change a Person's Affiliated Organization

Scenario: As a Po Curator, I can change a Person Record Organizational Affiliation information
Given I know which person's organizational affiliation I want to change
And I am logged in to CTRP PO application
And I have searched for a Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
And I select an Affiliated Organization
When I select the option to change a Person's Affiliated Organization
And I submit my change request
Then the system should set the selected organization as the Person Record Affiliated Organization
And the effective date should be the current date or entered date
And the Affiliated Organization status should be "Active"
And the previous Person Record Affiliate Organization should have an expiration date of the current date or entered date
And my name should be listed as last update with the current date and time
And the Affiliated Organization status should be "Inactive"

