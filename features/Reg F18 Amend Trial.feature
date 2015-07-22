@Global @Reg
Feature: As a CTRP User, I can Amend information on a trial which requires IRB approval or substantively alter the treatment and/or study design

Scenario: #1 I search my trials, select the Amend Trial option, and enter trial amendment information
Given I am in the CTRP Registration applicatin
And I have selected the option to search my trials in CTRP (trials where I am listed as owner)
When the Amend Trial option is enabled on one of my trials
And I have selected the Amend Trial option
Then all trial information will be displayed
And I will enter the required Amendment Number and Amendment Date
And I will be able to update the Lead Organization Trial Identifier and the ClinicalTrials.gov Identifier listed for the trial
And I will be able to add Other Trial Identifiers
And I will be able to update the Trial Title, Phase, Primary and Secondary Purpose
And I will be able to update the Lead Organization and Principal Investigator
And I will be able to update the Funding Sponsor and add additional Funding Sponsors
And I will be able to update the Program Code
And I will be able to add Grant Information
And I will be able to update trial status and trial status dates and edit trial status history
And I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates
And I will be able to add additional IND or IDE information
And I will be able to update participating site status
And I will be able to review existing Trial Related Documents
And I will enter the required amended Protocol Document
And I will enter the required Change Memo Document or Protocol Highlighted Document
And I will enter the IRB Approval Document
And I will be able to review or cancel my amended information

Scenario: #2 I will be be able to submit an amended trial after reviewing the trial with no errors
Given I am in the CTRP Registration application
And I am on the Amendment Trial screen
And I have enter the required trial amendment information
When I select the review option
Then CTRP will check the amended information 
And if there are no errors, I can submit the trial amendment
And the information updates will be submitted as an amendment with the Amendment Number in CTRP
And the CTRO will be able to abstract the amended trial information

Scenario: #3 I will be be able to edit an amended trial after reviewing the trial with no errors
Given I am in the CTRP Registration application
And I am on the Amendment Trial screen
And I have enter the required trial amendment information
When I select the review option
Then CTRP will check the amended information 
And if there are no errors, I can select the option to Edit the trial information before submitting

