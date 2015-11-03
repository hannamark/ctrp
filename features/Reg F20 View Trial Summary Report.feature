@Global @Reg
Feature: Reg F20 View Trial Summary Report

As a CTRP User, I can view my trial Trial Summary Report (TSR)

Scenario: #1 I search my trials and select the update trial status option
Given I am in the CTRP Registration applicatin
And I have selected the option to view my trials in CTRP (trials where I am listed as owner)
When I select the View TSR option
Then the Trial Summary Report will be displayed

