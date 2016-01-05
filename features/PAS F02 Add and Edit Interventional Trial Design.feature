@PA @global
Feature:  PAS F02 Add and Edit Interventional Trial Design 
As a CTRP Scientific Abstractor, I can add and edit Interventional Trial Design 

  Scenario: #1 I can add and edit Interventional Trial Design for a trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And I can view a value for Clinical Research Category
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
      And I can select a value for Allocation
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
  
  Scenario: #2 Clinical Research Category, Primary Purpose, Trial Phase not null 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And any of the following <field name> are null 
      | field name                 | 
      | Clinical Research Category | 
      | Primary Purpose            | 
      | Trial Phase                | 
     When I select Save
     Then a warning message will appear for the null values with the message “<field name> is required”
  
  Scenario Outline: #3 Update Clinical Research Category with Observational  
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And I edit Clinical Research Category
     When Clinical Research Category = Observational
      And I select Save
     Then Clinical Research Category is updated with Observational
      And the following <common fields> are populated with the values from Interventional Trial Design 
      | common fields     | 
      | Primary Purpose   | 
      | Phase             | 
      | Is this a pilot   | 
      | Target enrollment | 
      And the <Interventional fields> are not displayed
      | Interventional fields                  | 
      | Secondary Purpose                      | 
      | Intervention Model                     | 
      | Arms                                   | 
      | Masking                                | 
      | Allocation                             | 
      | Study Classification                   | 
      | Final Enrollment for ClinicalTrial.gov | 
      | Accruals                               | 
      And the following <Observational fields> are displayed
      | Observational fields     | 
      | Study Model              | 
      | Time Perspective         | 
      | Bio-speciment Retention  | 
      | Number of groups/Cohorts | 
  
  Scenario Outline: #4 Update Clinical Research Category with Ancillary Correlative  
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And I edit Clinical Research Category
     When Clinical Research Category = Ancillary Correlative
      And I select Save
     Then Clinical Research Category is updated with Ancillary Correlative
      And the following <common fields> are populated with the values from Interventional Trial Design:
      | common fields     | 
      | Primary Purpose   | 
      | Phase             | 
      | Is this a pilot   | 
      | Target enrollment | 
      And the <Interventional fields> are not displayed
      | Interventional fields                  | 
      | Secondary Purpose                      | 
      | Intervention Model                     | 
      | Arms                                   | 
      | Masking                                | 
      | Allocation                             | 
      | Study Classification                   | 
      | Final Enrollment for ClinicalTrial.gov | 
      | Accruals                               | 
      And the following <Ancillary Correlative fields> are displayed
      | Ancillary Correlative fields | 
      | Study Model                  | 
      | Time Perspective             | 
      | Bio-speciment Retention      | 
      | Number of groups/Cohorts     | 
  
  Scenario Outline: #5 Update Clinical Research Category with Expanded Access 
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And I edit Clinical Research Category
     When Clinical Research Category = Expanded Access
      And I select Save
     Then Clinical Research Category is updated with Expanded Access
      And the following <common fields> are populated with the values from Interventional Trial Design:
      | common fields                          | 
      | Primary Purpose                        | 
      | Phase                                  | 
      | Is this a pilot                        | 
      | Target enrollment                      | 
      | Intervention Model                     | 
      | Arms                                   | 
      | Masking                                | 
      | Allocation                             | 
      | Study Classification                   | 
      | Final Enrollment for ClinicalTrial.gov | 
      | Accruals                               | 
      And I select a value for <Expanded Access Type>
      | Expanded Access Type      | 
      | Available                 | 
      | No longer available       | 
      | Temporarily not available | 
      | Approved for marketing    | 
  
      | Clinical Research Category | 
      | Interventional             | 
      | Expanded Access            | 
      | Observational              | 
      | Ancillary Correlative      | 
  
  Scenario:  #6 Primary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
     When I have selected Other for Primary Purpose
     Then a required text box appears 
  
  Scenario:  #7 Character display for Primary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And the 'If Primary Purpose is 'Other', describe' box displays
     When I am entering text
     Then information text appears to display the number of characters available to enter into the field
      | 200 characters left | 
     When 200 characters have been entered
     Then no additional text can be entered
  
  Scenario:  #8 Secondary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
     When I have selected Other for Secondary Purpose
     Then a required text box appears 
  
  Scenario:  #9 Character display for Seondary Purpose of Other
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And the 'If Secondary Purpose is 'Other', describe' box displays
     When I am entering text
     Then information text appears to display the number of characters available to enter into the field
      | 1000 characters left | 
     When 1000 characters have been entered
     Then no additional text can be entered
  
  Scenario:  #10 Masking Roles display if Blinded Masking
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Trial Design screen
      And I am selecting a value for Masking 
     When the value of Masking is Single Blind 
     Then Masking Role(s) displays for multiple selection
      | Masking Role(s)   | 
      | Subject           | 
      | Investigator      | 
      | Caregiver         | 
      | Outcomes Assessor | 
  
  Scenario:  #11 I can Reset Trial Description screen for a Trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Interventional Trial Design screen
     When I have selected Reset
     Then the information entered or edited on the Interventional Trial Design screen will not be saved to the trial record
      And the screen will be refreshed with the data since the last save.
  
  Scenario:  #12 I can Cancel Trial Design screen for a Trial
    Given I am logged into the CTRP Protocol Abstraction application
      And I have selected a trial
      And I am on the Interventional Trial Design screen
     When I have selected Cancel
     Then the information entered or edited on the Interventional Trial Design screen will not be saved to the trial record
      And the screen will be refreshed with the data since the last save.
  
