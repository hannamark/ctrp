@PA @global
Feature: As a CTRP Scientific  Abstractor, I can add and edit Associated Trial 

Scenario: #1 I can add and edit Associated Trial for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Associated Trial screen
And I am on the Trial Search screen 
And I have selected an Identifier Type 
|CTRP |
|CT.gov|
Then ‘Trial Type’ and ‘Official Title’ is displayed
When I have selected Save
Then the Associated Trial will be associated with the trial

Scenario:  #2 Trial Identifier information not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the associated Trial screen
When I select Save 
And any of the following are Null
| Brief Title|
|Brief Summary|
Then a warning message will appear for the null values with the message “Please enter the missing Trial Identifier information” 

Scenario: #4 Official Title character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Associated Trial Screen
And the “Official Title”
Then information text appears below the ‘Official Title’ field to display the number of characters available to enter into the field.  
|4000 characters left|

Scenario: #5 Deleted Associated Trials
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Associated Trials screen
When I have selected the Delete Associated Trials
And I have selected another delete check box for an Associated Trials
And have clicked on Delete button
And the message displays 'click OK to remove selected Associated Trials from the study. Click Cancel to abort'
And I have clicked on OK
Then the Associated Trial will be removed from the trial
When I have clicked the Select All button
Then the Delete check box is checked for all entries
When I have clicked on Delete button
And the message displays 'click OK to remove selected Associated Trial from the study. Click Cancel to abort'
When I click on the OK button 
Then the Associated Trial(s) is removed from the trial record
And the message ‘Record(s) deleted’ displays
When I have clicked on the cancel button 
Then the Associated Trial is not removed 
And no message displays

Scenario: #6 Cancel Associated Trial for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Associated Trial screen
And I have updated Associated Trial
When I select the Cancel button
Then the information entered or edited on the Associated Trial screen will not be saved to the trial record
And the screen will be refreshed with the existing data
