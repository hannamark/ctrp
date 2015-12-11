@PO @Global
Feature: PO F8 Associate an Organization with a Family

Scenario: As a PO Curator, I can Assign an organization to a Family
Given I know which organization I wish to assign to an Organization Family
And I am logged in to CTRP PO application
And I have selected the option to search Families
And the Family Search Results type will be displayed
    
      |Family Name      |
      |Family Status    |
      |Family Type      |
      |Membership Size  |

And Membership size column will only display the total count of active associated organizations
When I select a Family to edit
And I select the option to Add Family Membership
And I Search Organizations and select an Organization
And I select an effective date which is defaulted to the current date
And I select an expiration date which is defaulted to null
And I select either Organization or Affiliate Family Relationship 
Then the Family is updated with the CTRP ID, CTEP ID, Organization Name, Family Relationship, effective date, and expiration date


Scenario: As a PO Curator, I can remove an organization From a Family
Given I know which Family I want to update
And I am logged in to CTRP PO application
And I am have selected the option to search Families
And a list of Family Names is displayed
And I select a Family to edit
And the Family Organizations are displayed
When I select the option to remove an organization from a Family
Then the Family will be updated and the selected organization removed



