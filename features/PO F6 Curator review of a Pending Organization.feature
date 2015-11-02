@PO @Global
Feature: PO F6 Curator review of a Pending Organization

Scenario: #1 As a PO Curator, I can display all Organizations with Pending status
Given I am logged in to the CTRP PO application
And I am on the CTRP PO Curator Review screen
When I select Display Pending Organizations
Then a list of all Organizations in CTRP with a Pending Status should be displayed
And I can sort the list by PO ID, Organization Name, Organization Address, Creator Name, and Creation Date

Scenario: #2 As a PO Curator, I can Search for Duplicate Organizations
Given I am logged in to the CTRP PO application
And I am on the CTRP PO Curator Review screen
When I have select a Pending Organization
Then I can search for possible duplicate organizations by CTEP ID, Organization Name, and Organization address

Scenario: #3 As a PO Curator, I can determine if two organizations are Duplicate Organizations
Given I am logged in to the CTRP PO application
And I am on the CTRP PO Curator Review screen
When I select a Pending Organization and a possible Duplicate Organization
Then all occurrences in CTRP where the Pending Organization and the possible Duplicate Organization are Lead Organizations will be displayed
And all occurrences in CTRP where the Pending Organization and the possible Duplicate Organization are Sponsor Organizations will be displayed
And all occurrences in CTRP where the Pending Organization and the possible Duplicate Organization are Participating Sites will be displayed

Scenario: #4 As a PO Curator, I can Activate a Pending Organization
Given I am logged in to the CTRP PO application
And I am on the CTRP PO Curator Review screen
And I have completed review of a Pending Organization
When I select Activate Organization
Then the Organization’s status will be Active
And the Organization will be available for use in CTRP

Scenario: #5 As a PO Curator, I can Nullify an Organization
Given I am logged in to the CTRP PO Application
And I am on the CTRP PO Curator Review screen
And I have identified two organizations in the CTRP context that are duplicates
When I select one of the organizations to be retained
And I select one of the organizations to be nullified
And the organization to be nullified does not have an Active status
Then all references in CTRP to the nullified organization as Lead Organization will reference the retained organization as Lead Organization
And all references in CTRP to the nullified organization as Sponsor will reference the retained organization as Sponsor
And all references in CTRP to the nullified organization as Participating Site will reference the retained organization as Participating Site
And all accrual submitted in CTRP on the nullified organization as a Participating Site will be transferred to the retained organization as a Participating Site
And all persons affiliated with the nullified organization will be affiliated with the retained organization
And the name of the Nullified organization will be listed as an alias on the retained organization
And all aliases listed on the Nullified organization will be listed as aliases on the retained organization
And if both organizations had CTEP IDs only the retained organization CTEP ID will be associated with the retained organization
And the status of the organization to be nullified will be "Nullified"

Scenario: #6 As a PO Curator, I cannot Nullify an Organization with Active CTEP ID
Given I am logged in to the CTRP PO Application
And I am on the CTRP PO Curator Review screen
And I have identified two organizations that are duplicates
When I select one of the organizations to be retained
And I select one of the organizations to be nullified that has an active CTEP ID
Then a warning will be displayed "Active CTEP ID"
And the nullification process will be terminated

