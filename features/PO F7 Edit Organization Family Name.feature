Feature: Edit Organization Family

Background:
Given I am logged in to CTRP PO application
And  I select the option to edit Organization Family

Scenario Outline: #1 As a PO Curator, I am able to edit a Organization Family
  Given I have selected family name <family Name>
  And I have changed the family name <family Name>
  And I have changed the family type <family Type>
  And I have changed the effective date <family effective date>
  And I have changed the expiration date <family expiration date>
  And I click on enter button
  Then a new family name <family Name> with family type <family Type> and family effective date <family effective date> will be created and return result <result>
  Then logout

  Examples:
    |family Name                    |       |family Type            |     |family effective date|     |family expiration date|   |result |
    |Albert Einstein Cancer Center  |       |NCTN                   |     |09/17/2015           |     |                      |   |true   |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |01/01/2015           |     |                      |   |true   |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |01/01/2015           |     |09/15/2015            |   |true   |
    |A. Einstein Cancer Center      |       |Cancer Center          |     |01/01/2015           |     |09/15/2015            |   |true   |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |09/01/2015           |     |01/01/2015            |   |false - expiration date before effective date   |
    |Masonic Cancer Center          |       |                       |     |10/1/2014            |     |                      |   |false - missing family type   |
    |Masonic Cancer Center          |       |Cancer Center          |     |                     |     |                      |   |false - missing effective date   |
    |Masonic Cancer Center          |       |@ancer Center          |     |10/1/2014            |     |                      |   |false - incorrect family type   |

