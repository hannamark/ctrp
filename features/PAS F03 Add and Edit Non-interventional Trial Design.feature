@PA @global
Feature:  PAS F03 Add and Edit Non-Interventional Trial Design 
As a CTRP Scientific Abstractor, I can add and edit Non-Interventional Trial Design 

Scenario: #1 I can add and edit Non-Interventional Trial Design 

for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Non-interventional Trial Design screen
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
And I can enter a value for Bio-specimen Description (800 characters)
And I can enter a value for Number of Groups/Cohorts
And I can enter a value for Target Enrollment
When I select Save
Then the Non interventional Trial Design for the trial will be associated with the trial

Scenario: #2 Clinical Research Category, Primary Purpose, Trial Phase, Study Model, Number of Groups/Cohorts, Target Enrollment not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Non-interventional Trial Design screen
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
And I am on the Non-interventional Trial Design screen
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
And I am on the Non-interventional Trial Design screen
When I have selected Other for Study Model
Then a required text box appears

Scenario:  #6 Character display for Study Model of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Non-Interventional Trial Design screen
      And the 'If Study Model is 'Other', describe' box displays
     When I am entering text
     Then information text appears to display the number of characters available to enter into the field
      | 200 characters left | 
     When 200 characters have been entered
     Then no additional text can be entered

Scenario:  #7 Edit Clinical Research Category
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Non-Interventional Trial Design screen
      And I edit Clinical Research Category
     When Clinical Research Category = Observational
      And I select Save
     Then Clinical Research Category is updated
      And Non Interventional page is loaded
      And the following <fields> are populated with the values from Non-Interventional Trial Design
      | fields                                 | 
      | Primary Purpose                        | 
      | Trial phase                            | 
      | Is this a pilot?                       | 
      | Target enrollment                      |
      | Final Enrollment for ClinicalTrials.gov|
     When Clinical Research Category = Ancillary-Correlative
      And I select Save
     Then Clinical Research Category is updated
      And Non Interventional page is loaded
      And the following <fields> are populated with the values from Non-Interventional Trial Design
      | fields                                 | 
      | Primary Purpose                        | 
      |Trial phase                             | 
      | Is this a pilot?                       | 
      | Target enrollment                      |
      | Final Enrollment for ClinicalTrials.gov|
     When Clinical Research Category = Expanded Access
      And I select Save
     Then Clinical Research Category is updated
     And Interventional page is loaded
      And the following <fields> are populated with the values from Non-Interventional Trial Design
      | fields                                 | 
      | Primary Purpose                        | 
      | Trial phase                            | 
      | Is this a pilot?                       | 
      | Target enrollment                      |
      | Final Enrollment for ClinicalTrials.gov|
     When Clinical Research Category = Interventional
      And I select Save
     Then Clinical Research Category is updated
      And Interventional page is loaded
      And the following <fields> are populated with the values from Non-Interventional Trial Design
      | fields            | 
      | Primary Purpose   | 
      | Trial phase                            | 
      | Is this a pilot?                       | 
      | Target enrollment                      |
      | Final Enrollment for ClinicalTrials.gov| 
 
      |Clinical Research Category |
      |Interventional             |  
      |Expanded Access            |
      |Observational              |
      |Ancillary Correlative      |


Scenario:  #8 I can Reset Trial Description screen for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Non-Interventional Trial Design screen
When I have selected Reset
Then the information entered or edited on the Non-interventional Trial Design screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.

Scenario:  #9 I can Cancel Trial Design screen for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Non-Interventional Trial Design screen
When I have selected Cancel
Then the information entered or edited on the Non-Interventional Trial Design screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.

