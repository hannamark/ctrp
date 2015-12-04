@PA @global
Feature: PA F04 Trial History Information -Submission

As any CTRP PA User, I can View Trial History Information for Submissions and Edit the submission Type

Scenario: #1 I can view Trial History Information for Submissions
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
Then I can view the Trial History Information for Submissions for each submission number Ordered by greatest submission number:
|Submission Number| 
|Submission Date|
|Submission Type
|Amendment Date|
|Amendment Number|
|Amendment Reason|
|Submitter User ID|
|Documents| 
|Milestone|
|Milestone Comment|

Scenario: #2 I can edit the Trial History 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
And I select Edit Trial History
When I select Amendment Reason <Amendment Reason>
|<Amendment Reason>|
|Administrative|
|Scientific|
|Both|
And I enter an Amendment Number
|Amendment Number|
And I enter the Amendment Date
|Amendment Date|
And I select Save
Then the Trial History will be associated with the trial

Scenario: #3 I can view Trial History Information Documents 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
Then the trial documents are displayed for each submission
And the documents that are attached for each submission are identified as original documents 

Scenario: #4 I can view Trial History Information for Original Submission
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
And the submission number is 1 for an original submission
Then I can view the Trial History Information for Submissions for each submission number Ordered by greatest submission number:
|Submission Number| 
|Submission Date|
|Submission Type|
|Submitter User ID|
|Documents| 
|Milestone|
|Milestone Comment|

Scenario: #5 I can view each document
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
When I select a document
Then the document will be opened

Scenario: #6 I can view deleted documents
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
And the indicator displays that there are deleated documents associated with this trial
Then I can display the deleted documents

