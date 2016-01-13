@PA @global
Feature: As a CTRP Abstractor, I can add and edit Sub-groups Criteria

Scenario: #1 I can add Sub-group Criteria for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Subgroups Information screen
And I have selected Add button
And the Add/Edit Sub-group Information screen displays
And I have entered a value for Label
And I have selected a value for Description
When I have selected Save
Then the Sub-group Criteria will be associated with the trial

Scenario: #2 I can edit Sub-group Information for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Sub-group Information screen
When I select the Edit icon for an existing subgroup
Then the Add/Edit Sub-group Information screen displays
And I have changed the value for Label
And I have changed the value for Description
When I have selected Save
Then the Updated Sub-group information will be associated with the trial

Scenario:  #3 Sub-group label not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Sub-group Information screen
When I select Save 
And Label is Null
Then a warning message will appear 'Label is required'

Scenario:  #4 Sub-group Description not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Sub-group Information screen
When I select Save 
And Description is Null
Then a warning message will appear 'Description is required'

Scenario: #5 Label field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Sub-group Information screen
And I am entering into Label
Then information text appears below the Label field to display the number of characters available to enter into the field.  
|200 characters left|
When 200 characters have been entered
Then no additional text can be entered

Scenario: #6 Description field character count
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Sub-group Information screen
And I am entering into Description
Then information text appears below the Description field to display the number of characters available to enter into the field.  
|200 characters left|
When 200 characters have been entered
Then no additional text can be entered

Scenario:  #7  Reorder Sub-groups Information
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Sub-groups Information Screen
When I click on a record and drag it to a new sequence location in the table
Then the order of the Sub-group Information changes

Scenario:  #8 I can Reset Sub-group Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add Edit Sub-group Information screen
When I have selected Reset button 
Then the information entered or edited on the Add/Edit Sub-group Informtion screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.

Scenario:  #9 I can Cancel Sub-group Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add Edit Sub-group Information screen
When I have selected Cancel button
Then the information entered or edited on the Add/Edit Sub-group Informtion screen will not be saved to the trial record
And the Subgroups Information screen will display

Scenario:  #10 I can delete  a Sub-groups Stratification Criteria for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Sub-group Information screen
When I have selected the Delete check box for an SubGroup 
And I have selected the Delete check box for another SubGroup
And have clicked on Delete button
And the message displays 'click OK to remove selected Marker(s) form the study. Click Cancel to abort'
And I have clicked the OK button
Then the SubGroup is removed from the trial record
And 'Record(s) deleted' message is displayed
When I have Clicked the Select All button
And the Delete check box is checked for all entries
And have clicked on Delete button
And the message displays 'click OK to remove selected SubGroups from the study. Click Cancel to abort'
And I have clicked on OK
Then the Marker(s) is removed from the trial record
And 'Record(s) deleted' message is displayed
When I have Clicked on the Delete button
And the message displays 'click OK to remove selected SubGroups from the study. Click Cancel to abort'
And I have clicked on the Cancel button
Then the SubGroup(s) is not removed from the trial record
And 'Record(s) deleted' message is not displayed

