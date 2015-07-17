@Global @Reg
Feature: As a CTRP User, I can review my registration and if no errors, I can submit the registration to CTRP

Scenario: #1 I can review my registration without errors
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I have completed the registration sections
When I have selected Review Trial
Then the CTRP application will check that all required fields have been entered
And the CTRP application will check that all registration sections have been completed
And the option to Register Trial will be available

Scenario: #2 I can review my registration with errors
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I have completed the registration sections but with errors
When I have selected Review Trial
Then the CTRP application will check that all required fields have been entered
And the CTRP application will check that all registration sections have been completed
And the registration errors will be displayed
And the option to Register Trial will be not available

Scenario: #3 I can submit my completed trial registration
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I have performed the Review Trial action without errors
When I have selected Register Trial
Then all registration information will be entered in CTRP
And the trial status will be Submitted
