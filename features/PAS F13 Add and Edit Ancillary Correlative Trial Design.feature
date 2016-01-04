@PA @global
Feature:  PAS F13 Add and Edit Ancillary Correlative Trial Design 
As a CTRP Scientific Abstractor, I can add and edit Ancillary Correlative Trial Design 

Scenario: #1 I can add and edit Ancillary Correlative Trial Design for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Ancillary Correlative Trial Design screen
And I can select a different value for Primary Purpose:
      |Primary Purpose         |
      |Treatment               |
      |Prevention              |
      |Supportive Care         |
      |Screening               |
      |Diagnostic              |
      |Health Services Research|
      |Basic Science           |
      |Other                   |
And I can select a different value for Trial Phase:
      |Trial Phase |
      |0           |
      |I           |
      |I/II        |
      |II          |
      |II/III      |
      |III         |
      |IV          |
      |NA          |
And I can select a different value for Is this a pilot?:
	|Is this a pilot? |
    |yes	          |         
	|no	              |
And I can select a value for Study Model:
	|Study Model| 
    |Cohort|
	|Case-control    |
	|Case-Only  |
	|Case-crossover   |
	|Ecologic or community studies|
	|Family-based |
	|Other|       
And I can select a value for Time Perspective
	|Prospective  |
	|Retrospective |  
	|Cross-sectional |
	|Other |
And I can select a value for Bio specimen Retention
	|Bio specimen Retention |
    |None Retained |
	|Samples With DNA |
	|Samples Without DNA |
And I can enter a value for Bio-specimen Description 
And I can enter a numeric value for Number of Groups/Cohorts
And I can enter a numeric value for Target Enrollment
When I select Save
Then the Ancillary Correlative Trial Design for the trial will be associated with the trial

Scenario: #2 Clinical Research Category, Primary Purpose, Trial Phase, Study Model, Number of Groups/Cohorts, Target Enrollment not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Ancillary Correlative Trial Design screen
And any of the following <field name> are null 
|field name                |
|Clinical Research Category|
|Primary Purpose           |
|Trial Phase               |
|Study Model               |
|Number of Groups/Cohorts  |
|Target Enrollment         |
When I select Save
Then a warning message will appear for the null values with the message “<field name> is required”

Scenario:  #3 Primary Purpose of Other
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Ancillary Correlative Trial Design screen
When I have selected Other for Primary Purpose
Then a required text box appears

Scenario:  #4 Character display for Primary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And the 'If Primary Purpose is 'Other', describe' box displays
     When I am entering text
     Then information text appears to display the number of characters available to enter into the field
      | 200 characters left | 
     When 200 characters have been entered
     Then no additional text can be entered

Scenario:  #5 Study Model of Other
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Ancillary Correlative Trial Design screen
When I have selected Other for Study Model
Then a required text box appears

Scenario:  #6 Character display for Study Model of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Ancillary Correlative Trial Design screen
      And the 'If Study Model is 'Other', describe' box displays
     When I am entering text
     Then information text appears to display the number of characters available to enter into the field
      | 200 characters left | 
     When 200 characters have been entered
     Then no additional text can be entered
     
Scenario:  #7 Character display for Bio-Specimen Description
 Given I am logged into the CTRP Protocol Abstraction application
 And I have selected a trial
 And I am on the Ancillary Correlative Trial Design screen
 When I am entering text in Bio-Specimen Description
 Then information text appears to display the number of characters available to enter into the field
  |800 characters left | 
 When 800 characters have been entered
 Then no additional text can be entered     

Scenario:  #8 Update  Clinical Research Category with Interventional
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Ancillary Correlative Trial Design screen
     When I select Interventional for Clinical Research Category
      And I select Save
     Then Clinical Research Category is updated
      And the following <common fields> are populated with the values from Ancillary Correlative Trial Design 
|common fields           |
|Primary Purpose  |
|Phase            |
|Is this a pilot  |
|Target enrollment|
And the  <Ancillary Correlative fields> are not displayed
|Ancillary Correlative fields|
|Study Model|
|Time Perspective|
|Bio-speciment Retention|
|Number of groups/Cohorts|
And the <Interventional fields> are displayed
|Interventional fields|
|Secondary Purpose|
|Intervention Model|
|Arms|
|Masking|
|Allocation|
|Study Classification|
|Final Enrollment for ClinicalTrial.gov|
|Accruals|

Scenario:  #9 Update  Clinical Research Category with Observational
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Ancillary Correlative Trial Design screen
     When I select Observational for Clinical Research Category
      And I select Save
     Then Clinical Research Category is updated
      And the following <common fields> are populated with the values from Ancillary Correlative Trial Design 
|common fields           |
|Primary Purpose  |
|Phase            |
|Is this a pilot  |
|Target enrollment|
|Study Model|
|Time Perspective|
|Bio-speciment Retention|
|Number of groups/Cohorts|


    Scenario:  #10 Update  Clinical Research Category with Expanded Access
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Ancillary Correlative Trial Design screen
     When I select Expanded Access for Clinical Research Category
      And I select Save
     Then Clinical Research Category is updated
      And the following <common fields> are populated with the values from Ancillary Correlative Trial Design 
|common fields           |
|Primary Purpose  |
|Phase            |
|Is this a pilot  |
|Target enrollment|
And the  <Ancillary Correlative fields> are not displayed
|Observational fields|
|Study Model|
|Time Perspective|
|Bio-speciment Retention|
|Number of groups/Cohorts|
And the <Interventional fields> are displayed
|Interventional fields|
|Secondary Purpose|
|Intervention Model|
|Arms|
|Masking|
|Allocation|
|Study Classification|
|Final Enrollment for ClinicalTrial.gov|
|Accruals|
|Expanded Access|


      |Clinical Research Category |
      |Interventional             |  
      |Expanded Access            |
      |Observational              |
      |Ancillary Correlative      |
      
Scenario:  #11 I can Cancel Trial Design screen for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Ancillary Correlative Trial Design screen
When I have selected Cancel
Then the information entered or edited on the Observational Trial Design screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.

Scenario:  #12 I can Reset Trial Description screen for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Ancillary Correlative Trial Design screen
When I have selected Reset
Then the information entered or edited on the Non-interventional Trial Design screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.


