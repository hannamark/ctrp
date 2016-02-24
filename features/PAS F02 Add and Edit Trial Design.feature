@PA @global
Feature:  PAS F02 Add and Edit Trial Design 
As a CTRP Scientific Abstractor, I can add and edit Trial Design 

  Scenario Outline: #1 I can change Clinical research Category for a trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      When I view the prefilled Clinical Research Category value
      Then I can select a different value
       
      | Interventional             | 
      | Expanded Access            | 
      | Observational              | 
      | Ancillary Correlative      | 
  
  Examples:
  
      |From Research category  |To Research category  |field  |action (diplays OR deleted) |
      | Interventional |Expanded Access  |Expanded Access Type  |displays |
      | Expanded Access | Interventional  |Expanded Access Type  |deleted  |
           
      
      | Interventional or Expanded Access |Observational or Ancillary Correlative  |Secondary Purpose  | deleted |
      | Interventional or Expanded Access|Observational or Ancillary Correlative |Secondary Purpose Other  | deleted |
      | Interventional or Expanded Access |Observational or Ancillary Correlative | Intervention Model |deleted  |
      |  Interventional or Expanded Access |Observational or Ancillary Correlative  | Arms/Groups |deleted  |
      |Interventional or Expanded Access |Observational or Ancillary Correlative |Masking  |deleted  |
      | Interventional or Expandedor Expanded Access Access |Observational or Ancillary Correlative  |Masking role Subject  |deleted  |
      |Interventional or Expanded Access |Observational or Ancillary Correlative | Masking role investigator  |deleted  |
  |Interventional or Expanded Access | Observational or Ancillary Correlative | Masking role Caregiver  |deleted  |
     |Interventional or Expanded Access |Observational or Ancillary Correlative | Masking role outcome Assessor  |deleted  |  
       |Interventional or Expanded Access |Observational or Ancillary Correlative |Allocation |deleted  | 
       |Interventional or Expanded Access |Observational or Ancillary Correlative | Study Classification |deleted  |  
         |Interventional or Expanded Access |Observational or Ancillary Correlative | Final Enrollment for clinicalTrials.gov|deleted  |  
         |Interventional or Expanded Access|Observational or Ancillary Correlative | Accruals  |deleted  |  
         |Interventionalor Expanded Access |Observational or Ancillary Correlative | Study Model  |displays |  
       |Interventional |Observational or Ancillary Correlative|Study Model other  |displays  |  
        |Interventional   or Expanded Access | Observational or Ancillary Correlative | Bio Specimen Retention |displays | 
      |Interventional  or Expanded Access  |Observational or Ancillary Correlative | Bio Specimen description  |displays | 
      |Interventional  or Expanded Access |Observational or Ancillary Correlative | Number of Groups/Cohorts  or Expanded Access   |displays | 
      
      | Observational or Ancillary Correlative |Interventional  or Expanded Access   |Secondary Purpose  | displays |
      | Observational or Ancillary Correlative |Interventional  or Expanded Access   |Secondary Purpose Other  | displays |
      | Observational or Ancillary Correlative |Interventional  or Expanded Access | Intervention Model |displays  |
      | Observational or Ancillary Correlative |Interventional  or Expanded Access  | Arms/Groups |displays  |
      |Observational or Ancillary Correlative|Interventional  or Expanded Access   |Masking  |displays  |
      | Observational or Ancillary Correlative |Interventional  or Expanded Access   |Masking role Subject  |displays  |
      |Observational or Ancillary Correlative |Interventional  or Expanded Access  | Masking role investigator  |displays  |
  |Observational or Ancillary Correlative |Interventional   or Expanded Access | Masking role Caregiver  |displays  |
     |Observational or Ancillary Correlative |Interventional  or Expanded Access  | Masking role outcome Assessor  |displays  |  
       |Observational or Ancillary Correlative |Interventional  or Expanded Access  |Allocation |displays | 
       |Observational or Ancillary Correlative |Interventional  or Expanded Access  | Study Classification |displays  |  
         |Observational or Ancillary Correlative |Interventional  or Expanded Access  | Final Enrollment for clinicalTrials.gov|displays  |  
         |Observational or Ancillary Correlative|Interventional  or Expanded Access  | Accruals  |displays  |  
         |Observational or Ancillary Correlative |Interventional  or Expanded Access  | Study Model  |deleted |  
         |Observational or Ancillary Correlative|Interventional  or Expanded Access  |Study Model other  |deleted  |  
        |Observational or Ancillary Correlative|Interventional or Expanded Access  | Time Perspective  |deleted |  
      |Observational or Ancillary Correlative |Interventional or Expanded Access  | Bio Specimen Retention |deleted | 
      |Observational or Ancillary Correlative |Interventional or Expanded Access  | Bio Specimen description  |deleted | 
      |Observational or Ancillary Correlative |Interventional or Expanded Access  | Number of Groups/Cohorts  |deleted | 
    
    
    Scenario: #2 I can add and edit trial design for an Interventional Clinical Research Category trial
    Given I am logged into the CTRP Protocol Abstraction application
       And I am on the Trial Design screen
      And the Clinical Research Category value is interventional
      And I can select a different value for Primary Purpose type
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
      And I can select a different value for Trial Phase type:
      | Trial Phase | 
      | 0           | 
      | I           | 
      | I/II        | 
      | II          | 
      | II/III      | 
      | III         | 
      | IV          | 
      | NA          | 
      And I can select a different value for the question"Is this a pilot" type
      | Is this a pilot | 
      | yes             | 
      | no              | 
      And I can select a value for Intervention Model type
      | Intervention Model | 
      | Single Group       | 
      | Parallel           | 
      | Cross-Over         | 
      | Factorial          | 
      And I can add or edit a value for Number of Arms
      And I can select a value for Masking:
      | Masking      | 
      | Open         | 
      | Single Blind | 
      | Double       | 
      And I can select a value for Allocation:
      | Allocation                  | 
      | Randomized Controlled Trial | 
      | Non-Randomized Trial        | 
      | NA                          | 
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
      And I can add or edit a value for Target Enrollment
      And I can add or edit a value for Final Enrollment for ClinicalTrials.gov
      And the value of Accruals will be displayed 
       When I select Save
     Then the Interventional Trial Design for the trial will be associated with the trial
      And the message Record Updated displays
      
  Scenario Outline:#3 Trial Design Interventional Mandatory Fields rules
    Given I am on the Trial Design Screen
      And the Clinical research Category is Interventional
     When The Trial Design field <TrialDesignField> is not entered
      And I have seleted the save Button
     Then An error message <TrialDesignErrorMessage> will be displayed  
    Examples: 
  
      | <TrialDesignField> | <TrialDesignErrorMessage>       | 
      | Primary Purpose    | Primary Purpose must be entered    | 
      | Trial Phase        | Trial Phase must be entered        | 
      | Intervention Model | Intervention Model must be entered | 
      | Number of Arms     | Number of Arms must be entered     | 
      | Masking            | Masking must be entered            | 
      | Allocation         | Allocation must be entered         | 
      | Target Enrollment  | Target Enrollment must be entered  | 
  
  Scenario:#4 Masking field Rules
    Given I am on the Trial Design screen
      And the Clinical Research Category is Interventional
     When Masking field selected
  
      | Blind        | 
      | Double Blind | 
  
     Then Masking Roles(s) displays
      And a text will be displayed "Even though not mandatory on this screen, failure to select masking role(s) may lead to abstraction validation warnings/errors"
      And I Can check Subject
      And I can check Investigator
      And I can check Caregiver
      And I can check Outcome Asessor 
     When I select Save
     Then the updated Masking role is associated with the trial
      And the message Record Updated displays 
     
  
  
  Scenario: #5 I can add and edit Trial Design for a Observational Clinical Research Category trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Trial Design screen
      And Clinical Research Category is Observational
      And I can select a different value for Primary Purpose
      And I can select a different value for Trial Phase 
      And I can select a different value for the question "Is this a pilot" 
      And I can select a value for Study Model: 
      | Study Model                   | 
      | Cohort                        | 
      | Case-control                  | 
      | Case-only                     | 
      | Case-crossover                | 
      | Ecologic or community studies | 
      | Family-based                  | 
      | Other                         | 
      And I can select a value for Time Perspective:
      | Time Perspective | 
      | Prospective      | 
      | Retrospective    | 
      | Cross\sectional  | 
      | Other            | 
      And I can select a value for Bio-specimen Retention:
      | Bio-specimen Retention | 
      | None Retained          | 
      | Samples with DNA       | 
      | Samples Without DNA    | 
      And I can enter a value for Groups/Cohorts
     And I can enter a value for Target Enrollment
      And I can enter a value for Final Enrollment for ClinicalTrials.gov
      And the value of Accruals will be displayed 
     When I have selected Save
     Then the Observational  trial design is associated with the trial
      And the message Record Updated displays
    
  
  Scenario: #6 I can add and edit Trial Design for an Ancillary Correlative Clinical Research Category trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I am on the Trial Design screen
      And Clinical Research Category is Ancillary Correlative
     And I can select a different value for Primary Purpose 
      And I can select a different value for Trial Phase 
      And I can select a different value for the question"Is this a pilot" 
      And I can select a value for Study Model 
      And I can select a value for Time Perspective
      And I can select a value for Bio-specimen Retention
      And I can add or edit a value for Groups/Cohorts
     And I can add or edit a value for Target Enrollment
      And I can add or edit a value for Final Enrollment for ClinicalTrials.gov
      And the value of Accruals will be displayed 
     When I have selected Save
     Then the Ancillary Correlative trial design is associated with the trial
      And the message Record Updated displays

  Scenario Outline:#7 Observational Trial Design Mandatory Fields rules
    Given I am on the Trial Design Screen
      And the Clinical research Category is Observational 
     When The Trial Design field <TrialDesignField> is not entered
      And I have seleted the save Button
     Then an error message <TrialDesignErrorMessage> will be displayed  
    Examples: 
  
      | <TrialDesignField> | <TrialDesignErrorMessage>          | 
      | Primary Purpose    | Primary Purpose must be entered    | 
      | Trial Phase        | Trial Phase must be entered        | 
      | Intervention Model | Intervention Model must be entered | 
      | Number of Arms     | Number of Arms must be entered     | 
      | Masking            | Masking must be entered            | 
      | Allocation         | Allocation must be entered         | 
      | Target Enrollment  | Target Enrollment must be entered  | 
  
    
  Scenario Outline: #8 I can up and edit Trial Design for a Expanded Access Clinical Research Category trial 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And Clinical Research Category is Intervention
     When I change Clinical Research Category to Expanded Access
      And I can select a different value for Primary Purpose type:
      And I can select a different value for Secondary Purpose Type:
      And I can select a different value for Trial Phase type:
      And I can select a different value for the question"Is this a pilot" type
      And I can select a value for Intervention Model type
      And I can enter a value for Number of Arms
      And I can select a value for Masking 
      And I can select a value for Allocation  
      And I can select a value for Study Classification
      And I can enter a value for Target Enrollment
      And I can enter a value for Final Enrollment for ClinicalTrials.gov
      And the value of Accruals will be displayed 
      And I select a value for <Expanded Access Type>
      | Expanded Access Type      | 
      | Available                 | 
      | No longer available       | 
      | Temporarily not available | 
      | Approved for marketing    | 
      And I select Save
     Then the Expanded Access trial design is associated with the trial
      And the message Record Updated displays
  
  Scenario:  #8 Primary Purpose rule when value selected is "Other"
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
     When I have selected Other for Primary Purpose
     Then I must enter description in the displayed field "if Primary Purpose is "Other", describe"
     When Description is not entered in the displayed field "if Primary Purpose is "Other", describe"
     Then a warning message will appear "Primary Purpose Of Other text is required”
  
  Scenario:  #10 Character display for Primary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And the 'If Primary Purpose is 'Other', describe' field displays
      And I can type 200 characters in the displayed field 
     When I start typing text in field
     Then the 200 characters provided under the Intervention Description field starts to decrement
     When I have reach the 200 characters limit
     Then no additional text can be entered
  
  Scenario:  #11 Secondary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
     When I have selected Other for Secondary Purpose
     Then a text box appears 
  
  Scenario:  #12 Character display for Secondary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And the 'If Secondary Purpose is 'Other', describe' box displays
      And I can type 1000 characters in the displayed field 
     When I start typing text in field
     Then the 1000 characters provided under the Intervention Description field starts to decrement
     When I have reach the 1000 characters limit
     Then no additional text can be entered
  
    
  Scenario:  #14 I can Reset Trial Description screen for a Trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
     When I have selected Reset
     Then the information entered or edited on the Trial Design screen will not be saved to the trial record
      And the screen will be refreshed with the data since the last save.
  

  
  
