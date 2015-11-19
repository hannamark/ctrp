@Global @Reg
Feature: Reg F04 Register Trial Study Source

As a CTRP User, I can select the Study Source of the trial I will register

Scenario: #1 I can select the option to register a protocol for a National, Externally Peer-Reviewed, or Institutional trial
Given I am logged into the CTRP Registration application
And I am on the Register Trial screen
When I select the option to register a National, Externally Peer-Reviewed, or Institutional trial
Then I will be able to enter my trial registration information (Features Reg F5 - Reg F15)
And I will be able to enter my trial related documents (Feature F13)

Scenario: #2 I can select the option to import trial information for an Industrial, Other, or Expanded Access trial
Given I am logged into the CTRP Registration application
And I am on the Register Trial screen
When I select the option to register an Industrial, Other, or Expanded Access trial
Then I will be able to import the trial from ClinicalTrials.gov (Feature F16)


