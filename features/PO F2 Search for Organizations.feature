@Global
@PO
Feature: PO F2 Search for Organization

  Scenario:#1 As any Curator,I am able to search for organizations by name including aliases
    Given I know the name of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the full or partial name of the organization I wish to search for
    And I indicate to include aliases
    And I submit my search request
    Then the system should display all organizations that contain the name or the alias
    And the result should be sorted by Organization Name

  Scenario:#2 As any Curator, I am able to search for organizations by name without including aliases
    Given I know the name of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the full or partial name of the organization I wish to search for
    And I indicate to not search Aliases
    And I submit my search request
    Then the system should display all organizations that contain the name
    And the result should be sorted by Organization Name
    
      Scenario: #2a A a Curator, I can search organization when Exact Search is checked
    Given I know the name of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the full exact name of the organization I wish to search for
    And the Exact search checked
    And I submit my search request
    Then the system should display all organizations that contain the exact name searched
    And the result should be sorted by Organization Name
    
    Scenario: #2b A a Curator, I can search organization when Exact Search is unchecked
    Given I know the name of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the full exact name of the organization I wish to search for
    And the Exact search is unchecked 
    And I submit my search request
    Then the system should not display organizations that contain the exact name provided
   
    

  Scenario:#3 As any Curator, I am able to search for organizations by Source Context and Source ID
    Given I know the Source Context and Source ID of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the Source Context and Source ID of the organization I wish to search for
    And I submit my search request
    Then the system should display all organizations that contain the Source Context and Source ID 
    And the result should be sorted by Organization Name

  Scenario:#4 As any Curator, I am able to search for organizations by Source ID
    Given I know the Source ID of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the Source ID of the organization I wish to search for
    And I submit my search request
    Then the system should display all organizations that contain the Source ID 
    And the result should be sorted by Organization Name

  Scenario:#5 As any Curator, I am able to search for organizations by Family Name
    Given I know the Family name to which the organization I wish to search for belongs to
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the full or partial Family name of the organization I wish to search for
    And I submit my search request
    Then the system should display all organizations that are members of the Family Name
    And the result should be sorted by Organization Name

  Scenario:#6 As any Curator, I am able to search for organizations by city
    Given I know the name of the city I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the full or partial city of the organization I wish to search for
    And I submit my search request
    Then the system should display all organizations whose address contains the city
    And the result should be sorted by Organization Name

  Scenario:#7 As any Curator, I am able to search for organizations by state
    Given I know the name of the state I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I select the state from a list of states displayed by CTRP
    And I submit my search request
    Then the system should display all organizations whose address contains the state
    And the result should be sorted by Organization Name

  Scenario:#8 As any Curator, I am able to search for organizations by country
    Given I know the name of the country I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I select the country from a list of countries displayed by CTRP
    And I submit my search request
    Then the system should display all organizations whose address contains the country
    And the result should be sorted by Organization Name
  @runthis
 
 Scenario:#9 As any Curator, I am able to search for organizations by Postal Code
    Given I know the name of the zip code I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the full or partial zip code of the organization I wish to search for
    And I submit my search request
    Then the system should display all organizations whose address contains the Postal Code
    And the result should be sorted by Organization Name

  Scenario:#10 As any Curator, I am able to search for organizations by phone number
    Given I know the organization phone number I wish to search for
    And I am logged in to CTRP PO application 
    And I have selected the option to search for an organization
    When I provide the full or partial phone number of the organization I wish to search for
    And I submit my search request
    Then the system should display all organizations with matching phone numbers
    And the result should be sorted by Organization Name


  Scenario:#11 As any Curator, search for organizations with multiple parameters
    Given I know multiple parameters of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I am on the search organizations screen
    When I provide the parameters of the organization I wish to search for
    And I submit my search request
    Then the system should display all organizations that contain all of the entered parameters
    And the result should be sorted by Organization Name


  Scenario:#12 As a Curator, Search for organizations by curator date
    Given I know the date of the curator date I wish to search for
    And I am logged in to CTRP PO application
    And I am on the search organizations screen
    When I provide the curator date of the organization I wish to search for
    And I submit my search request
    Then the system should display all organizations that contain the curator date
    And the result should be sorted by Organization Name

  Scenario:#13 As a Curator, Search for organizations by curator user name
    Given I know the name of the curator user name I wish to search for
    And I am logged in to CTRP PO application
    And I am on the search organizations screen
    When I provide the curator user name of the organization I wish to search for
    And I submit my search request
    Then the system should display all organizations that contain the curator user name
    And the result should be sorted by Organization Name

  Scenario:#14 As a Curator or a CTRP Administrator, I can search for organizations by status
    Given I know the status of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I am on a search organizations screen
    When I provide the status of the organization I wish to search for
      |Organization Status|
      |Active|
      |Inactive|
      |Pending|
      |Nullified|
    And I submit my search request
    Then the system should display all organizations that have a matching organization status
    And the result should be sorted by Organization Name

  Scenario Outline:#15 As a Curator, I am able to search for organizations by multiple parameters
    Given I know the parameters of organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the partial name with wild card '*' of the <Organization Name> I wish to search for
    And I indicate to include or not include a <Search Aliases>
    And I enter the Source Context <Source Context>
    And I enter the Source ID <Source ID>
    And I enter the Source Status <Source Status>
    And I enter the Family Name <Family Name>
    And I enter the City <City>
    And I enter the Country <Country> where the default will be "All Countries"
    And I select the State <State> from a list of state names
    And I enter the Phone Number <Phone Number>
    And I enter the Email <Email>
    And I enter Proccessing status type
    |Complete|
    |Incomplete|
    And I enter Service Request Type
    |Create|
    |Update|
    |Merge with CTEP ID|
    |Link with CTRP ID|
    |Legacy|
    And I enter the Curator Name <Curator Name>
    And I enter the Curator Date <Curator Date>
    And I submit my search request
    Then the system should display <Result> with organizations that match the search criteria entered
    And  The organization search results will display the field type
      |CTRP ID|
      |CTEP ID|
      |Source ID|
      |Name|
      |CTEP Org Type|
      |Funding Mechanism|
      |Source Status|
      |Source Context|
      |Processing Status|
      |Service Request|
      |Families|
      |Phone|
      |Email|
      |Last Updated by|
      |Last Updated Date|
      |City|
      |State|
      |Country|
      |Postal Code|
      
      
    And the result should be sorted by Organization Name

   
  Scenario:#16 As a Curator, I will get message if no Search Parameter is provided
    Given I know the parameters of organization I wish to search for
    And I am logged in to CTRP PO application
    And I searched without providing any search parameters
    Then I should get message as "At least one selection value must be entered prior to running the search"
    And I searched without any search parameters and Search Alias box unchecked
    Then I should get message as "At least one selection value must be entered prior to running the search"

  Scenario:#17 As a Curator, I can select any organization with Family in a search result and display the detailed organization information
    Given I want to see the detail information of organization when linked with Family
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I select an organization name in the search results
    Then the complete family organization information will be displayed including:
      |CTRP Organization ID|
      |Organization Name|
      |Source Context|
      |Source ID|
      |Source Status|
      |Address 1|
      |Address 2|
      |City|
      |State|
      |Country|
      |Postal Code|
      |Email|
      |Phone Number|
      |Family|
      |Aliases|


  Scenario:#18 As a Curator, I can select any organization in a search result and display the detailed organization information
    Given I want to see the detail information of organization
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I select organization name in the search results
    Then the complete organization information will be displayed including:
      |CTRP ID|
      |CTRP Context ID|
      |Name|
      |Source Context|
      |Source ID|
      |Source Status|
      |Processing Status|
      |Name Alias|
      |Address 1|
      |Address 2|
      |Country|
      |State|
      |City|
      |Email|
      |Phone Number: Extension|
      |Created By|
      |Updated By|
     


  Scenario:#19 As a Curator, when I search I will enter "*" as a wild card when Exact Search is selected
    Given I want to search for an Organization with wild card
    And I am logged in to CTRP PO application
    And I am on a Organization search screen
    And Exact Search is selected
    When I enter "*" in a search field
    Then Organization Search Results will display all found organizations

  Scenario:#20 As a Curator, I can clear all my search selections
    Given I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    And I want to clear the organization search fields
    When  I select the Clear option
    Then  all values in all fields will be cleared


  Scenario:#21 As a curator, I can Search Organizations when the Exact Search box is checked
    Given I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    And Exact Search is selected
    When I have entered the "exact" organization name
    Then the exact Organization name will be displayed on the organization search results table
    When I have entered the "exact" Source ID
    Then The exact Source ID will be displayed on the Organization search results table
    When I have entered the "exact" City
    Then the exact City name will be displayed on the Organization search results table
    When I have entered the "exact" username
    Then The exact username will be displayed on the Organization search results table
    When I have entered the "exact" Family Name
    Then the exact Family Name will be displayed on the Organization search results table
    When I have entered the "exact" Postal Code
    Then the exact Postal Code will be displayed on the Organization search results table
    When I have entered the "exact" phone number
    Then the exact phone number will be displayed on the Organization search results table
    When I have entered the "exact" email
    Then the exact email will be displayed on the Organization search results table


  Scenario:#22 As a curator, I can Search Organizations when the Exact Search box is NOT checked
    Given I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    And Exact Search is not selected
    When I have entered the "partial" organization name
    Then the exact Organization name will be displayed on the organization search results table
    When I have entered the "partial" Source ID
    Then The exact Source ID will be displayed on the Organization search results table
    When I have entered the "partial" City
    Then the exact City name will be displayed on the Organization search results table
    When I have entered the "partial" username
    Then The exact username will be displayed on the Organization search results table
    When I have entered the "partial" Family Name
    Then the exact Family Name will be displayed on the Organization search results table
    When I have entered the "partial" Postal Code
    Then the exact Postal Code will be displayed on the Organization search results table
    When I have entered the "partial" phone number
    Then the exact phone number will be displayed on the Organization search results table
    When I have entered the "partial" email
    Then the exact email will be displayed on the Organization search results table

  Scenario:#23 As a curator, I cannot Search Results when the Exact Search box is checked and Exact Match is not provided
    Given I am logged in to CTRP PO application
    And Exact Search is selected
    And I dont provide the Exact criteria
    Then the search result should not be displayed
     






