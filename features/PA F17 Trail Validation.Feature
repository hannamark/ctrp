@PA @global

Feature: PA F17 Trial Validation (Submission)

As any CTRP PA User, I can enter Trial Validation (Submission) 

Scenario: #1 I view menu items - Protocol Trial
Given I have selected a trial for Trail Validation
And the trial is a Protocol Trial 
Then the sidebar menu will be displayed expanded:
|Trial Validation - <Current Trial ID>|
|Trial Overview (Section)|
|Trial Information|
|Trial History|
|Trial Milestones|
|On Hold Info|
|View TSR|
|Assign Ownership|
|Check Out History|
|Administrative Data (Section)|
|General Trial Details|
|Regulatory Information - FDAAA|
|Regulatory Information - IND/IDE|
|Trial Status|
|Trial Funding|
|Trial Related Documents|
|NCI Specific Information|
|Trial Validation (section)|
|Submission Validation|


Scenario: #2 I view menu items - Imported  Trial
Given I have selected a trial for Trail Validation
And the trial is a Imported Trial 
Then the sidebar menu will be displayed expanded:
|Trial Validation - <Current Trial ID>|
|Trial Overview (Section)|
|Trial Information|
|Trial History|
|Trial Milestones|
|On Hold Info|
|View TSR|
|Assign Ownership|
|Check Out History|
|Administrative Data (Section)|
|General Trial Details|
|Participating Sites|
|NCI Specific Information|
|Trial Validation (section)|
|Submission Validation|

Scenario: #3  I can edit the trail phase on the submission validation screen
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And I edit the trial Phase
|0|
|I|
|I/II|
|II|
|II/III|
|III|
|IV|
|NA|
Then the Phase will be complete

Scenario: #4 I can enter if the trail is a pilot on the submission validation screen
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And I edit if the trial is a pilot
|Yes|
|No|
Then the pilot selection will be complete

Scenario: #5 I can enter the Primary Purpose for the trial on the submission validation screen
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And I edit the Primary Purpose
|Treatment|
|Prevention|
|Supportive Care|
|Screening|
|Diagnostic|
|Health Services Research|
|Basic Science|
|Other|
Then the Primary Purpose will be complete

Scenario: #6 I can view the study Primary Purpose Description for the trial on the submission validation screen
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And I the Primary Purpose is "Other"
When the Primary Purpose Description is displayed 
Then a description must be entered

Scenario: #7 I can add and edit the Amendment Reason Code 
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And the trial is an amendment 
When I select the Amendment Reason Code from the list:
|Administrative|
|Scientific|
|Both|
Then the selected value for  Amendment Reason Code will be associated with the trial

Scenario: #8 Amendment Reason Code Required 
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And the trial is an amendment 
And the Amendment Reason Code is not selected
Then an error message will appear "Amendment Reason Code is Required"

Scenario: #9 Save Trial Validation
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
When select save 
Then the information entered or edited for the trail will be saved to the trial record

Scenario: #10 Accept Trial Validation - Origional
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
When select Accept
And the submission is not an amendment
Then the information entered or edited for the trail will be saved to the trial record
And the trial processing status will be Accepted 
And the "Submission Accepted Trial" e-mail will be sent to the trial submitter
Then the trial milestone "Submission Accepted Date" will be created with the current date and time 

Scenario: #10a Accept Trial Validation - Amendment
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
When select Accept
And the submission is an amendment
Then the information entered or edited for the trail will be saved to the trial record
And the trial processing status will be Accepted 
And the "Amendment Submission Accepted" e-mail will be sent to the trial submitter
Then the trial milestone "Submission Accepted Date" will be created with the current date and time


Scenario: #11 Cancel Trial Validation 
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
When select Cancel
Then the information entered or edited for the Trail will not be saved to the trial record (rollback)
And the screen will be refreshed with the existing data

Scenario: #12 Reject Trial Validation - amendment
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And I select Reject
And the submission is an amendment
Then the warning message will be displayed "Rejecting this submission and roll back the trial to the prior submission
And I must select a Rejection Reason from the list:
|Out of Scope|
|Duplicate|
|Other|
And I can optionally add a Rejection Reason Comment
Then the information entered or edited for the trail will not be saved to the trial record (rollback)
And the trial processing status will be Rejected
And the trial milestone Submission Rejection Date will be created with the current date and time 
And the "Amendment Submission Rejected" e-mail will be sent to the trial submitter

Scenario: #12a Reject Trial Validation - original
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And I select Reject
And the submission is not an amendment
Then the warning message will be displayed "Rejecting this submission will reject this trial"
And I must select a Rejection Reason from the list:
|Out of Scope|
|Duplicate|
|Other|
And I can optionally add a Rejection Reason Comment
Then the information entered or edited for the trail will not be saved to the trial record
And the trial processing status will be Rejected
And the trial milestone Submission Rejection Date will be created with the current date and time 
And the "Submission Rejected Trial" e-mail will be sent to the trial submitter



Scenario: #13 Place On Hold Trial Validation
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
When I select Place On Hold
Then the information entered or edited for the trail will be saved to the trial record
And the "On Hold Info" screen will be displayed

Scenario: #14 Accept Trial Validation Error Protocol Original
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And the trial information source is
|Protocol|
And the trial submission number is (original)
|1|
When I select Accept
And any of the mandatory fields have not be entered:
|Lead Organization identifier|
|Official Title|
|Phase|
|Primary Purpose|
|Lead Organization|
|Principal Investigator|
|Sponsor Organization|
|Responsible Party|
|Investigator|
|Investigator Title|
|Investigator Affiliation|
Then an Error message will be displayed stating the missing fields are required

Scenario: #15 Accept Trial Validation Errors Protocol Amendment
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And the trial information source is
|Protocol|
And the trial submission number is (Amendment)
|>1|
When I select Accept
And any of the mandatory fields have not be entered:
|Lead Organization identifier|
|Official Title|
|Phase|
|Primary Purpose|
|Lead Organization|
|Principal Investigator|
|Sponsor Organization|
|Responsible Party|
|Investigator|
|Investigator Title|
|Investigator Affiliation|
|Amendment Reason Code|
Then a Error message will be displayed stating the  missing fields are required

Scenario: #16 Accept Trial Validation Errors Imported
Given I have selected a trial for Trail Validation 
And I am on the Submission Validation screen
And the trial information source is
|Imported|
When I select Accept
And any of the mandatory fields have not be entered:
|Lead Organization identifier|
|Official Title|
|Phase|
|Primary Purpose|
|Lead Organization|
Then a Error message will be displayed stating the missing fields are required
