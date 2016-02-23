@PA @global
Feature:  PAS F04 Add and Edit Outcome Measures
As a CTRP Scientific Abstractor, I can add, edit, copy and delete Outcome Measures 

Scenario: #1 I can add Outcome Measures for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
And I have Selected Add Button
And Add/Edit Outcome Measure screen displays
And I have selected a value for Outcome Measure Type
|Outcome Measure Type|
|Primary|
|Secondary|
|Other Pre-specified|
And I have entered a value for Title
And I have entered a value for Time Frame
And I have entered a value for Description
And I have selected a value for Safety Issue
|Safety Issue|
|Yes|
|No|
When I select Save
Then the Outcome Measure for the trial will be associated with the trial
And <Created Message> displays
|Created Message|
|Record created|
And the Outcome Measures table will display Outcomes Measures values


      |Outcome Measure Type  |
      |Title  |
      |Time Frame  |
      |Description  |
      |Safety Issue  |
      |Edit  |
      |Copy  |
      |Delete  |
And I can add another Outcome Measure      




Scenario: #2 I can edit Outcome Measures for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
And I have Selected Edit on an existing Outcome Measure 
And I have entered or edited a value for Outcome Measure Type
|Outcome Measure Type|
|Primary|
|Secondary|
|Other Pre-specified|
And I have edited a value for Title
And I have edited a value for Time Frame
And I have entered or edited a value for Description
And I have selected another value for Safety Issue
|Safety Issue|
|Yes|
|No|
When I have selected Save Then the Outcome Measure for the trial will be associated with the trial 
And the message Record Updated displays

  Scenario: #3 Add/Edit Outcome Measure rules
    Given I am on the Add/Edit Outcome Measure
    And I have not entered an <AddEditOutcomeMeasureFieldType>
     When I haved clicked on the save Button
     Then The <FieldError> will be displayed
     
     
      |<AddEditMeasureFieldType>   |<FieldError>  |
      |Outcome Measure Type        |Outcome Measure Type must be Entered  |
      |Title                       |Title must be Entered  |
      |Time Frame                  |Time Frame must be Entered |
      |Safety Issue                |Safety Issue must be Entered  |


Scenario:  #4  Reorder Outcome Measures
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Outcome Measure Screen
And I am viewing the Outcome Measures table
When I click on a record 
And drag it to a new sequence location in the table
Then the order of the outcome measures changes

Scenario:  #5  Copy Outcome Measures
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Outcome Measure Screen
And I am viewing the Outcome Measures table                      
When I click on a record
And click on copy 
Then the Add/Edit Outcome Measure screen displays
And I can edit all fields 
When I click Save
Then the new Outcome Measure for the trial will be associated with the trial
And the new outcome Measure is displayed on the outcome measure table
And no changes have been made on the original outcome measure.

Scenario:  #6 I can reset Outcome Measures for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
When I select Add
And I am on the Add/Edit Outcome Measures screen
And I have entered values 
When I have selected Reset
Then the information entered on the Outcome Measures screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save 
When I select Edit

Scenario:  #7 I can delete Outcome Measure for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Outcome Measures screen
When I have selected the delete check box for an outcome measure
Then the information entered or edited on the Outcome Measures screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save
When I have selected Select All
Then the delete checkbox for all Outcome Measure is checked
When I select Delete
Then the information for the Outcome Measures will be deleted
And the Outcome Measures will not be saved to the trial record


Scenario: #8  Title field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Outcome Measure Screen
When I am entering into Title
Then information text appears below the Brief Title field to display the number of characters available to enter into the field.  
|254 characters left|
When 254 characters have been entered
Then no additional text can be entered

Scenario: #9  Time Frame field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Outcome Measure Screen
When I am entering into Time Frame field 
Then information text appears below the Time Frame field to display the number of characters available to enter into the field.  
|254 characters left|
When 254 characters have been entered
Then no additional text can be entered 

Scenario:  #10 Description field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Outcome Measure Screen
When I am entering into Description
Then information text appears below the Detailed Description field to display the number of characters available to enter into the field.  
|999 characters left|
When 999 characters have been entered
Then no additional text can be entered 