Feature: Search Organization Family

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
|Masonic Cancer Center          | |true|
|shilpi org                     | |false|


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
