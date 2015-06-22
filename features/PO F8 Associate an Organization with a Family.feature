@PO @Global
Feature: Associate an Organization with a Family

Scenario: As a PO Curator, I can Assign an organization to a Family
Given I know which organization I wish to assign to an Organization Family
And I am logged in to CTRP PO application
And I am on the Organization Family screen
And a list of Organization Family Names is displayed
When I select an Organization Name from a search of organization names
And I select an Organization Family from a list of Organization Families
And I select an effective date which is defaulted to the current date
And I select either Organization or Affiliate Organization Type 
Then a record is created with the Organization Family, the Organization Name, effective date, an Active status, and the Organization Group Type


Scenario: As a PO Curator, I can Remove an organization from a Family
Given I know which organization I wish to remove from an Organization Family
And I am logged in to CTRP PO application
And I am on the Organization Family screen
And a list of Organization Family Names with associated Organization Names and Organization Family Type is displayed
When I select an Organization Family Name, Organization Name, and Organization Family Type
And I select Delete
Then the record with Organization Family, the Organization Name, and the Organization Family Type is marked Inactive
And the current date is recorded as the effective date

