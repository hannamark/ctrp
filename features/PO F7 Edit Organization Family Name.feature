Feature: Edit Organization Family

Background:
Given I am logged in to CTRP PO application
And  I select the option to edit Organization Family

Scenario Outline: #1 As a PO Curator, I am able to edit a Organization Family
  Given I have selected family name to edit
  And I have changed the family name
  And I have changed the family type <family Type>
  And I have changed the family status <family status>
  And I save the Family information
  Then the family name with family type <family Type> and family status <family status> will be updated and return result <result>

  Examples:
   |family Type            |     |family status|   |result |
   |NCTN                   |     |Active       |   |true   |
   |Cancer Center          |     |Active       |   |true   |
   |NIH                    |     |Active       |   |true   |
   |Research Cancer Center |     |Inactive     |   |true   |



Scenario Outline: #2 As a PO Curator, I will get errors if I enter incomplete information for a Family
  Given I have selected family name "Masonic Cancer Center" to edit
  And I have changed the family name <family Name> to edit
  And I have changed the family type <family Type>
  And I have changed the family status <family status>
  And I save the Family information
  Then the system will notify any error with <response>

  Examples:
    |family Name                    |       |family Type            |     |family status|   |response |
    |                               |       |Cancer Center          |     |Active       |   |missing family name   |
    |Masonic Cancer Center          |       |Cancer Center          |     |             |   |missing family status   |
    |Masonic Cancer Center          |       |                       |     |Active       |   |missing family type   |


