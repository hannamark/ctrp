@Global @Reg
Feature: As a CTRP User, I can register a trial's key dates and trial status

Scenario 1: I can enter a trial status and trial status date for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Trial Status screen
When I have entered or selected a date
And I have selected a trial status
Then the trial status and date will be checked against validation rules
And the trial status and date will be displayed as trial status history with any errors or warnings from the Trial Status Transition Rules
@https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Transition+Rules

Scenario 2: I can enter a Administratively Complete, Withdrawn, or Temporarily Closed trial status and trial status date for a trial and indicate why the study was stopped
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Trial Status screen
When I have entered or selected a date
And I have selected a trial status of Administratively Complete, Withdrawn, or Temporarily Closed
Then the "Why Study Stopped" information will be required to enter trial status

Scenario 3: I can enter a Trial Dates as either actual or anticipated
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Trial Dates screen
When I have entered or selected a Trial Start Date as either Anticipated or Actual
And I have entered or selected a Primary Completion Date as either Anticipated or Actual
And I have entered or selected a Completion Date as either Anticipated or Actual
And the trial status dates conform to the Trial Status Rules for Start and Completion Dates
@https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Rules+for+Start+and+Completion+Dates
Then the Register Trial Trial Dates section will be complete
