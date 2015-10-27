@Global @Reg
Feature: As a CTRP User, I can Register a Trial's Study Design

Scenario: #1 I can enter the Clinical Research Category and Primary Purpose for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And the Clinical Research Categories are defined as:
| Interventional |
| Observational  |
| Ancillary-Correlative |
And I am on the Register Trial Study Design screen
When I have selected the trial's Clinical Research Category
And I have selected the trial's Primary Purpose
And I have entered a Primary Purpose Other Description if Other is the Primary Purpose selected
And I have submitted the Trial Registration Study Design section
And I have select a Accrual Disease Terminology as:
|SDC|
|ICD9|
|ICD10|
|ICD-O-3|
Then the Trial Registration Category and Primary Purpose section will be complete

Scenario: #2 I must enter the Clinical Research Category and Primary Purpose for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And the Clinical Research Categories are defined as:
| Interventional |
| Observational  |
| Ancillary-Correlative |
And I am on the Register Trial Study Design screen
When I have not selected the trial's Clinical Research Category
And I have selected the trial's Primary Purpose
And I have submitted the Trial Registration Study Design section
And I have select a Accrual Disease Terminology as:
|SDC|
|ICD9|
|ICD10|
|ICD-O-3|
Then the Trial Registration Category and Primary Purpose section display the error "Clinical Research Category and Primary Purpose are required"
when I click on the Review Trial button

Scenario: #3 I must enter the Clinical Research Category and Primary Purpose for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And the Clinical Research Categories are defined as:
| Interventional |
| Observational  |
| Ancillary-Correlative |
And I am on the Register Trial Study Design screen
When I have selected the trial's Clinical Research Category
And I have not selected the trial's Primary Purpose
And I have submitted the Trial Registration Study Design section
And I have select a Accrual Disease Terminology as:
|SDC|
|ICD9|
|ICD10|
|ICD-O-3|
Then the Trial Registration Category and Primary Purpose section display the error "Clinical Research Category and Primary Purpose are required"
when I click on the Review Trial button

Scenario: #4 I can enter the Clinical Research Category and Primary Purpose and the Optional Secondary Purpose for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And the Clinical Research Categories are defined as:
| Interventional |
| Observational  |
| Ancillary-Correlative |
And I am on the Register Trial Study Design screen
When I have selected the trial's Clinical Research Category
And I have selected the trial's Primary Purpose
And I have entered a Primary Purpose Other Description if Other is the Primary Purpose selected
And I have selected an optional Secondary Purpose
And I have entered a Secondary Purpose Other Description if Other is the Secondary Purpose selected
And I have submitted the Trial Registration Study Design section
And I have select a Accrual Disease Terminology as:
|SDC|
|ICD9|
|ICD10|
|ICD-O-3|
Then the Trial Registration Category and Primary Purpose section will be complete



