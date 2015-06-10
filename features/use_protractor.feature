Feature: Learn how to use protractor instead of selenium for angular js automtaion
  Scenario: Able to create an organization using protractor
    Given I navigate to the url to create an organization
    And I provide some details like name city etc
    Then the system should accept those fields
    And when I click save
    Then The system should save the form
