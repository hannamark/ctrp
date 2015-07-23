@Global @Reg
Feature: As a CTRP User, I can update my trial status and trial dates

Scenario: #1 I search my trials and select the update trial status option
Given I am in the CTRP Registration applicatin
And I have selected the option to search my trials in CTRP (trials where I am listed as owner)
When the Update Trial Status option is enabled on one of my trials
And I have selected the Update Trial Status option
Then the trial status, trial status history, trial start date, trial primary completion date, and trial completion date will be displayed
And I will be able to update trial status and trial status dates and edit trial status history
And I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates
And I will be able to review or cancel my update of trial status and dates

