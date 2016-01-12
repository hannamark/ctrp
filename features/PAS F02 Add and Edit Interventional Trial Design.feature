@PA @global
Feature:  PAS F02 Add and Edit Interventional Trial Design 
As a CTRP Scientific Abstractor, I can add and edit Interventional Trial Design 

  Scenario: #1 I can add and edit Interventional Trial Design for a trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected an Interventional trial
      And I am on the Trial Design screen
        And the value for Clinical Research Category is defaulted to interventional
         And I can select a different value for Primary Purpose:
      | Primary Purpose          | 
      | Treatment                | 
      | Prevention               | 
      | Supportive Care          | 
      | Screening                | 
      | Diagnostic               | 
      | Health Services Research | 
      | Basic Science            | 
      | Other                    | 
   And I can select a different value for Secondary Purpose Type:
      | Secondary Purpose Type | 
      | Ancillary-Correlative  | 
      | Other                  | 
      | No                     | 
          And I can select a different value for Trial Phase:
      | Trial Phase | 
      | 0           | 
      | I           | 
      | I/II        | 
      | II          | 
      | II/III      | 
      | III         | 
      | IV          | 
      | NA          | 
      And I can select a different value for Is this a pilot:
      | Is this a pilot | 
      | yes             | 
      | no              | 
      And I can select a value for Intervention Model:
      | Intervention Model | 
      | Single Group       | 
      | Parallel           | 
      | Cross-Over         | 
      | Factorial          | 
      And I can enter a value for Arms
      And I can select a value for Masking:
      | Masking      | 
      | Open         | 
      | Single Blind | 
      | Double       | 
      And I can select a value for Allocation:
      |Allocation|
      |Randomized Controlled Trial|
      |Non-Randomized Trial|
      |NA|
      And I can select a value for Study Classification:
      | Study Classification              | 
      | Safety                            | 
      | Efficacy                          | 
      | Safety/Efficacy                   | 
      | Bioavailability                   | 
      | Bioequivalence                    | 
      | Pharmacodynamics                  | 
      | Pharmacokinetics/Pharmacodynamics | 
      | NA                                | 
      And I can enter a value for Target Enrollment
      And I can enter a value for Final Enrollment for ClinicalTrials.gov
     When I select Save
     Then the Interventional Trial Design for the trial will be associated with the trial
      And the message Record Updated displays
  
  Scenario: #2 Clinical Research Category is not null 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Clinical Research Category is null              | 
     When I select Save
     Then a warning message will appear "Clinical Research Category is required”
  
  Scenario: #3 Primary Purpose is not null 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Primary Purpose is null 
     When I select Save
     Then a warning message will appear "Primary Purpose is required”  
   
   Scenario: #4 Trial Phase is not null
   Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Trial Phase is null 
     When I select Save
     Then a warning message will appear "Trial Phase is required”
      
    Scenario: #5 Update Clinical Research Category with Observational
      Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Clinical Research Category is Interventional
      When I change Clinical Research Category to Observational
     And I select Save
     Then Clinical Research Category is updated with Observational
      And the Primary Purpose displays with the previous saved value 
       And the Phase displays with the previous saved value 
        And the Is this a pilot displays with the previous saved value 
         And the Target enrollment displays with the previous saved value 
         And Final-Enrollment for ClinicalTrials.gov displays with the previous saved value
          And Study Model displays 
          And I MUST select a value for Study Model
          |Study Model|
          |Cohort|
          |Case-control|
          |Case-only|
          |Case-crossover|
          |Ecologic or community studies|
          |Family-based|
          |Other|
           And Time Perspective displays  
           And I MUST select a value for Time Perspective
           |Time Perspective|
           |Prospective|
           |Retrospective|
           |Cross\sectional|
           |Other|
            And Bio-speciment Retention displays  
            And I can select a value for Bio-specimen Retention
            |Bio-specimen Retention|
            |None Retained|
            |Samples with DNA|
            |Samples Without DNA|
             And Number of groups/Cohorts displays  
             And I can enter a value for Groups/Cohorts
             When I select Save
             Then the updated trial design is associated with the trial
             And the message Record Updated displays
                                  
  Scenario Outline: #6 Update Clinical Research Category with Ancillary Correlative  
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
       And Clinical Research Category is Intervention
      When I change Clinical Research Category to Ancillary Correlative
      And I select Save
     Then Clinical Research Category is updated with Ancillary Correlative
      And the Primary Purpose displays with the value from Interventional Trial Design 
       And the Phase displays with the value from Interventional Trial Design 
        And the Is this a pilot displays with the value from Interventional Trial Design 
         And the Target enrollment displays with the value from Interventional Trial Design 
         And Final-Enrollment for ClinicalTrials.gov displays with the value from International Trial Design
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
  
  Scenario Outline: #7 Update Clinical Research Category with Expanded Access 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And I edit Clinical Research Category
       And Clinical Research Category is Intervention
     When I change Clinical Research Category to Expanded Access
      And I select Save
     Then Clinical Research Category is updated with Expanded Access
        And I select a value for <Expanded Access Type>
      | Expanded Access Type      | 
      | Available                 | 
      | No longer available       | 
      | Temporarily not available | 
      | Approved for marketing    | 
      When I select Save
     Then the updated trial design is associated with the trial
     And the message Record Updated displays
  
  Scenario:  #8 Primary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
     When I have selected Other for Primary Purpose
     Then a required text box appears 
     
     Scenario: #9 Primary Purpose of Other text box is not null 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Primary Purpose is Other
      And the 'If Primary Purpose is Other, describe' text box is null
     When I select Save
     Then a warning message will appear "Primary Purpose Of Other text is required”
  
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
  
  Scenario:  #11 Secondary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
     When I have selected Other for Secondary Purpose
     Then a text box appears 
  
  Scenario:  #12 Character display for Seondary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And the 'If Secondary Purpose is 'Other', describe' box displays
     When I am entering text
     Then information text appears to display the number of characters available to enter into the field
      | 1000 characters left | 
     When 1000 characters have been entered
     Then no additional text can be entered
  
  Scenario:  #13 Masking Roles display if Blinded Masking
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And I am selecting a value for Masking 
     When the value of Masking is Single Blind 
     Then Masking Role(s) displays for multiple selection
     When the value of Masking is Double 
     Then Masking Role(s) displays for multiple selection
      | Masking Role(s)   | 
      | Subject           | 
      | Investigator      | 
      | Caregiver         | 
      | Outcomes Assessor | 
  
  Scenario:  #14 I can Reset Trial Description screen for a Trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Interventional Trial Design screen
     When I have selected Reset
     Then the information entered or edited on the Interventional Trial Design screen will not be saved to the trial record
      And the screen will be refreshed with the data since the last save.
  
  Scenario:  #15 I can Cancel Trial Design screen for a Trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Interventional Trial Design screen
     When I have selected Cancel
     Then the information entered or edited on the Interventional Trial Design screen will not be saved to the trial record
      And the screen will be refreshed with the data since the last save.
  
