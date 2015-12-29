@Global
Feature: PO F9 Search for Persons

  Scenario Outline: As a Curator, search for persons with multiple parameters
    Given I know multiple parameters of the person I wish to search for
      |Person First Name| |Person last name| |Affiliation| |Source Status| |email| |phone|
      |shiFName         | |shiLName        | |shiPerOrgAff| |Active      | |shiPercuke@pr.com| |420-567-8906|
    And I am logged in to CTRP PO application
    And I am on the search persons screen
    When I want to search with first name <first_name>
    And I want to search with last name <last_name>
    And I want to search with Person affiliated organization <Person_affiliated_organization>
    And I want to search with Source Context <Source Context>
    And I want to search with Source ID <Source ID>
    And I want to search with Source Status <Source Status>
    And I want to search with Person email <Person_email>
    And I want to search with Person phone number <Person_phone_number>
    And I want to search for Person Records last updated by <Start Date> and <End Date>
    And I want to search for Person records last updated by <Username>
    And I submit my search request for Person Search
    Then the search results <result> should display the following sorted by Last Name:
      |CTRP Person ID|
      |Prefix|
      |First Name|
      |Middle Name|
      |Last Name|
      |Suffix|
      |Source Context|
      |Source ID|
      |Source Status|
      |Email Address|
      |Phone Number|
      |Affiliated Organizations as a pop-up display|
      |Last Updated|

    Examples:
      |first_name  || last_name ||Source Context||Source ID|| Source Status||Person_email||Person_phone_number||Person_affiliated_organization||Start Date||End Date||Username||result|
      |shiFName    ||           ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
      |shiFNa*     ||           ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
      |            ||shiLName   ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
      |            ||shiL*      ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
      |            ||           || CTRP         ||65000000 ||              ||            ||                   ||                              ||          ||        ||        ||true|
      |            ||           ||              ||         ||Active        ||            ||                   ||                              ||          ||        ||        ||true|
      |            ||           ||              ||         ||              ||shiPercuke@pr.com||                  ||                              ||          ||        ||        ||true|
      |            ||           ||              ||         ||              ||shiPercuke* ||                   ||                              ||          ||        ||        ||true|
      |            ||           ||              ||         ||              ||            ||                   ||    shiPerOrgAff              ||          ||        ||        ||true|
      |            ||           ||              ||         ||              ||            ||                   ||    shiPerOrg*                ||          ||        ||        ||true|
      |            ||           ||              ||         ||              ||            ||  420-567-8906     ||                              ||          ||        ||        ||true|
      |            ||           ||              ||         ||              ||            ||   420-567*        ||                              ||          ||        ||        ||true|
      |            ||           ||              ||         ||              ||            ||                   ||                              ||  today   ||  today ||        ||true|
      |            ||           ||              ||         ||              ||            ||                   ||                              ||          ||        ||ctrpcurator  ||true|
      |            ||           ||              ||         ||              ||            ||                   ||                              ||          ||        || ctrpcu*  ||true|
      |            ||shiLName   ||              ||         ||              ||shiPercuke@pr.com||420-567*      || shiPerOrgAff                 ||          ||        ||        ||true|


  Scenario: As a Curator, I will get a message if searched with no parameters
    Given I am logged in to CTRP PO application
    And I am on the search persons screen
    When I searched without providing any search parameters
    Then I should get message as "At least one selection value must be entered prior to running the search"

  Scenario: As a curator, I can Search Persons when the Exact Search box is checked
    Given I am logged in to CTRP PO application
    And I have selected the option to search persons
    And Exact Search is checked on search person
    When I have entered the "exact" person First Name
    Then the person First Name will be displayed on the People Search Results table
    When I have entered the "exact" person Last Name
    Then the person Last Name will be displayed on the People Search Results table
    When I have entered the "exact" Source ID for Person
    Then The Source ID will be displayed on the People Search Results table
    When I have entered the "exact" Email for Person
    Then the Email will be displayed on the People Search Results table
    When I have entered the "exact" Affiliation
    Then the Affiliation will be displayed on the People Search Results table
    When I have entered the "exact" Phone Number for Person
    Then the Phone Number will be displayed on the People Search Results table
    When I have entered the "exact" Username for Person
    Then the Username will be displayed on the People Search Results table


  Scenario: As a curator, I can Search Organizations when the Exact Search box is NOT checked
    Given I am logged in to CTRP PO application
    And I have selected the option to search persons
    And Exact Search is not checked on search person
    When I have entered the "partial" person First Name
    Then the person First Name will be displayed on the People Search Results table
    When I have entered the "partial" person Last Name
    Then the person Last Name will be displayed on the People Search Results table
    When I have entered the "partial" Source ID for Person
    Then The Source ID will be displayed on the People Search Results table
    When I have entered the "partial" Email for Person
    Then the Email will be displayed on the People Search Results table
    When I have entered the "partial" Affiliation
    Then the Affiliation will be displayed on the People Search Results table
    When I have entered the "partial" Phone Number for Person
    Then the Phone Number will be displayed on the People Search Results table
    When I have entered the "partial" Username for Person
    Then the Username will be displayed on the People Search Results table


  Scenario: As a curator, I cannot Search Results when the Exact Search box is checked and Exact Match is not provided
    Given I am logged in to CTRP PO application
    And Exact Search is checked on search person
    And I dont provide the Exact criteria for Person
    Then the search result should not be displayed



