@PA @global
Feature: PA F07 View and Add Trial Milestones

As any CTRP PA User, I can View and Add Milestones

Scenario: #1 I view current trial milestones
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial Milestones Screen
Then I can view the trail milestone information for the current (most recent) submission number Ordered by Milestone Date and Time with the oldest Date and Time first:
|Submission Number| 
|Milestone|
|Milestone Date and Time| 
|Comment|
|Creator (Username)|
|Creation Date (Date and Time)|

Scenario: #2 I view any submission trial milestones
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial Milestones Screen
And I have selected a submission number
Then I can view the trail milestone information for the selected submission number Ordered by Milestone Date and Time with the oldest  Date and Time first:
|Submission Number| 
|Milestone|
|Milestone Date and Time| 
|Comment|
|Creator (Username)|
|Creation Date (Date and Time)|

Scenario: #3 I can add trial milestones
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial Milestones Screen
And I have selected the current submission number
And I can view the trail milestone information for the current 
And I can select a Milestone from the list:
| Submission Received Date|
|Submission Acceptance Date|
|Submission Terminated Date|
|Submission Reactivated Date|
|Submission Rejection Date|
|Administrative Processing Start Date|
|Administrative Processing Completed Date|
|Ready for Administrative QC Date|
|Administrative QC Start Date|
|Administrative QC Completed Date|
|Scientific Processing Start Date|
|Scientific Processing Completion Date|
|Ready for Scientific QC Date|
|Scientific QC Start Date|
|Scientific QC Completed Date|
|Ready for TSR Date|
|Trial Summary Report Date|
|Submitter Trial Summary Report Feedback Date|
|Initial Abstraction Verified Date|
|On-going Abstraction Verified Date|
|Late Rejection Date| 
And I can enter the date
And I can enter a comment
Then the information will be associated with the trial
