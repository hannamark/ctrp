@Global @Reg
Feature: Reg F21 Verify Trial Data

As a CTRP User, I can verify my trial data

Scenario: #1 I search my trials and select the Verify Trial Data option
Given I am in the CTRP Registration application
And I have selected the option to view my trials in CTRP (trials where I am listed as owner)
When I select the Verify Data option on one of my trial
Then the Trial Verification Data information will be displayed including
|NCI Trial Identifier|
|ClinicalTrials.gov Identifier|
|Lead Organization Trial Identifier|
|Title|
|Verification History with Date, Verification Method, and Verified By|
And I can select the option to Save Verification Record or Cancer

Scenario: #2 I search my trials and select the Verify Trial Data option and Save a Verification Record
Given I am in the CTRP Registration application
And I have selected the option to view my trials in CTRP (trials where I am listed as owner)
And I selected the Verify Data option on one of my trial
And the Trial Verification Data information will is displayed including
When I select the option to Save Verification Record
And I confirm that I want to save a verification record with today's date
Then a Verification Record with today's date will be added to the trial
And I will receive confirmation that the verification record was saved successfully
And the Trial Data Verification will display the current date, Manual Verification as the Verification Method, and my name as Verified By


