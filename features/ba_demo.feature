Feature: Create an organization
  Scenario: Create an Organization
    Given I am logged in to CTRP PO application
    And I am on the create organization screen
    And I know the name of the organization I wish to create
    And I provide the full name of the organization I wish to create
    And I provide the CTEP ID of the organization I wish to create which may be null
    And I provide the city of the organization I wish to create
    And I provide the state of the organization I wish to create
    And I provide the country of the organization I wish to create
    And I provide the zip code of the organization I wish to create
    And I submit my create request
    Then the system should create an organization record that contains a unique PO ID, the organization name, the CTEP ID, the city, the state, the country, the zip code, my name, and the current date and time
    And the organization status should be Pending
