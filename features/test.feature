@Global @test
Feature: Search for persons

  Scenario: As any CTRP User, I am able to search for persons by first name
    Given I want to test the Login page
    And Test with same login
    Then Test with different login

  @runthis
  Scenario: As any CTRP User, I am able to search for persons by first name
    Given I want to test the Login page second time
    And Test with same login second time
    Then Test with different login second time
