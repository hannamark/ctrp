@Global @Reg
Feature: As a CTRP User, I can update information on a trial that does not require IRB approval or an amendment

Scenario: #1 I search my trials and select the update option
Given I am in the CTRP Registration applicatin
And I have selected the option to search my trials in CTRP (trials where I am listed as owner)
When the Update option is enabled on one of my trials
And I have selected the Update option
Then all trial information will be displayed
And I will be able to add Other Protocol Identifiers
And I will be able to add Grant Information
And I will be able to update trial status and trial status dates and edit trial status history
And I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates
And I will be able to update participating site status
And I will be able to add Trial Related Document
And I will be able to review or cancel my update

Scenario: #2 I search my trials and select the update option
Given I am in the CTRP Registration applicatin
And I have selected the option to search my trials in CTRP (trials where I am listed as owner)
And I have selected the Update option
When I select the review option
Then CTRP will check the updated information 
And if there are no errors, I can submit the trial with indication of a successful submission
And the information updates will be registered in CTRP
And the CTRO will be able to acknowledge or reject the Update to trial information


