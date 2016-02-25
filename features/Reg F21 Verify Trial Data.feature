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
|Current Verification Date|
And the current verification Date will be updated 
When I click on the Save Verification Record Button
And I click on the "OK" button for "Are you sure you would like to save a Data Verification record with todays's date"
Then the current Verification Date will be saved with today's date
And a Verification Record with today's date will be added to the trial
And I can view the current Verification Date displayed on the Trial Data Verification Screen
|NCI Trial Identifier|
|ClinicalTrials.gov Identifier|
|Lead Organization Trial Identifier|
|Title|
|Current Verification Date: 2016-02 |

When I click on the Cancel Button for "Are you sure you would like to save a Data Verification record with todays's date" 
Then the Last Verified Date/Time will not be changed



  

