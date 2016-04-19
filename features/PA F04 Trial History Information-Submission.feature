@PA @global
Feature: PA F04 Trial History Information - Submission

As any CTRP PA User, I can View Trial History Information for Submissions and Edit the Submission Type

Scenario: #1 I can view Trial History Information for Submissions
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
Then I can view the Trial History Information type for Submissions and Updates for each submission Ordered by greatest submission number and then most recent Date:
|Submission Number| 
|Submission Date|
|Submission Type|
|Submitter User ID|
|Documents| 
|Milestone|
|Action|

Scenario Outline: #2 I can view Amendment Information for Submissions
Given I am logged into the CTRP Protocol Abstraction Application
And I have selected a Trial
When I am on the Trial History information for Submissions Screen
Then I can view Amendment Information from the the Submission Type column
     
      |Submission Type   |
      |Amendment Date    |
      |Amendment Number  |
      |Amendment Reason  |

Scenario Outline: #3 I can view Milestone Information for Submissions
Given I am logged into the CTRP Protocol Abstraction Application
And I have selected a Trial
When I am on the Trial History information for Submissions Screen
Then I can view Milestone Information from the the Milestone column
     
    |Milestone|
    |Milestone Reason|

Scenario: #4 I can edit the Trial History 
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

Scenario: #5 I can view Trial History Information Documents 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
Then the trial documents are displayed
And the documents that are attached for each Submission are identified as original documents 
And the documents that are attached for each Amendment are identified as original documents
And the documents that are attached for each Update are identified as original documents

Scenario: #6 I can view Trial History Information for Original Submission
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


Scenario: #7 I can view each document
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
When I select a document
Then the document will be opened

Scenario: #8 I can view deleted documents
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
And the indicator displays that there are deleated and revised documents associated with this trial
And I Select Show Deleted and Revisied Documents
Then I the deleted and revised documents will be displayed including the following fields
|Deletion Date|
|Deleted by Username|
|Document Type (i.e. Protocol Document, IRB Document...|
|Delete Comment|
|Filename| 
|Original|
|Deleted or Revised Attribute (D for Deleted, R for Revised)|


Scenario: #9 Document Delete Comments
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
And the indicator displays that there are deleated and revised documents associated with this trial
And I Select Show Deleted and Revisied Documents
Then files that were deleted with have the have the "Deleted or Revised Attribute" set to D
And the comment will be the comment entered by the user that deleted the file

Scenario: #10 Document Delete Comments - Revised
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Submissions Screen
And the indicator displays that there are deleated and revised documents associated with this trial
And I Select Show Deleted and Revisied Documents
Then the files that were revised will have the "Deleted or Revised Attribute" set to R
And the Comment will be "Revised" 

 Scenario: #11 Paging
      Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a Trial
      And I am on the Trial History Information Submission Screen
      Then the submission history will be displayed for the trial 
      And the list will be paganiated 