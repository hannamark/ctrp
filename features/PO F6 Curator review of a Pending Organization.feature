@PO @Global
Feature: PO F6 Curator review of a Pending Organization

  Scenario: #1 As a PO Curator, I can display all Organizations with Pending status
    Given I am logged in as a CTRP Curator
    And I am on the Search Organizations screen
    When I select Source Status as Pending
    Then all organizations with a Pending Status will be displayed

  Scenario: #2 As a PO Curator, I can Search for Duplicate Organizations
    Given I am logged in as a CTRP Curator
    And I am on the Search Organizations screen
    When I have completed a search for an organization
    Then I can select an organization from the search results
    And I can search for a second organization
    And the first organization will still be displayed

  Scenario: #3 As a PO Curator, I can Activate a Pending Organization
    Given I am logged in as a CTRP Curator
    And I am on the Search Organizations screen
    And I have searched for Pending organizations
    When I have select a Pending organization by organization name
    Then I will be able to edit the organization status
    And change the organization status from Pending to Active

  Scenario: #4 As a PO Curator, I can Nullify an Organization and merge its relationships to an active organization
    Given I am logged in as a CTRP Curator
    And I am on the Search Organizations screen
    And I have identified two organizations with a CTRP source context, one to be nullified and one to be retained
    When I select one of the organizations to be nullified
    Then all references in CTRP to the nullified organization will reference the retained organization in the field type
    
    |Lead Organization|
    |Sponsor Organization|
    |board affiliation (IRB)|
    |Investigator affiliation organization|
    |CTRP User organization affiliation|
    |Trial co-investigator’s organization|
    |funding source|
    |Participating Site|
    |Person’s affiliated organization|
    |aliases organization|
    |Family organization|
    |Collaborators|
   
    And all accrual submitted in CTRP on the nullified organization as a Participating Site will be transferred to the retained organization as a Participating Site
    And all person records affiliated with the nullified organization will be affiliated with the retained organization
    And the name of the Nullified organization will be listed as an alias on the retained organization
    And all aliases listed on the Nullified organization will be listed as aliases on the retained organization
    And if both organizations had CTEP IDs only the retained organization CTEP ID will be associated with the retained organization
    And the status of the organization to be nullified will be "Nullified"

  Scenario: #5 As a PO Curator, I cannot Nullify an Organization with Active CTEP ID
    Given I am logged in as a CTRP Curator
    And I am on the Organization Search Screen
    When and organization has a CTEP Source Context
    Then I will not be able to select it for Nullification

