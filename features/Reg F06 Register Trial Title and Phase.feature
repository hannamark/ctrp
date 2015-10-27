@Global @Reg
Feature: As a CTRP User, I can Register a Trial's Title and Phase


Scenario: #1 I can enter the trial title and phase for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Title and Phase screen
When I have entered the trial's Title
And I have selected the trial phase from a list of trial phases
And I have either selected the option "Yes" if the trial is a Pilot or left the option "No" as the default
And I have submitted the Trial Registration Title and Phase section
Then the Trial Registration Title and Phase section will be complete

Scenario: #2 I must enter the trial title and phase
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
and I am on the Register Trial title and Phase screen
When I have not entered the trial title or trial phase
And I have submitted the Register Trial Title and Phase section
Then the Register Trial Title and Phase section will indicate an error "Trial Title and Phase are Required" 
when I click on the Review Trial Button
