Feature: Create Organization Family Name

Background:
Given I am logged in to CTRP PO applicationss
And  I select the option to search Organization Family

Scenario Outline: #1 As a PO Curator, I am able to create a new Family name
  Given I have entered a new family name <family Name>
  And I have entered a family type <family Type>
  And I have entered a family status <family status>
  And I click on enter button
  Then a new family name <family Name> with family type <family Type> and family status <family status> will be created and return result <result>
  Then logout

  Examples:
    |family Name                    |       |family Type            |     |family status|     |result |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |Active       |     |true   |
    |Masonic Cancer Center          |       |Cancer Center          |     |Inactive     |     |true   |

Scenario Outline: #2 As a PO Curator, I am able to create a new Family name
  Given I have entered a new family name <family Name>
  And I have entered a family type <family Type>
  And I have entered a family status <family status>
  And I click on enter button
  Then a new family name <family Name> with family type <family Type> and family status <family status> will be created and return result <result>
  Then logout

  Examples:
    |family Name                    |       |family Type            |     |family status|     |result |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |Active       |     |false - duplicate |
    |Masonic Cancer Center          |       |                       |     |Active       |     |false - missing family type   |
    |Masonic Cancer Center          |       |Cancer Center          |     |             |     |false - missing family status |
    |Masonic Cancer Center          |       |@ancer Center          |     |Active       |     |false - incorrect family type   |