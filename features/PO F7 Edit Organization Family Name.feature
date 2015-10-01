Feature: Edit Organization Family

Background:
Given I am logged in to CTRP PO application
And  I select the option to edit Organization Family

Scenario Outline: #1 As a PO Curator, I am able to edit a Organization Family
  Given I have selected family name <family Name>
  And I have changed the family name <family Name>
  And I have changed the family type <family Type>
  And I have changed the family status <family status>
  And I click on enter button
  Then the family name <family Name> with family type <family Type> and family effective date <family status> will be updated and return result <result>
  Then logout

  Examples:
    |family Name                    |       |family Type            |     |family status|   |result |
    |Albert Einstein Cancer Center  |       |NCTN                   |     |Active       |   |true   |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |Active       |   |true   |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |Active       |   |true   |
    |A. Einstein Cancer Center      |       |Cancer Center          |     |Active       |   |true   |
    |Masonic Cancer Center          |       |                       |     |Active       |   |false - missing family type   |
    |Masonic Cancer Center          |       |Cancer Center          |     |             |   |false - missing family status   |
    |Masonic Cancer Center          |       |@ancer Center          |     |Active       |   |false - incorrect family type   |

