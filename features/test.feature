@Global
Feature: Search for persons
  @runthis
  Scenario: As any CTRP User, I am able to search for persons by first name
    Given I know the name of the person I wish to search for
    And I am logged in to CTRP
    And I have selected the option to search for a family shilpi
    When I provide search item
