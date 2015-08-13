@Global @Reg
Feature: As a CTRP User, I can select the Study Source of the trial I will register

Scenario: #1 I can select the option to register a protocol for a National, Externally Peer-Reviewed, or Institutional trial
Given I am logged into the CTRP Registration application
And I am on the Register Trial screen
When I select the option to register a National, Externally Peer-Reviewed, or Institutional trial
Then CTRP will display the required registration elements for a complete protocol registration

Scenario: #2 I can select the option to import trial information for an Industrial or Other trial
Given I am logged into the CTRP Registration application
And I am on the Register Trial screen
When I select the option to register an Industrial or Other trial
Then CTRP will display the required information fields to import the trial from ClinicalTrials.gov


