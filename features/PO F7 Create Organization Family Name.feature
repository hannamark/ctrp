@PO @Global
Feature: Create Organization Family Name

Scenario: As a PO Curator, I can Create an Organization Family Name
Given I know which organization Family I wish to create
And I am logged in to CTRP PO application
And I am on the Organization Family screen
And a list of Organization Family Names is displayed
When I enter an Organization Family Name
And I submit a new name request
And the new Organization Family Name is not a duplicate of an existing Organization Family Name
Then the new Organization Family Name is added to the list of Organization Family Names

Scenario: As a PO Curator, I can Edit an Organization Family Name
Given I know which organization Family I wish to edit
And I am logged in to CTRP PO application
And I am on the Organization Family screen
And a list of Organization Family Names is displayed
And I know the Organization Family Name I wish to modify
When I select an Organization Family Name to edit
And I enter a changed Organization Family Name
And the changed Organization Family Name is not a duplicate of an existing Organization Family Name
Then the existing Organization Family Name is changed to the entered Organization Family Name

