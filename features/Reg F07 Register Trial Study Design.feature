@Global @Reg
Feature: As a CTRP User, I can Register a Trial's Study Design

Scenario 1: I can enter the Clinical Research Category and Primary Purpose for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And the Clinical Research Categories are defined as:
| Interventional |
| Observational  |
| Ancillary/Correlative |
| Expanded Access |
And I am on the Register Trial Study Design screen
When I have selected the trial's Clinical Research Category
And I have selected the trial's Primary Purpose
And I have submitted the Trial Registration Study Design section
Then the Trial Registration Category and Primary Purpose section will be complete

Scenario 2: I must enter the Clinical Research Category and Primary Purpose for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And the Clinical Research Categories are defined as:
| Interventional |
| Observational  |
| Ancillary/Correlative |
| Expanded Access |
And I am on the Register Trial Study Design screen
When I have not selected the trial's Clinical Research Category
And I have selected the trial's Primary Purpose
And I have submitted the Trial Registration Study Design section
Then the Trial Registration Category and Primary Purpose section display the error "Clinical Research Category and Primary Purpose are required"

Scenario 3: I must enter the Clinical Research Category and Primary Purpose for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And the Clinical Research Categories are defined as:
| Interventional |
| Observational  |
| Ancillary/Correlative |
| Expanded Access |
And I am on the Register Trial Study Design screen
When I have selected the trial's Clinical Research Category
And I have not selected the trial's Primary Purpose
And I have submitted the Trial Registration Study Design section
Then the Trial Registration Category and Primary Purpose section display the error "Clinical Research Category and Primary Purpose are required"