Feature: Create Organization Family Name

Background:
Given I am logged in to CTRP PO applicationss
And  I select the option to search Organization Family

Scenario Outline: #5 As a PO Curator, I am able to create a new Family name
  Given I have entered a new family name <family Name>
  And I have entered a family type <family Type>
  And I have entered a family effective date <family effective date>
  And I click on enter button
  Then a new family name <family Name> with family type <family Type> and family effective date <family effective date> will be created and return result <result>
  Then logout

  Examples:
    |family Name                    |       |family Type            |     |family effective date|     |result |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |09/17/2015           |     |true   |
    |Albert Einstein Cancer Center  |       |Cancer Center          |     |09/17/2015           |     |false - duplicate |
    |Masonic Cancer Center          |       |                       |     |10/1/2014            |     |false - missing family type   |
    |Masonic Cancer Center          |       |Cancer Center          |     |                     |     |false - missing effective date   |
    |Masonic Cancer Center          |       |@ancer Center          |     |10/1/2014            |     |false - incorrect family type   |