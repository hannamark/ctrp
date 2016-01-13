@PA @global
Feature: PAA F06 Add and Edit Trial Status

As any CTRP PA User, I can add and edit Trial Dates and Status

Scenario: #1 I can enter a trial status and trial status date for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have selected a trial status from the list of:
|In Review| 
|Approved|
|Active| 
|Temporarily Closed to Accrual|
|Temporarily Closed to Accrual and Intervention|
|Closed to Accrual|
|Closed to Accrual and Intervention|
|Complete|
|Administratively Complete|
|Withdrawn|
|Available - Only when Clinical Research Category is expanded access and is currently available for this treatment|
|No longer available – Only when Clinical Research Category is expanded access and was available for this treatment previously but is not currently available and will not be available in the future|
|Temporarily not available – Only when Clinical Research Category is expanded access and is not currently available for this treatment, but is expected to be available in the future|
|Approved for marketing – Only when a Clinical Research Category is expanded access and this treatment has been approved for sale to the public.|
And I have entered or selected a Current Trial Status Date
And I have entered or selected a Trial Start Date
And I have selected the Trial Start Date Type of “Actual” , “Anticipated”
And I have entered or selected a Primary Completion Date
And I have selected the Primary Completion Date Type of “Actual” , “Anticipated”, "NA"
And I have entered or selected a Completion Date
And I have selected the Completion Date Type of “Actual” , “Anticipated”
And have entered or edited the Trial On Hold Reason Comments when the trial status is:
|Administratively Complete|
|Withdrawn|
|Temporarily Closed to Accrual|
|Temporarily Closed to Accrual and Intervention|
And have entered or edited the Trial Status Comments
And have entered or edited the Additional Comments
When I select Save
Then the trial status and dates will be checked against validation rules and associated with the trial
And the trial status and date will be displayed as trial status history with any errors or warnings from the Trial Status Transition Rules

Scenario: #2 I can enter a trial status and invalid trial status date for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have selected a trial status 
And I have entered or selected a Current Trial Status Date
And I have entered or selected a Trial Start Date
And I have selected the Trial Start Date Type of “Actual” , “Anticipated”
And I have entered or selected a Primary Completion Date
And I have selected the Primary Completion Date Type of “Actual” , “Anticipated” , "NA"
And I have entered or selected a Completion Date
And I have selected the Completion Date Type of “Actual” , “Anticipated”
And have entered or edited the Trial Status Comments
And have entered or edited the Trial On Hold Reason Comments with the trial status is:
|Administratively Complete|
|Withdrawn|
|Temporarily Closed to Accrual|
| Temporarily Closed to Accrual and Intervention|

And have entered or edited the any Additional Trial Status Comments
When I select Save
Then the trial status and dates will be checked against validation rules and associated with the trial
And a warning will be displayed for the incorrect status transitions, dates and date types

Scenario: #3 Cancel Trial Status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status screen
When I select Reset
Then the information entered or edited on the Trial Status screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #4 PA Trial Status Comments (Trial Status)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information text appears below the Trial Status Date field
|Please refer to the Trial Status Transition Rules https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Transition+Rules |

Scenario: #5 PA Trial Status Comments (Completion Dates)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information text appears below the Completion Date field
|Please refer to the Trial Status Rules for Start and Completion Dates Rules https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Rules+for+Start+and+Completion+Dates |

Scenario: #6 PA Trial Status Comments (Why Study Stopped?)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information list appears below the Why Study Stopped?
| Administratively Complete, Withdrawn, and Temporarily Closed statuses only|

Scenario: #7 PA Trial Status Comments (Trial Status Values)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information text appears below for each Trial Status when it is selected:
| In Review - The trial is in development and waiting for final approval.|
|Approved - Trial has been approved.|
|Active – The trial is open for Accrual.| 
|Temporarily Closed to Accrual - Trial is temporarily not accruing.|
|Temporarily Closed to Accrual and Intervention - Trial has been closed to participant accrual. No participants are receiving treatment/intervention, but participants are still being followed according to the primary objectives of the study.|
|Closed to Accrual - Trial has been closed to participant accrual. Participants are still receiving treatment/intervention.|
|Closed to Accrual and Intervention - Trial is temporarily not accruing. Participants are not receiving intervention.|
|Complete - Trial has been closed to accrual; participants have completed treatment/intervention, and the study has met its primary objectives.|
|Administratively Complete - Trial has been completed prematurely (for example, due to poor accrual, insufficient drug supply, IND closure, etc.)|
|Withdrawn - Trial has been withdrawn from development and review.|
|Available - Currently available for this treatment|
|No longer available – Was available for this treatment previously but is not currently available and will not be available in the future|
|Temporarily not available – Not currently available for this treatment, but is expected to be available in the future|
|Approved for marketing – Treatment has been approved for sale to the public.|

Scenario: #8 PA Trial Status Why Study Stopped? field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then information text appears below the Why Study Stopped? field to display the number of characters available to enter into the field.  
|160 characters left|

Scenario: #9 PA Trial Status Comments field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then information text appears below the Comments field to display the number of characters available to enter into the field.  
|160 characters left|

Scenario: #10 I can not enter an invalid trial status for a non-expanded access trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And the Clinical Research Category is not Expanded Access
Then the trial status’ will not be selectable: 
|Available |
|No longer available|
|Temporarily not available|
|Approved for marketing|


Scenario: #11 Selection of Primary Completion Date Type "NA" - DCP
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have selected the Primary Completion Date Type  "NA"
And the trial does not have a DCP Trial Identifier
And I select Save
Then a warning will be displayed "Primary Completion Date Type of "NA" is only available for DCP Trials"

Scenario: #12 Selection of Primary Completion Date Type "NA" - Non Intervential
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have selected the Primary Completion Date Type  "NA"
And the trial is Intervential
And I select Save
Then a warning will be displayed "Primary Completion Date Type of "NA" is only available for Non-Interventional Trials"
