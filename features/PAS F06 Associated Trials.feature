@PA @global
Feature: As a CTRP Scientific  Abstractor, I can add and edit Associated Trial 

Scenario: # I can add an Associated Trial for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Associated Trials screen
When  I have selected the Add button
Then I am on the Add/Edit Associated Trial screen
And I must enter the Trial Identifier
And I must select <Identifier Type>
|Identifier Type|
|NCI |
|CTEP|
And I have selected the <Clinical Research Category>
|Clinical Research Category|
|Interventional|
|Observational|
|Ancillary-Correlative|
|Expanded Access|
And I have entered a value for Official Title
When I have selected the Save button
Then the selected study displays on the Associated Trials screen
And the Message 'Record Created' displays
And the Associated Trial will be associated with the trial

Scenario: #2 I can add an Associated Trial for a trial with Trial Search
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Associated Trials screen
When  I have selected the Add button
Then I am on the Add/Edit Associated Trial screen
When I have selected the Look Up Trial button
Then I am on the Trial Search screen 
And I have entered search criteria
When I have selected the Search button
Then the search results display
When I have selected a study
Then the selected study displays on the Associated Trials screen
And the Message 'Record Created' displays
And the Associated Trial will be associated with the trial

Scenario: #3 I can edit an Associated Trial for a trial 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Associated Trials screen
When I have clicked on the edit icon for an individual CTRP registered trial 
Then I am on the Add/Edit Associated Trial screen
And the message displays 'Because this association is with a registered CTRP trial, you will not be able to change trial information on this screen.  Use Look Up Trial button if you need to change the association to a different registered trial, or create a brand new association if your trial is not registered in CTRP'
When I click on the Cancel button
Then the Associated Trials screen displays
And the Associated Trial will still be associated with the trial
When I have clicked on the edit icon for an individual trial that is not yet registered with CTRP 
Then I am on the Add/Edit Associated Trial screen
And the message displays 'This association is with a trial that is not yet registered in CTRP'
And I have updated fields
When I click the Save button
Then the Associated Trials screen displays
And the Message 'Record Updated' displays
And the updated Associated Trial will be associated with the trial

Scenario:  #4 Trial Identifier information not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Associated Trial screen
When I select Save 
And any of the following <field name> are Null
|field name|
|Brief Title|
|Identifier Type|
Then a warning message will appear for the null values with the message “<field name> is required” 

Scenario: #5 Official Title character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Associated Trial Screen
When I enter a value for Official Title
Then information text appears below the Official Title field to display the number of characters available to enter into the field.  
|3000 characters left|

Scenario: #6 Deleted Associated Trials
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Associated Trials screen
And I have checked the Delete box for an Associated Trial
And I have selected the delete check box for another Associated Trial
When I have clicked on Delete button
Then the message displays 'click OK to remove selected Associated Trial(s) from the study. Click Cancel to abort'
And I have clicked on OK
Then the Associated Trial will be removed from the trial
When I have clicked on the cancel button 
Then the Associated Trial(s) is not removed 
And no message displays
When I have clicked the Select All button
Then the Delete check box is checked for all entries
When I have clicked on Delete button
Then the message displays 'Click OK to remove selected Associated Trial(s) from the study. Click Cancel to abort'
When I click on the OK button 
Then the Associated Trial(s) is removed from the trial record
And the message ‘Record(s) deleted’ displays
When I have clicked on the cancel button 
Then the Associated Trial is not removed 
And no message displays

Scenario: #7 Cancel Associated Trial for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I am on the Add/Edit Associated Trial screen
And I have updated Associated Trial
When I select the Cancel button
Then the information entered or edited on the Associated Trial screen will not be saved to the trial record
And the screen will be refreshed with the existing data
And the Associated Trials screen displays
