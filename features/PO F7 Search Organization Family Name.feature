Feature: PO F7 Search Organization Family Name

  Background:
    Given I am logged in to CTRP PO application
    And  I select the option to search Organization Family

  Scenario Outline: #1 As a PO user, I am able to search with Family Name
    Then I want to search with family name <family name>
    And I click on Search button
    Then In the search result for family name <family name> it shall return result <result>
    And the result should be sorted by family name


    Examples:
      |family name| |result|
      |Albert Einstein Cancer Center| |true|
      |Yale Cancer Center         | |true|
      |shilpi org 546                | |false|


  Scenario Outline: #2 As a PO user, I am able to search with Family Type
    Then I want to search with family type <family Type>
    And I click on Search button
    Then In the search result for family type <family Type> it shall return result <result>
    And the result should be sorted by family name


    Examples:
      |family Type| |result|
      |Cancer Center| |true|
      |NIH          | |true |
      |NCTN         | |true|
      |Research Cancer Center| |true|



  Scenario Outline: #3 As a PO user, I am able to search with Family Status
    Then I want to search with family status <family Status>
    And I click on Search button
    Then In the search result for family status <family Status> it shall return result <result>
    And the result should be sorted by family name


    Examples:
      |family Status| |result|
      |Active|        |true  |
      |Inactive  |    |true  |


  Scenario: #4 Verify the the Family search fields
    Then I want to search with family name as "Albert Einstein Cancer Center"
    And I click on Search button
    And the search results should display the following sorted by family name
      |FamilyName|
      |FamilyStatus|
      |FamilyType|
      |OrganizationFamilyMembers|
      |OrganizationFamilyMemberRelationship|


  Scenario Outline: #5 As a PO user, I am able to search with multiple Parameters
    Then I want to search with family name <family Name>
    And I want to search with family type <family Type>
    And I want to search with family status <family Status>
    And I click on Search button
    Then In the search result for family name <family Name> ,family type <family Type> and family status <family Status> it shall return result <result>
    And the result should be sorted by family name

    Examples:
      |family Name                    |       |family Type            |     |family Status|     |result |
      |Yale Cancer Center             |       |Cancer Center          |     |Inactive     |     |true   |
      |shilpi org                     |       |NIH                    |     |Inactive     |     |false  |
      |NRG Oncology                   |       |                       |     |Active       |     |true   |
      |                               |       |Cancer Center          |     |Active       |     |true   |
      |NRG Oncology                   |       |NCTN                   |     |             |     |true   |


  Scenario:#6 As a curator, I can Search Family when the Exact Search box is checked
    Given I am logged in to CTRP PO application
    And I have selected the option to Search Families
    And Exact Search box is selected in Family Search
    When I have entered the "exact" Family name
    Then the Family Name will be displayed on the Family search results table

  Scenario:#7  As a curator, I can Search Family when the Exact Search box is NOT checked
    Given I am logged in to CTRP PO application
    And I have selected the option to Search Families
    And Exact Search box is Not selected in Family Search
    When I have entered the "partial" Family name
    Then the Family Name will be displayed on the Family search results table


  Scenario: #8 Rules for Search Families
    Given I am logged in to CTRP PO application
    And I am on the search Family screen
    When I have completed a family search
    Then Only Active Organization count will be displayed on the Family Search Membership Size Results
    When I have selected a family name from the family search results table
    Then All affiliated organizations will be displayed
    And Only Active Organization count will be displayed for the Membership size on the Edit Family screen
    And Inactive Organization count will not be included in the Membership size
    And Expired Organization count will not be included in the Membership size
    And Pending Organization count will not be included in the Membership size
    And the organization type will be displayed at the botton of the organizations list

      |Inactive Relationship |
      |Expired Relationship  |
      |Pending Organizations  |
      |Nullified Organizations  |

    And Organizations information types will be displayed

      |CTRP ID        |
      |CTEP ID        |
      |Organization   |
      |Relationship   |
      |Effective Date |
      |Expiration Date|

    And Expiration date will be displayed for Expired Relationships
  


