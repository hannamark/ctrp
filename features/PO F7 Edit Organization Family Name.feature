Feature: Edit Organization Family

Background:
Given I am logged in to CTRP PO application
And  I select the option to edit Organization Family

Scenario Outline: #1 As a PO Curator, I am able to edit a Organization Family
  Given I have selected family name <family Name>
  And I have changed the family name <family Name>
  And I have changed the family type <family Type>
  And I have changed the family status <family status>
  And I save the Family information
  Then the family name <family Name> with family type <family Type> and family effective date <family status> will be updated and return result <result>
  Then logout

  Examples:
    |family Name                    |       |family Type            |     |family status|   |result |
    |Albert Einstein Cancer Center  |       |NCTN                   |     |Active       |   |true   |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |Active       |   |true   |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |Active       |   |true   |
    |A. Einstein Cancer Center      |       |Cancer Center          |     |Active       |   |true   |



Scenario Outline: #2 As a PO Curator, I will get errors if I enter incomplete information for a Family
  Given I have selected family name <family Name>
  And I have changed the family name <family Name>
  And I have changed the family type <family Type>
  And I have changed the family status <family status>
  And I save the Family information
  Then the system will notify any error with <response>
  Then logout

  Examples:
    |family name                    |       |family type            |     |family status|   |response |
    |                               |       |Cancer Center          |     |Active       |   |missing family name   |
    |Masonic Cancer Center          |       |Cancer Center          |     |             |   |missing family status   |
    |Masonic Cancer Center          |       |                       |     |Active       |   |missing family type   |

