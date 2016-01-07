@PA @global
Feature:  PAS F01 Add and Edit Trial descriptions 
As a CTRP Scientific Abstractor, I can add and edit Trial Descriptions 

Scenario: #1 I can add and edit Trial Description for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
And I have entered a value for Brief Title
And I have entered a value for Brief Summary
And I have entered a value for Detailed Description
And I have entered a value for Objectives
When I select Save
Then the Trial Description for the trial will be associated with the trial
And the message Record Updated displays

Scenario: #2 Brief Title is not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
And Brief Title is null 
When I select Save
Then a warning message will appear with the message “Brief Title is required”

Scenario: #3 Brief Summary is not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
And Brief Summary is null 
When I select Save
Then a warning message will appear with the message “Summary is required”

Scenario:  #4 I can reset Trial Description screen  for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
When I have selected Reset
Then the information entered or edited on the Trial Description screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.

Scenario:  #5 I can Cancel Trial Description screen for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Trial Description screen
When I have selected Cancel
Then the information entered or edited on the Trial Description screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.

Scenario: #6  Brief Title field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Description Screen
And I am entering into “Brief Title”
Then information text appears below the Brief Title field will display the number of characters available to enter into the field.  
|300 characters left|
When 300 characters have been entered
Then no additional text can be entered

Scenario: #7  Brief Summary field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Description Screen
And I am entering into “Brief Summary”
Then information text appears below the Brief Summary field will  display the number of characters available to enter into the field.  
|5000 characters left|

Scenario:  #8  Detailed Description field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Description Screen
And I am entering into “Detailed Description”
Then information text appears below the Detailed Description field will display the number of characters available to enter into the field.  
|32000 characters left|
When 32000 characters have been entered
Then no additional text can be entered

Scenario:  #9  Objectives field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Description Screen
And I am entering into “Objectives”
Then information text appears below the Objectives field will display the number of characters available to enter into the field.  
|32000 characters left|
When 32000 characters have been entered
Then no additional text can be entered

Scenario:  #10   Mandatory at Abstraction Validation for Brief Title
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Description Screen
And I am entering into “Brief Title”
Then information text appears above the Brief Title field
|Mandatory at Abstraction Validation|

Scenario:  #11  Mandatory at Abstraction Validation for Brief Summary
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Description Screen
And I am entering into “Brief Summary”
Then information text appears above the Brief Summary field
|Mandatory at Abstraction Validation|
