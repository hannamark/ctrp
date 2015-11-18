@Global @Reg
Feature: Reg F06 Register Trial Title and Phase 

As a CTRP User, I can Register a Trial's Title and Phase


Scenario: #1 I can enter the trial title and phase for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
Then I must enter a trial title
And I must select a trial phase

Scenario: #2 A trial may be a pilot trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
Then I may optionally indicate that the trial is a pilot