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
  Given I have entered a new family name <family Name>
  And I have entered a family type <family Type>
  And I have entered a family status <family status>
  And I save the family information
  Then an error <response> will be displayed

  Examples:
    |family Name                    |       |family Type            |     |family status|     |response|
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |Active       |     |duplicate |
    |Masonic Cancer Center          |       |                       |     |Active       |     |missing family type   |
    |Masonic Cancer Center          |       |Cancer Center          |     |             |     |missing family status |
