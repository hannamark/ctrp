@PO @Global
Feature: PO F14 Change a Person's Affiliated Organization

Scenario: As a Po Curator, I can change a Person Record Organizational Affiliation information
Given I know which person's organizational affiliation I want to change
And I am logged in to CTRP PO application
And I have searched for a Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
When I change a Person's Affiliated Organization with Effective Date and Expiration Date and save it
Then the Person record Affiliated Organization information should be updated
And logout



