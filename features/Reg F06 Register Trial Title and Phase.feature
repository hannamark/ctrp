@Global @Reg
Feature: Reg F06 Register Trial Title and Phase 

As a CTRP User, I can Register a Trial's Title and Phase


Scenario: #1 I can enter the trial title and phase for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Title and Phase screen
When I have entered the trial's Title
And I have selected the trial phase from a list of trial phases
And I have either selected the option "Yes" if the trial is a Pilot or left the option "No" as the default
Then the Register Trial Title and Phase section will not indicate any errors during Trial Review

Scenario: #2 I must enter the trial title
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
and I am on the Register Trial title and Phase screen
When I have not entered the trial title
And I have selected a trial phase
Then during Trial Review the Register Trial Title and Phase section will indicate an error "Trial Title is Required" 

Scenario: #3 I must select a trial phase
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
and I am on the Register Trial title and Phase screen
When I have entered a trial title
And I have not selected a trial phase
Then during Trial Review the Register Trial Title and Phase section will indicate an error "Trial Phase is Required" 