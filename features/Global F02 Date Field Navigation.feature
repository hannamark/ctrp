@Global
Feature: As a CTRP User, I enter a date in a date field directly or select a date from a calendar with month and year navigation

Scenario: #1 I can enter a date in any date field with the same options, direct entry or selection from a calendar with month and year navigation
Given I am on a CTRP data entry screen with a date format field to enter
When I select the date field
Then I will be able to enter a date directly in the field
And I will be able to use a calendar display to select the date
And the calendar display will allow navigation by both month and year to display different calendar months

