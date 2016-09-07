@Global
@PO
Feature: PO F2 Search and Edit Organization

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
    
      Scenario: #3 A a Curator, I can search organization when Exact Search is checked
    Given I know the name of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the full exact name of the organization I wish to search for
    And the Exact search checked
    And I submit my search request
    Then the system should display all organizations that contain the exact name searched
    And the result should be sorted by Organization Name
    
    Scenario: #4 A a Curator, I can search organization when Exact Search is unchecked
    Given I know the name of the organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the full exact name of the organization I wish to search for
    And the Exact search is unchecked 
    And I submit my search request
    Then the system should not display organizations that contain the exact name provided
   
  
   Scenario Outline:#5 As a Curator, I am able to search for organizations by one or multiple parameters
    Given I know the parameters of organization I wish to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I provide the partial name with wild card '*' of the <Organization Name> I wish to search for
    And I indicate to include or not include a <Search Aliases>
    And I enter the Source Context <Source Context>
    And I enter the Source ID <Source ID>
    And I enter the Source Status <Source Status> Type
    
    |Active|
    |Inactive|
    |Nullified|
    |Pending|
    |Legacy|
    
    And I enter a Context Org ID <Context Org ID>
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
    
    And I enter the Curator Name <Curator Name>
    And I enter the Curator Date <Curator Date>
    And I submit my search request
    Then the system should display <Results> with organizations that match the search criteria entered
    And  The organization search results will display the field type
      |CTRP ID|
      |CTEP ID|
      |Source ID|
      |Context Organization ID|
      |Name|
      |Source Status|
      |Source Context|
      |Processing Status|
      |Service Request|
      |Family Name|
      |Phone|
      |Email|
      |Last Updated by|
      |Last Updated Date|
      |City|
      |State|
      |Country|
      |Postal Code|
      
      And the result should be sorted by Organization Name

   
  Scenario:#6 As a Curator, I will get message if no Search Parameter is provided
    Given I know the parameters of organization I wish to search for
    And I am logged in to CTRP PO application
    And I searched without providing any search parameters
    Then I should get message as "At least one selection value must be entered prior to running the search"
    And I searched without any search parameters and Search Alias box unchecked
    Then I should get message as "At least one selection value must be entered prior to running the search"

  Scenario:#7 As a Curator, I can select any organization with Family in a search result and display the detailed organization information
    Given I want to see the detail information of organization when linked with Family
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I select an organization name in the search results
    Then the CTRP Organization Context will be displayed
    And I can click on the Family from the CTRP Organization context
    Then the complete family information details will be displayed including
      |Family Name|
      |Family Status|
      |Family Type|
      |Membership Size|
      
      And A grid displaying other CTRP Organization details type
      
      |CTRP ID|
      |CTEP ID|
      |Organization Name|
      |Organization Relationship|
      |Effective Date|
      |Expiration Date|


  Scenario:#8 As a Curator, I can select any organization in a search result and display the detailed organization information
    Given I want to see the detail information of organization
    And I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    When I select organization name in the search results
    Then the complete organization information will be displayed including:
      |CTRP Organization ID|
      |Context Organization ID|
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
      |Postal Code|
      |Email|
      |Phone Number: Phone Number Extension|
      |Created By|
      |Updated By|
      |Families|
     And I can edit all CTRP Organization Fields except field type
     
     |CTRP Organization ID|
     |Context Organization ID|
     |Source ID|
     |Source Context|


  Scenario:#9 As a Curator, when I search I will enter "*" as a wild card when Exact Search is selected
    Given I want to search for an Organization with wild card
    And I am logged in to CTRP PO application
    And I am on a Organization search screen
    And Exact Search is selected
    When I enter "*" in a search field
    Then Organization Search Results will display all found organizations

  Scenario:#10 As a Curator, I can clear all my search selections
    Given I am logged in to CTRP PO application
    And I have selected the option to search for an organization
    And I want to clear the organization search fields
    When  I select the Clear option
    Then  all values in all fields will be cleared


  


 
     






