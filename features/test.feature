@Global 
Feature: Search for persons
  @runthis
  Scenario: As any CTRP User, I am able to search for persons by first name
    Given I know the name of the person I wish to search for
    And I am logged in to CTRP
    And I have selected the option to search for a person
    When I provide the full or partial first name of the person I wish to search for
    And I submit my search request for Person Search
    Then the system should display all persons that contain the first name
    And the search results should display:
      |CTRP Person ID|
      |CTEP Person ID|
      |First Name|
      |Last Name|
      |Middle Name|
      |Email Address|
      |Phone Number|
      |Organizational Affiliations|
      |Status|
