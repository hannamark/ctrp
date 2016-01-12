@PA @global
Feature:  PAS F03 Add and Edit Observational Trial Design 
As a CTRP Scientific Abstractor, I can add and edit Observational Trial Design 

Scenario: #1 I can add and edit Observational Trial Design for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected an observational trial
And I am on the Trial Design screen
And I can view a value of Clinical Research Category of observational
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
And I can enter a numeric value for Final Enrollment for ClinicalTrials.gov
When I select Save
Then the Observational Trial Design for the trial will be associated with the trial
And the message Record Updated displays

Scenario: #2 Primary Purpose, Trial Phase, Study Model, Number of Groups/Cohorts, Target Enrollment not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected an observational trial
And I am on the Trial Design screen
And Clinical Research Category is null 
When I select Save
Then a warning message will appear for the null values with the message “Clinical Research Category is required”

Scenario: #3 Primary Purpose is not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected an observational trial
And I am on the Trial Design screen
And Primary Purpose is null 
When I select Save
Then a warning message will appear for the null values with the message “Primary Purpose is required”

Scenario: #4 Trial Phase is not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected an observational trial
And I am on the Trial Design screen
And Trial Phase is null 
When I select Save
Then a warning message will appear for the null values with the message “Trial Phase is required”

Scenario: #5 Study Model is not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected an observational trial
And I am on the Trial Design screen
And Study Model is null 
When I select Save
Then a warning message will appear for the null values with the message “Study Model is required”
,
Scenario: #6  Number of Groups/Cohorts is not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected an observational trial
And I am on the Trial Design screen
And Number of Groups/Cohorts is null 
When I select Save
Then a warning message will appear for the null values with the message “Number of Groups/Cohorts is required”

Scenario: #7  Target Enrollment not null 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected an observational trial
And I am on the Trial Design screen
And Number of Target Enrollment is null 
When I select Save
Then a warning message will appear for the null values with the message “Target Enrollment is required”

Scenario:  #8 Primary Purpose of Other
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Observational Trial Design screen
When I have selected Other for Primary Purpose
Then a required text box appears

    Scenario: #9 Primary Purpose of Other text box is not null 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Primary Purpose is Other
      And the 'If Primary Purpose is Other, describe' text box is null
     When I select Save
     Then a warning message will appear "If Primary Purpose is Other, describe is required”

Scenario:  #10 Character display for Primary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And the 'If Primary Purpose is 'Other', describe' box displays
     When I am entering text
     Then information text appears to display the number of characters available to enter into the field
      | 200 characters left | 
     When 200 characters have been entered
     Then no additional text can be entered

Scenario:  #11 Study Model of Other
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Observational Trial Design screen
When I have selected Other for Study Model
Then a required text box appears

 Scenario: #12 Study Model of Other text box is not null 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Study Model is Other
      And the 'If Study Model is Other, describe' text box is null
     When I select Save
     Then a warning message will appear "If Study Model is Other, describe is required”

Scenario:  #13 Character display for Study Model of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Observational Trial Design screen
      And the 'If Study Model is 'Other', describe' box displays
     When I am entering text
     Then information text appears to display the number of characters available to enter into the field
      | 200 characters left | 
     When 200 characters have been entered
     Then no additional text can be entered
 
 Scenario:  #14 Time Perspective of Other
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Observational Trial Design screen
When I have selected Other for Time Perspective
Then a required text box appears

 Scenario: #15 Time Perspective of Other text box is not null 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Time Perspective is Other
      And the 'If Time Perspective is Other, describe' text box is null
     When I select Save
     Then a warning message will appear "If Time Perspective is Other, describe is required”

Scenario:  #16 Character display for Time Perspective of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Observational Trial Design screen
      And the 'If Time Perspective is 'Other', describe' box displays
     When I am entering text
     Then information text appears to display the number of characters available to enter into the field
      | 200 characters left | 
     When 200 characters have been entered
     Then no additional text can be entered
     
Scenario:  #17 Character display for Bio-Specimen Description
 Given I am logged into the CTRP Protocol Abstraction application
 And I have selected a trial
 And I am on the Observational Trial Design screen
 When I am entering text in Bio-Specimen Description
 Then information text appears to display the number of characters available to enter into the field
  |800 characters left | 
 When 800 characters have been entered
 Then no additional text can be entered     

