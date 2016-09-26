@Global
Feature: PO F9 Search for Persons

  Scenario Outline:#1 As a Curator, search for persons with multiple parameters
    Given I know multiple parameters of the person I wish to search for
      And I am logged in to CTRP PO application
    And I am on the search persons screen
    And I can search with one or more parameters type
    
    |First Name|
    |Last Name|
    |Affiliation Organization ID|
    |Context Person ID|
    |Affiliation|
    |Source Context|
    |Source ID|
    |Source Status|
    |Email|
    |Phone Number|
    |Last Updated Date: (Start Date, End Date)|
    |Updated By:Username|
    |Processing Status|
    |Service Request|
    
    And I submit my search request for Person Search
    
      Scenario:#1a Search Person Results 
    Given I am on the search person results screen
     And the search results should display the following columns 
    
    |CTRP Person ID|
    |CTEP Person ID|
    |First Name|
    |Middle Name|
    |Last Name|
    |Source Status|
    |Source Context|
    |Source ID|
    |Affiliated Orgs|
    |Email|
    |Phone |
    |Context Person ID|
    |Processing Status|
    |Service Request|
    |Last Updated Date|
    |Last Updated By|
    |Prefix|
    |Suffix|
    And the result should be sorted by Person Last Name
    
     Scenario:#2 I can view person details in CTRP Context tab
    Given I am on the search person results screen
     When I select a person to view in CTRP Context
    Then the edit person screen display CTRP records type of the selected person 
    
    |CTRP Person ID|
    |CTRP Context Person ID|
    |Prefix|
    |First Name|
    |Middle Name|
    |Last Name|
    |Suffix|
    |Source Context: CTRP|
    |Source ID|
    |Source Status: Active|
    |Email|
    |Phone Number-Extension|
    |Processing Status|
    |Created By:ctrpcurator (14-Sep-2016 10:53:52 EDT)|
    |Updated By:ctrpcurator (14-Sep-2016 10:53:52 EDT)|
    |Affiliated Organization Details|
    
    
 
    
    
Scenario:#6 As a curator, I can edit person records
    Given I am logged in to CTRP PO application
    When I select a person from the search person results table
     Then the edit screen will display
     And I can edit all fields except
     
     |CTRP Person ID|
     |Context Person ID|
     |Source ID|
     |Source Context|
     When I click on the save button
     Then the edited information will be saved to the trial records
     When I select Reset 
     Then the information entered or edited on the Add person fields will not be saved to the trial record 
      And the Add person records screen will be refreshed with the existing data
     
    
    
  Scenario:#2 As a Curator, I will get a message if searched with no parameters
    Given I am logged in to CTRP PO application
    And I am on the search persons screen
    When I searched without providing any search parameters
    Then I should get message as "At least one selection value must be entered prior to running the search"
 
 Scenario: #3 A a Curator, I can search PersonExact Search is checked
    Given I know the exact paramater type of the person I want to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for a person
    When I provide the exact parameter I would like to search
    And the Exact search checked
    And I submit my search request
    Then the system should display all the exisiting exact parameter provided
    And the result should be sorted by Person Last Name
    
    Scenario: #4 A a Curator, I can search person when Exact Search is unchecked
   Given I know the exact paramater type of the person I want to search for
    And I am logged in to CTRP PO application
    And I have selected the option to search for a person
    When I provide the exact parameter I would like to search
    And the Exact search is unchecked
    And I submit my search request
    Then the system should not display all the existing exact parameter provided
    And the result should be sorted by Person Last Name
   
  
  Scenario:#5 As a curator, I cannot Search Results when the Exact Search box is checked and Exact Match is not provided
    Given I am logged in to CTRP PO application
    And Exact Search is checked on search person
    And I dont provide the Exact criteria for Person
    Then the search result should not be displayed



