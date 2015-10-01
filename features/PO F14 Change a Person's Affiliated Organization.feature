@PO @Global
Feature: Change a Person's Affiliated Organization

Scenario Outline: As a Po Curator, I can change a Person Record Organizational Affiliation information
Given I know which person's organizational affiliation I want to change
And I am logged in to CTRP PO application
And I have searched for a Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
When I change a Person's <Affiliated Organization> <effective date> or <expiration date>
And I selecte Save
Then the Person record Affiliated Organization information should be updated

Example:
|Affiliated Organiation||Effective Date||Expiration Date||Result|
|National Cancer Institute||2015/01/01||2015/06/30||True|



