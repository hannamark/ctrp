@Global @test
Feature: Search for persons
  @runthis
  Scenario: As any CTRP User, I am able to search for persons by first name
    Given I want to test the Login page
    And Creaye person with Organizationre
    Then verify person
    And Create person with Organizationsfer
