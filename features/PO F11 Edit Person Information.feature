@PO @Global
Feature: Edit Person Information

Scenario: As a Po Curator, I can Edit Person record name information
Given I know which person record I want to edit
And I am logged in to CTRP PO application
And I have searched for a person and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit person information screen
When I change the name of the Person I wish to edit
And I set the Person status to either Pending or Active
And I submit my edit request
Then the system should change the Person name in the Person record to the new name

Scenario: As PO Curator, I can Edit a Person record phone number
Given I know which Person record I want to edit
And I am logged in to CTRP PO application
And I have searched for a Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
When I change the phone number of the Person I wish to edit
And I submit my edit request
Then the system should change the phone number in the Person record to the new phone number

Scenario: As a PO Curator, I can Edit a Person record email
Given I know which Person record I want to edit
And I am logged in to CTRP PO application
And I have searched for an Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
When I change the email of the Person I wish to edit
And I submit my edit request
Then the system should change the email address in the Person record to the new email address

Scenario: As a PO Curator, I can Edit a Person record Affiliated Organization effective and expiration dates
Given I know which organization I want to edit
And I am logged in to CTRP PO application
And I have searched for a Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
And I select an Affiliated Organization
When I change the effective date or expiration date of the Affiliated Organization I wish to edit
And I submit my edit request
Then the system should change the effective date or expiration date of the Affiliated Organization in the Person Record

Scenario: As a PO Curator, I can Edit a Person record and add an Affiliated Organization
Given I know which organization I want to edit
And I am logged in to CTRP PO application
And I have searched for a Person record and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit Person information screen
And I select the function to add an Affiliated Organization
When I select an additional Affiliated organization
And I enter the Affiliate organization effective date
And I submit my edit request
Then the system should add the Affiliated Organization with the effective date in the Person Record

Scenario: As a PO Curator, I can edit Person records with multiple parameters
Given I know which Person record I want to edit
And I am logged in to CTRP PO application
And I have searched for a Person and found the one I wish to edit
And I have selected the function Edit Person
And I am on the edit person information screen
When I change the Person Prefix
And I change the Person First Name
And I change the Person Middle Name
And I change the Person Last Name
And I change the Person Suffix
And I change the Person Email
And I change the Person Phone
And I change an Affiliated Organization and Effective Date and Expiration Date
Then the system should update the Person record with the edited information


