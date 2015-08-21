@PO @Global
Feature: Create Organization Family Name

Scenario: #1 As a PO Curator, I can search Organization Family Information
Given I am logged in to CTRP PO application
When I select the option to search Organization Family
And I enter one or more search criteria as
|Family Name|
|Family Status|
|Family ID|
|Family Type|
Then a list of Family Organization Information that matches the search criteria will be displayed as
|Family ID|
|Family Name|
|Family Status|
|Family Type|
|Organization Family Members|
|Organization Family Member Relationship|

Scenario: #2 As a PO Curator, I can Create an Organization Family Name
Given I know which organization Family I wish to create
And I am logged in to CTRP PO application
And I am on the Organization Family screen
And a list of Organization Family Names is displayed
When I enter an Organization Family Name
And I select a Family Status
And I select a Family Type
And I select an Effective Date
And I save the new Organizational Family information
And the new Organization Family Name is not a duplicate of an existing Organization Family Name
Then the new Organization Family Name is added to the list of Organization Family Names
And I can add Organizations as Family Members

Scenario: #3 As a PO Curator, I can Edit an Organization Family
Given I know which organization Family I wish to edit
And I am logged in to CTRP PO application
And I am on the Organization Family screen
And a list of Organization Family Names is displayed
And I know the Organization Family Name I wish to modify
When I select an Organization Family to edit
Then I can change the Organization Family Status
And I can change the Organization Family Name
And I can change the Organization Family Start Date
And I can add or remove Organizational Family Members

