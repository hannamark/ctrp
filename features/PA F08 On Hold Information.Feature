@PA @global
Feature: PA F08 On Hold Information
Description:  As any CTRP PA User, I can place a trail on hold and view the on hold history

Scenario: #1 I can View On Hold Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
Then the trial On Hold Information will be displayed and include the following fields ordered accending by On Hold Date/Time (oldest Date first):
|On Hold Reason Code|
|Reason Catagory|
|On Hold Reason Description|
|On Hold Date/Time|
|Off Hold Date/Time|

Scenario: #2 I can place a trial on On Hold 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And I have selected Add to place a trial on hold
When I Select the On Hold Reason Code from the list:
|Submission Incomplete|
|Submission Incomplete -- Missing Documents| 
|Invalid Grant |
|Pending CTRP Review |
|Pending Disease Curation |
|Pending Person Curation |
|Pending Organization Curation|
|Pending Intervention Curation|
|Other| 
And I Select the Reason Catagory from the list:
|Submitter| |
|CTRP |
And I enter a Reason Description
And I enter the On Hold Date
Then I can select save to place the trail on hold
And the trial processing status will be set On Hold
And an e-mail will be sent to the trial owners for the on hold reason 

Scenario: #3 I can take a trial off Hold 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And I have selected edit to edit the trial on hold status
And I enter the off hold date
Then I the trail will no longer be on hold
And the trial processing status will be set Off Hold
And an e-mail will be sent to the trial owners to tell them the trial is nolonger on hold

Scenario: #4 On Hold Reason Codes for Submitter Reason Catagory
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And I have selected Add to place a trial on hold
When I Select the On Hold Reason Code from the list:
|Submission Incomplete|
|Submission Incomplete -- Missing Documents| 
|Invalid Grant |
Then the Reason Catagory will only be:
|Submitter|

Scenario: #5 On Hold Reason Codes for CTRP Reason Catagory
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected On Hold Information
And I have selected Add to place a trial on hold
When I Select the On Hold Reason Code from the list:
|Pending CTRP Review|
|Pending Disease Curation|
|Pending Person Curation|
|Pending Organization Curation|
|Pending Intervention Curation|
Then the Reason Catagory will only be
|CTRP|

Scenario: #6 PA On Hold Reason Description field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Add Trial On Hold Information Screen
Then a comment appears below the On Hold Reason Description field to display the number of characters available to enter into the field.  
|4000 characters left|