Scenario:  #18 Update  Clinical Research Category with Interventional
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And the Clinical Research Category is Observational
      When I change Clinical Research Category to Interventional 
       |Clinical Research Category|
      | Interventional             | 
      | Expanded Access            | 
      | Observational              | 
      | Ancillary Correlative |
      And I select Save
     Then Clinical Research Category is updated with Interventional
      And the Primary Purpose displays with the previously saved value 
      And the Phase displays with the previously saved value 
      And the Is this a pilot displays with the previously saved value 
      And the Target enrollment displays with the previously saved value 
      And Final Enrollment for ClinicalTrials.gov displays with the previously saved value
 And Secondary Purpose displays 
 And I can select a value for Secondary Purpose:
 |Secondary Purpose|
|Ancillary-Correlative|
|Other|
And Intervention Model displays
And I must select a value for Intervention Model
| Intervention Model | 
      | Single Group       | 
      | Parallel           | 
      | Cross-Over         | 
      | Factorial          | 
And Number of Arms displays
And I can enter a numeric value for Number of Arms
And Masking Displays
And I must select a value for Masking
 | Masking      | 
      | Open         | 
      | Single Blind | 
      | Double       | 
And Allocation displays
And I must select a value for Allocation
  |Allocation|
      |Randomized Controlled Trial|
      |Non-Randomized Trial|
      |NA|
And Study Classification displays
And I can select a value for Study Classification
   | Study Classification              | 
      | Safety                            | 
      | Efficacy                          | 
      | Safety/Efficacy                   | 
      | Bioavailability                   | 
      | Bioequivalence                    | 
      | Pharmacodynamics                  | 
      | Pharmacokinetics/Pharmacodynamics | 
      | NA                                | 

Scenario:  #19 Update  Clinical Research Category with Ancillary Correlative
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Clinical Research Category is Observational 
     When I change Clinical Research Category to Ancillary Correlative 
      And I select Save
     Then Clinical Research Category is updated with Ancillary Correlative
      And the Primary Purpose displays with the previously saved value 
      And the Phase displays with the previously saved value 
      And the Is this a pilot displays with the previously saved value 
      And the Target enrollment displays with the previously saved value 
      And Final Enrollment for ClinicalTrials.gov displays with the previously saved value
 And Study Model displays 
          And I MUST select a value for Study Model
          And Time Perspective displays  
           And I MUST select a value for Time Perspective
           And Bio-speciment Retention displays  
            And I can select a value for Bio-specimen Retention
             And Number of groups/Cohorts displays  
             And I can enter a value for Groups/Cohorts
             When I select Save
             Then the updated trial design is associated with the trial
             And the message Record Updated displays
  
    Scenario:  #20 Update  Clinical Research Category with Expanded Access
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
       And Clinical Research Category is Observational 
     When I change Clinical Research Category to Expanded Access 
      And I select Save
     Then Clinical Research Category is updated with Expanded Access
     And the Primary Purpose displays with the previously saved value 
      And the Phase displays with the previously saved value 
      And the Is this a pilot displays with the previously saved value 
      And the Target enrollment displays with the previously saved value 
      And Final Enrollment for ClinicalTrials.gov displays with the previously saved value
 And Secondary Purpose displays 
 And I can select a value for Secondary Purpose 
 And Intervention Model displays
And I must select a value for Intervention Model
And Number of Arms displays
And I can enter a numeric value for Number of Arms
And Masking Displays
And I must select a value for Masking
And Allocation displays
And I must select a value for Allocation
And Study Classification displays
And I can select a value for Study Classification
 And I select a value for <Expanded Access Type>
      | Expanded Access Type      | 
      | Available                 | 
      | No longer available       | 
      | Temporarily not available | 
      | Approved for marketing    | 
When I select Save
  Then the updated trial design is associated with the trial
  And the message Record Updated displays
      
Scenario:  #21 I can Cancel Trial Design screen for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Observational Trial Design screen
When I have selected Cancel
Then the information entered or edited on the Observational Trial Design screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.

Scenario:  #22 I can Reset Trial Description screen for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Observational Trial Design screen
When I have selected Reset
Then the information entered or edited on the Non-interventional Trial Design screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save.


