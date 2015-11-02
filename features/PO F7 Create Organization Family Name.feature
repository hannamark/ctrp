Feature: Create Organization Family Name

Background:
Given I am logged in to CTRP PO application
And  I select the option to add Organization Family

Scenario Outline: #1 As a PO Curator, I am able to create a new Family name
  Given I have entered a new family name <family Name>
  And I have entered a family type <family Type>
  And I have entered a family status <family status>
  And I save the family information
  Then a new family name <family Name> with family type <family Type> and family status <family status> will be created and return result <result>

  Examples:
    |family Name                    |       |family Type            |     |family status|     |result |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |Active       |     |true   |
    |Masonic Cancer Center          |       |Cancer Center          |     |Inactive     |     |true   |

Scenario Outline: #2 As a PO Curator, I will receive an error response if the family name information is not correct
  Given I have entered a family name <family Name>
  And I have entered a family type <family Type>
  And I have entered a family status <family status>
  And I save the family information
  Then an error <response> will be displayed for family name <family Name>, family type <family Type> and family status <family status>

  Examples:
    |family Name                    |       |family Type            |     |family status|     |response|
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |             |     |Warning: Family exists in the database. Please verify and create a new Family record. |
    |Masonic Cancer Center 1        |       |                       |     |Active       |     |Family type is Required  |
    |Masonic Cancer Center  2       |       |Cancer Center          |     |             |     |Family status is Required |
    |                               |       |Cancer Center          |     |Inactive     |     |Family name is Required |
